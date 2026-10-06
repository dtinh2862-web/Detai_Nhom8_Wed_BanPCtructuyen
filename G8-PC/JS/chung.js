// Hàm dữ liệu và giao diện dùng lại trên cả 15 trang; chỉ file này thao tác giỏ chung.
function readStore(key, fallback) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return value === null ? fallback : value;
    } catch {
        return fallback;
    }
}
// Chuyển dữ liệu thành JSON, lưu lại và báo lỗi nếu trình duyệt chặn lưu trữ.
function writeStore(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch {
        notify("Không lưu được dữ liệu. Kiểm tra quyền lưu trữ của trình duyệt.");
        return false;
    }
}
// Xóa một khóa dữ liệu và trả true/false để nơi gọi biết kết quả.
function removeStore(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch {
        notify("Không xóa được dữ liệu lưu.");
        return false;
    }
}
// Thông báo ngắn dùng role=status để trình đọc màn hình nhận phản hồi.
function notify(text) {
    const el = document.querySelector("#toast");
    if (!el) return;
    el.textContent = text;
    el.hidden = false;
    clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => el.hidden = true, 4000);
}
// Định dạng số tiền thành đồng Việt Nam; giữ dữ liệu gốc là số để tính toán.
function money(value) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
    }).format(value);
}
const formatCurrency = money;
// Mọi văn bản từ dữ liệu lưu phải escape trước khi ghép innerHTML.
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    } [c]));
}
// Đọc cart, bỏ id sai và lấy giá/ảnh mới từ danh mục; giữ selected của mỗi dòng.
function getCart() {
    const raw = readStore("cart", []);
    if (!Array.isArray(raw)) return [];
    const result = [];
    for (const row of raw) {
        const product = products.find(p => p.id === row?.id);
        if (!product || !isValidQuantity(row.quantity)) continue;
        const found = result.find(item => item.id === row.id);
        if (found) found.quantity = Math.min(999, found.quantity + row.quantity);
        else result.push({
            ...product,
            quantity: row.quantity,
            selected: row.selected !== false
        });
    }
    return result;
}
const loadCart = getCart;
// Cộng số lượng các dòng giỏ để hiển thị huy hiệu ở đầu trang.
function updateCartBadge() {
    const el = document.querySelector("#cart-count");
    if (el) el.textContent = getCart().reduce((sum, row) => sum + row.quantity, 0);
}
const updateCartCount = updateCartBadge;
// Lưu giỏ trước, chỉ cập nhật huy hiệu khi lưu thành công.
function saveCart(cart) {
    const ok = writeStore("cart", cart);
    if (ok) updateCartBadge();
    return ok;
}
// Đăng nhập là điều kiện mua; gộp dòng cùng id như mã mẫu.
function addCart(id, quantity = 1) {
    if (!requireLogin()) return false;
    const product = products.find(p => p.id === Number(id));
    if (!product || !isValidQuantity(quantity)) return false;
    const cart = getCart();
    const found = cart.find(item => item.id === product.id);
    if (found && found.quantity + quantity > 999) {
        notify("Mỗi sản phẩm được chọn tối đa 999 chiếc.");
        return false;
    }
    if (found) {
        found.quantity += quantity;
        found.selected = true;
    } else cart.push({
        ...product,
        quantity,
        selected: true
    });
    if (!saveCart(cart)) return false;
    notify("Đã thêm sản phẩm vào giỏ hàng.");
    return true;
}

function addToCart(product, quantity = 1) {
    return addCart(product.id, quantity);
}
// Tính tổng tiền bằng giá sản phẩm nhân số lượng của từng dòng.
function totalCart(items = getCart()) {
    return items.reduce((total, row) => total + row.price * row.quantity, 0);
}
const emptyCart = '<div class="empty"><h2>Giỏ hàng đang trống</h2><p>Chọn PC phù hợp trước khi thanh toán.</p><a class="btn btn-warning" href="san-pham.html">Xem sản phẩm</a></div>';

