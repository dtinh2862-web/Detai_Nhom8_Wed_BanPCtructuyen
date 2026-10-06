// Chỉ trang chủ có các phần tử này; tách xử lý menu khỏi logic lọc sản phẩm.
const categoryPanel = document.getElementById("product-categories");
const categoryToggle = document.getElementById("category-toggle");
const categoryMenu = document.getElementById("category-menu");

// Một hàm cập nhật cả phần nhìn thấy và trạng thái trợ năng của nút.
function setCategoryOpen(open) {
    if (!categoryMenu || !categoryToggle) return;
    categoryMenu.hidden = !open;
    categoryToggle.setAttribute("aria-expanded", String(open));
}

// Gắn sự kiện khi đủ nút và danh sách; không tác động tới dropdown khác của Bootstrap.
if (categoryPanel && categoryToggle && categoryMenu) {
    // Chuột/bút đi vào vùng tiêu đề thì mở; thao tác chạm xử lý bằng click bên dưới.
    categoryPanel.addEventListener("pointerenter", function (event) {
        if (event.pointerType !== "touch") setCategoryOpen(true);
    });

    // Rời vùng menu thì đóng, trừ khi người dùng đang dùng bàn phím bên trong danh mục.
    categoryPanel.addEventListener("pointerleave", function () {
        if (!categoryPanel.contains(document.activeElement)) setCategoryOpen(false);
    });

    // Nhấn nút trên điện thoại hoặc dùng Enter/Space để bật/tắt danh sách.
    categoryToggle.addEventListener("click", function () {
        setCategoryOpen(categoryMenu.hidden);
    });

    // Mũi tên xuống đưa focus đến lựa chọn đầu; Escape đóng menu và trả focus về nút.
    categoryPanel.addEventListener("keydown", function (event) {
        if (event.key === "ArrowDown" && event.target === categoryToggle) {
            event.preventDefault();
            setCategoryOpen(true);
            categoryMenu.querySelector("a").focus();
        }
        if (event.key === "Escape") {
            event.preventDefault();
            setCategoryOpen(false);
            categoryToggle.focus();
        }
    });

    // Tab ra ngoài hoặc nhấn nơi khác sẽ đóng menu để tránh che nội dung trang.
    categoryPanel.addEventListener("focusout", function (event) {
        if (!categoryPanel.contains(event.relatedTarget)) setCategoryOpen(false);
    });
    document.addEventListener("click", function (event) {
        if (!categoryPanel.contains(event.target)) setCategoryOpen(false);
    });
}
