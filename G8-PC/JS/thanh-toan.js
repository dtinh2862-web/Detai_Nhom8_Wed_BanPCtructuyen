// Phần trăm ưu đãi đang áp dụng, giống discountAmount của payment.js.
let discountAmount = 0;
let appliedCoupon = "";
// Như mẫu: checkout có item thì ưu tiên; thiếu/rỗng thì dùng cart.
function loadCheckoutData() {
    const cart = getCart();
    const raw = readStore("checkout", null);
    // Như mẫu: ưu tiên checkout có item, nếu trống thì dùng cart.
    if (!Array.isArray(raw) || !raw.length) return cart;
    // Chỉ lấy id còn trong giỏ; số lượng/giá luôn tra lại để không dùng bản chụp cũ.
    const ids = new Set(raw.filter(item => item && Number.isInteger(item.id)).map(item => item.id));
    return cart.filter(item => ids.has(item.id));
}
const getCheckoutCart = loadCheckoutData;
// Nghiệp vụ đặt hàng độc lập với DOM; trả kết quả để trang hiển thị alert.
function placeOrder(info) {
    const user = getCurrentUser();
    if (!user) return {
        ok: false,
        message: "Vui lòng đăng nhập trước khi đặt hàng."
    };
    if (!validateName(info.name)) return {
        ok: false,
        field: "name",
        message: "Họ tên cần 2–50 ký tự và không chứa chữ số."
    };
    if (!validatePhone(info.phone)) return {
        ok: false,
        field: "phone",
        message: "Số điện thoại cần 10 chữ số, đầu 03, 05, 07, 08 hoặc 09."
    };
    if (!validateEmail(info.email)) return {
        ok: false,
        field: "email",
        message: "Email không hợp lệ."
    };
    if (!validateAddress(info.address)) return {
        ok: false,
        field: "address",
        message: "Địa chỉ cần 5–150 ký tự; dùng chữ, số và dấu phân cách thông thường."
    };
    if (!["COD", "Chuyển khoản"].includes(info.payment)) return {
        ok: false,
        message: "Chọn phương thức thanh toán."
    };
    // Chuẩn hóa dữ liệu sau khi hợp lệ để thông tin lưu và hiển thị nhất quán.
    info = {
        ...info,
        name: cleanText(info.name),
        email: info.email.trim().toLowerCase(),
        phone: normalizePhone(info.phone),
        address: cleanText(info.address),
        note: cleanText(info.note)
    };
    if (info.note.length > 500) return {
        ok: false,
        field: "note",
        message: "Ghi chú tối đa 500 ký tự."
    };
    const items = loadCheckoutData();
    if (!items.length) return {
        ok: false,
        message: "Không có sản phẩm để thanh toán."
    };
    const order = {
        id: "DH" + Date.now(),
        date: new Date().toISOString(),
        customer: {
            ...info
        },
        customerName: info.name,
        customerPhone: info.phone,
        customerAddress: info.address,
        customerCity: info.city || "",
        customerNote: info.note || "",
        paymentMethod: info.payment,
        items,
        subTotal: totalCart(items),
        discount: discountAmount,
        coupon: appliedCoupon,
        total: totalCart(items) - Math.round(totalCart(items) * discountAmount / 100),
        status: "Chờ xác nhận"
    };
    const key = "orders_" + user.id;
    const history = readStore(key, []);
    // Chụp giá trị cũ để khôi phục nếu một thao tác lưu/xóa thất bại.
    const keys = [key, "cart", "checkout"];
    let backup;
    try {
        backup = keys.map(k => localStorage.getItem(k));
        localStorage.setItem(key, JSON.stringify([...(Array.isArray(history) ? history : []), order]));
        // Chỉ bỏ các dòng đã đặt; giữ lại sản phẩm khách chưa chọn mua.
        const remaining = getCart().filter(row => !items.some(item => item.id === row.id));
        localStorage.setItem("cart", JSON.stringify(remaining));
        localStorage.removeItem("checkout");
    } catch {
        if (backup) keys.forEach((k, index) => {
            try {
                if (backup[index] === null) localStorage.removeItem(k);
                else localStorage.setItem(k, backup[index]);
            } catch {
                /* Trình duyệt chặn lưu: giữ thông báo lỗi, không báo đơn thành công. */ }
        });
        return {
            ok: false,
            message: "Không lưu được đơn. Giữ trang này và kiểm tra quyền lưu trữ."
        };
    }
    discountAmount = 0;
    appliedCoupon = "";
    updateCartBadge();
    return {
        ok: true,
        order
    };
}
// Card tóm tắt dùng giá đã xác thực và ảnh local.
function renderCheckout() {
    const summary = document.querySelector("#checkout-summary");
    if (!summary) return;
    const items = loadCheckoutData();
    document.querySelector("#place-order").disabled = !items.length;
    summary.innerHTML = items.length ? `
        <h2>Đơn hàng của bạn</h2>
        ${items.map(item => `<div class="order-line">
            <img src="../IMG/san-pham/${item.image}" alt="" width="64" height="60">
            <span>${escapeHTML(item.name)} × ${item.quantity}</span>
            <strong>${money(item.price * item.quantity)}</strong>
        </div>`).join("")}
        <div class="order-line"><span>Tạm tính</span><strong>${money(totalCart(items))}</strong></div>
        <div class="order-line"><span>Giảm giá (${discountAmount}%)</span><strong>−${money(Math.round(totalCart(items) * discountAmount / 100))}</strong></div>
        <div class="order-line"><span>Tổng thanh toán</span><strong class="price">${money(totalCart(items) - Math.round(totalCart(items) * discountAmount / 100))}</strong></div>
        <p class="small">Kiểm tra số lượng và thông tin nhận hàng trước khi xác nhận.</p>` : emptyCart;
}
// Chỉ trang thanh toán yêu cầu đăng nhập ngay khi mở.
const checkoutForm = document.querySelector("#checkout-form");
if (checkoutForm && requireLogin()) {
    const user = getCurrentUser();
    ["name", "email", "phone", "address"].forEach(key => checkoutForm.elements[key].value = user[key] || "");
    checkoutForm.addEventListener("submit", event => {
        event.preventDefault();
        if (!requireLogin()) return;
        const button = document.querySelector("#place-order");
        button.disabled = true;
        const result = placeOrder(Object.fromEntries(new FormData(checkoutForm)));
        if (!result.ok) {
            showFormResult(checkoutForm, "checkout-message", result);
            button.disabled = !loadCheckoutData().length;
            return;
        }
        // Không dùng innerHTML cho dữ liệu khách hàng; thông báo bằng textContent.
        document.querySelector("#checkout-content").hidden = true;
        const success = document.querySelector("#checkout-success");
        success.hidden = false;
        success.className = "alert alert-success success-panel";
        success.innerHTML = '<h2>Đặt hàng thành công</h2><p id="confirmation-text"></p><p>Bạn có thể xem lại chi tiết tại mục Đơn hàng trong tài khoản.</p><a class="btn btn-warning" href="tai-khoan.html">Xem đơn hàng</a> <a class="btn btn-outline-dark" href="san-pham.html">Tiếp tục mua</a>';
        document.querySelector("#confirmation-text").textContent = "Mã đơn: " + result.order.id + " · " + money(result.order.total);
        success.focus();
        // Bootstrap Modal hiện mã đơn; khách chủ động đóng và chọn xem đơn hoặc mua tiếp.
        document.querySelector("#modal-order-code").textContent = result.order.id;
        if (window.bootstrap?.Modal) bootstrap.Modal.getOrCreateInstance(document.querySelector("#successModal")).show();
    });
    renderCheckout();
}

// Chuẩn hóa mã, kiểm tra bảng mã, cập nhật % rồi render lại tổng.
function applyCoupon() {
    const input = document.querySelector("#coupon-input");
    if (!input) return;
    const code = input.value.trim().toUpperCase();
    const valid = isValidCoupon(code) && Object.hasOwn(VALID_COUPONS, code);
    discountAmount = valid ? VALID_COUPONS[code] : 0;
    appliedCoupon = valid ? code : "";
    const message = document.querySelector("#coupon-message");
    message.textContent = valid ? "Đã áp dụng mã giảm " + discountAmount + "%." : "Mã không hợp lệ.";
    message.className = valid ? "text-success" : "text-danger";
    renderCheckout();
}
document.querySelector("#apply-coupon")?.addEventListener("click", applyCoupon);