// Các trang danh sách truyền object lựa chọn qua LocalStorage.
function selectProduct(id) {
    const item = products.find(p => p.id === Number(id));
    return !!item && writeStore("selectedProduct", item);
}
// Ghi bài đang chọn để trang chi tiết có thể mở lại nội dung.
function selectNews(id) {
    const item = news.find(n => n.id === Number(id));
    return !!item && writeStore("selectedNews", item);
}
// Kiểm tra đăng nhập và tạo danh sách thanh toán từ các dòng đã chọn.
function prepareCheckout() {
    if (!requireLogin()) return false;
    const selected = getCart().filter(item => item.selected);
    if (!selected.length) {
        notify("Bạn chưa chọn sản phẩm nào để mua.");
        return false;
    }
    return writeStore("checkout", selected);
}
// Chuyển sang thanh toán khi đã lưu được các sản phẩm được chọn.
function buySelected() {
    if (prepareCheckout()) location.href = "thanh-toan.html";
}
// Mua ngay chỉ đưa dòng PC này vào checkout, không đưa sản phẩm khác vào đơn.
function buyNow(id, quantity) {
    if (!addCart(id, quantity)) return;
    const item = getCart().find(row => row.id === Number(id));
    if (writeStore("checkout", [item])) location.href = "thanh-toan.html";
}
// Navbar hiện tên người dùng; icon nằm riêng nên không bị textContent xóa.
function syncNavUser() {
    const user = getCurrentUser();
    const label = document.querySelector("#account-name");
    if (label) label.textContent = user ? "Xin chào, " + user.name : "Đăng nhập";
    const button = document.querySelector("#logout");
    if (button) button.hidden = !user;
    syncUserLink();
}
const updateAccount = syncNavUser;

// jQuery on dùng sự kiện ủy quyền để nhận click từ card được render sau này.
$(document).on("click", 'a[href*="chi-tiet-san-pham.html"], a[href*="chi-tiet-tin-tuc.html"], a[href="thanh-toan.html"]', function(event) {
    const href = $(this).attr("href");
    const id = new URLSearchParams(href.split("?")[1] || "").get("id");
    let saved = true;
    if (href.includes("chi-tiet-san-pham.html") && id !== null) saved = selectProduct(id);
    if (href.includes("chi-tiet-tin-tuc.html") && id !== null) saved = selectNews(id);
    if (href === "thanh-toan.html") saved = prepareCheckout();
    if (!saved) event.preventDefault();
});
// Nút Thêm giỏ trên danh sách nhận id qua data-add-cart.
$(document).on("click", "[data-add-cart]", function() {
    addCart(Number($(this).attr("data-add-cart")), 1);
});
// Đánh dấu menu hiện tại và đồng bộ khi tab khác thay đổi dữ liệu.
document.querySelectorAll(".menu a").forEach(link => {
    const slug = link.getAttribute("href").replace(".html", "");
    const current = document.body.classList.contains(slug) ||
        (slug === "san-pham" && document.body.classList.contains("chi-tiet-san-pham")) ||
        (slug === "tin-tuc" && document.body.classList.contains("chi-tiet-tin-tuc"));
    if (current) link.setAttribute("aria-current", "page");
});
window.addEventListener("storage", event => {
    if (["cart", "checkout", null].includes(event.key)) {
        updateCartBadge();
        if (typeof renderCart === "function") renderCart();
        if (typeof renderCheckout === "function") renderCheckout();
    }
    if (["users", "currentUser", null].includes(event.key)) syncNavUser();
});
updateCartBadge();
syncNavUser();

// Dùng chung thao tác lưu/bỏ lưu của bộ sưu tập, deal, bài viết và mã ưu đãi.
function loadSavedIds(key) {
    const ids = readStore(key, []);
    return Array.isArray(ids) ? [...new Set(ids.filter(id => typeof id === "number" || typeof id === "string"))] : [];
}
// Đã lưu thì loại id khỏi mảng; chưa lưu thì thêm id rồi ghi LocalStorage.
function toggleSavedId(key, id) {
    const ids = loadSavedIds(key);
    return writeStore(key, ids.includes(id) ? ids.filter(value => value !== id) : [...ids, id]);
}
// auth:changed là sự kiện của auth.js mẫu để đồng bộ các thành phần.
window.addEventListener("auth:changed", () => {
    syncNavUser();
    updateCartBadge();
});
