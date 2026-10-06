// Trang giỏ: thao tác checkbox, số lượng và chuyển các dòng đã chọn sang checkout.
function toggleSelect(id, checked) {
    const cart = getCart();
    const item = cart.find(row => row.id === Number(id));
    if (item) item.selected = checked;
    if (saveCart(cart)) renderCart();
}
// Gán cùng trạng thái chọn cho tất cả dòng rồi hiển thị lại giỏ.
function toggleSelectAll(checked) {
    if (saveCart(getCart().map(row => ({
            ...row,
            selected: checked
        })))) renderCart();
}
// Tăng/giảm số lượng trong giới hạn 1–999 và tính lại tổng tiền.
function updateQuantity(id, change) {
    const cart = getCart(),
        item = cart.find(row => row.id === Number(id));
    if (!item) return;
    item.quantity = Math.min(999, Math.max(1, item.quantity + change));
    if (saveCart(cart)) renderCart();
}
// Bỏ đúng sản phẩm theo id, giữ nguyên các dòng còn lại.
function removeItem(id) {
    if (saveCart(getCart().filter(row => row.id !== Number(id)))) renderCart();
}
// Chỉ xóa toàn bộ giỏ khi khách đồng ý trong hộp xác nhận.
function clearCart() {
    // Xác nhận trước khi xóa toàn bộ giỏ để tránh bấm nhầm.
    if (window.confirm("Xóa toàn bộ sản phẩm trong giỏ?") && saveCart([])) {
        removeStore("checkout");
        renderCart();
    }
}

function renderCart() {
    const target = document.querySelector("#cart-content");
    if (!target) return;
    const cart = getCart();
    if (!cart.length) {
        target.innerHTML = emptyCart;
        return;
    }
    const selected = cart.filter(row => row.selected);
    // Mỗi item là một hàng card trắng, checkbox Bootstrap chọn item thanh toán.
    target.innerHTML = `
        <div class="cart-items">
            ${cart.map(row => `
                <article class="cart-item">
                    <input class="form-check-input" type="checkbox" data-select="${row.id}"
                           aria-label="Chọn ${escapeHTML(row.name)}" ${row.selected ? "checked" : ""}>
                    <a class="cart-product" href="chi-tiet-san-pham.html?id=${row.id}">
                        <img src="../IMG/san-pham/${row.image}" alt="" width="90" height="80">
                        <strong>${escapeHTML(row.name)}</strong>
                    </a>
                    <div><span class="small">Đơn giá</span><p>${money(row.price)}</p></div>
                    <!-- input-group gom hai nút tăng giảm và số lượng thành một nhóm. -->
                    <div class="input-group quantity-controls">
                        <button class="btn btn-outline-dark" data-change="-1" data-id="${row.id}" ${row.quantity === 1 ? "disabled" : ""} aria-label="Giảm ${escapeHTML(row.name)}">−</button>
                        <span class="input-group-text">${row.quantity}</span>
                        <button class="btn btn-outline-dark" data-change="1" data-id="${row.id}"  aria-label="Tăng ${escapeHTML(row.name)}">+</button>
                    </div>
                    <strong class="price">${money(row.price * row.quantity)}</strong>
                    <button class="btn btn-outline-dark" data-remove="${row.id}" aria-label="Xóa ${escapeHTML(row.name)}">Xóa</button>
                </article>`).join("")}
        </div>
        <!-- Thanh tổng sticky chỉ cộng item được chọn. -->
        <div class="cart-footer">
            <label class="select-all"><input class="form-check-input" id="select-all" type="checkbox" ${selected.length === cart.length ? "checked" : ""}> Chọn tất cả</label>
            <button class="btn btn-outline-dark" id="clear-cart">Xóa giỏ</button>
            <div><span>Tổng đã chọn (${selected.length} loại)</span><strong class="price d-block">${money(totalCart(selected))}</strong></div>
            <button class="btn btn-warning" id="buy-selected" ${selected.length ? "" : "disabled"}>Tiến hành thanh toán</button>
        </div>
        <p class="small mt-3">Chỉ các sản phẩm được chọn sẽ được đưa vào đơn hàng.</p>
        <a href="san-pham.html">← Tiếp tục mua</a>`;
    // Gắn sự kiện sau render để các nút luôn trỏ tới dữ liệu đang hiển thị.
    target.querySelectorAll("[data-select]").forEach(el => el.addEventListener("change", () => toggleSelect(el.dataset.select, el.checked)));
    target.querySelectorAll("[data-change]").forEach(el => el.addEventListener("click", () => updateQuantity(el.dataset.id, Number(el.dataset.change))));
    target.querySelectorAll("[data-remove]").forEach(el => el.addEventListener("click", () => removeItem(el.dataset.remove)));
    document.querySelector("#select-all").addEventListener("change", event => toggleSelectAll(event.target.checked));
    document.querySelector("#clear-cart").addEventListener("click", clearCart);
    document.querySelector("#buy-selected").addEventListener("click", buySelected);
}
renderCart();
