// Đọc id và dựng trang chi tiết; id thiếu/sai phải có trạng thái thông báo.
function drawDetail() {
    const target = document.querySelector("#detail");
    if (!target) return;
    // Đọc object đã chọn; chỉ lấy sản phẩm có id hợp lệ trong danh mục.
    const selected = readStore("selectedProduct", null);
    const requestedId = new URLSearchParams(location.search).get("id");
    const id = requestedId === null ? selected?.id : Number(requestedId);
    const p = products.find(item => item.id === id);
    if (!p) {
        target.innerHTML = '<h1>Không tìm thấy sản phẩm</h1><p>Vui lòng chọn lại từ danh sách.</p>';
        return;
    }
    // Đồng bộ lựa chọn khi mở đường dẫn chi tiết trực tiếp hoặc từ sitemap.
    writeStore("selectedProduct", p);
    document.title = p.name + " | G8-PC";
    // Tạo từng dòng thông số từ object, không chép lặp bảng cho mỗi sản phẩm.
    const specs = Object.entries(p.specs).map(([key, value]) =>
        `<tr><th scope="row">${escapeHTML(key)}</th><td>${escapeHTML(value)}</td></tr>`
    ).join("");
    const related = products.filter(item => item.id !== p.id)
        .sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category))
        .slice(0, 3).map(card).join("");

    // Template literal cho phép viết HTML nhiều dòng và chèn dữ liệu bằng ${...}.
    target.innerHTML = `
        <!-- Bố cục riêng: ảnh PC bên trái, cấu hình và thao tác bên phải. -->
        <section class="row g-4 detail-grid">
            <div class="col-lg-6 detail-image">
                <img id="detail-photo" src="../IMG/san-pham/${p.image}" alt="${escapeHTML(p.name)}" width="480" height="400">
                <!-- Hai nút xem cùng hình: toàn khung và phóng to; không giả ảnh góc khác. -->
                <div class="thumbnail-controls"><button class="btn btn-outline-dark" id="photo-fit" type="button">Toàn khung</button><button class="btn btn-outline-dark" id="photo-zoom" type="button">Phóng to ảnh</button></div>
            </div>
            <div class="col-lg-6">
                <span class="eyebrow">${categoryNames[p.category]}</span>
                <h1>${escapeHTML(p.name)}</h1>
                <p>${escapeHTML(Object.values(p.specs).slice(0, 4).join(" · "))}</p>
                <p class="detail-price">${money(p.price)}</p>
                <p>${escapeHTML(p.description)}</p>
                <!-- form-control tạo ô nhập Bootstrap; JS kiểm tra số nguyên trước khi thêm. -->
                <form id="add-form">
                    <!-- Nút tăng/giảm type=button không gửi form; input vẫn cho nhập trực tiếp. -->
                    <div class="detail-quantity"><label for="quantity">Số lượng</label>
                        <div class="input-group">
                            <button class="btn btn-outline-dark" id="quantity-minus" type="button" aria-label="Giảm số lượng">−</button>
                            <input class="form-control" id="quantity" type="number" value="1" min="1" max="999" step="1" required>
                            <button class="btn btn-outline-dark" id="quantity-plus" type="button" aria-label="Tăng số lượng">+</button>
                        </div>
                    </div>
                    <button class="btn btn-warning" type="submit">Thêm vào giỏ hàng</button>
                    <button class="btn btn-dark" id="buy-now" type="button">Mua ngay</button>
                </form>
                <p class="small">Xem đầy đủ cấu hình bên dưới trước khi lựa chọn.</p>
            </div>
        </section>
        <!-- Bảng thông số có caption và th để hỗ trợ trình đọc màn hình. -->
        <section class="section">
            <!-- nav-tabs của Bootstrap chuyển giữa cấu hình và mô tả. -->
            <div class="spec-tabs">
            <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item" role="presentation"><button class="nav-link active" id="spec-tab" data-bs-toggle="tab" data-bs-target="#spec-pane" type="button" role="tab" aria-controls="spec-pane" aria-selected="true">Thông số chi tiết</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" id="description-tab" data-bs-toggle="tab" data-bs-target="#description-pane" type="button" role="tab" aria-controls="description-pane" aria-selected="false">Mô tả</button></li>
            </ul>
            <div class="tab-content">
            <div class="tab-pane fade show active" id="spec-pane" role="tabpanel" aria-labelledby="spec-tab" tabindex="0">
            <div class="table-scroll"><table>
                <caption>Cấu hình ${escapeHTML(p.name)}</caption><tbody>${specs}</tbody>
            </table></div></div>
            <div class="tab-pane fade p-3" id="description-pane" role="tabpanel" aria-labelledby="description-tab" tabindex="0"><p>${escapeHTML(p.description)}</p></div>
            </div></div>
        </section>
        <!-- row g-4 tạo hàng Bootstrap và khoảng cách giữa các cột sản phẩm. -->
        <section class="section">
            <h2>Sản phẩm liên quan</h2>
            <div class="row g-4 product-grid">${related}</div>
        </section>`;

    // Giới hạn số lượng bằng nút không nhỏ hơn 1, xử lý cả khi ô nhập đang rỗng.
    document.querySelector("#quantity-minus").addEventListener("click", () => {
        const input = document.querySelector("#quantity");
        input.value = Math.max(1, (Number(input.value) || 1) - 1);
    });
    document.querySelector("#quantity-plus").addEventListener("click", () => {
        const input = document.querySelector("#quantity");
        input.value = Math.min(999, (Number(input.value) || 1) + 1);
    });
    // classList đổi trạng thái phóng to; CSS quản lý kích thước ảnh.
    document.querySelector("#photo-fit").addEventListener("click", () => document.querySelector("#detail-photo").classList.remove("zoomed"));
    document.querySelector("#photo-zoom").addEventListener("click", () => document.querySelector("#detail-photo").classList.add("zoomed"));
    // Mua ngay chỉ đưa PC đang xem vào checkout.
    document.querySelector("#buy-now").addEventListener("click", () => {
        const rawQuantity = document.querySelector("#quantity").value;
        const quantity = Number(rawQuantity);
        if (isValidQuantity(rawQuantity)) buyNow(p.id, quantity);
        else notify("Số lượng phải là số nguyên từ 1 đến 999.");
    });
    // Ngăn tải lại trang khi submit và gọi hàm giỏ hàng dùng chung.
    document.querySelector("#add-form").addEventListener("submit", event => {
        event.preventDefault();
        const rawQuantity = document.querySelector("#quantity").value;
        const quantity = Number(rawQuantity);
        if (isValidQuantity(rawQuantity)) {
            addCart(p.id, quantity);
        } else notify("Số lượng phải là số nguyên từ 1 đến 999.");
    });
}

// Khởi tạo riêng trang chi tiết sau khi HTML được đọc xong.
drawDetail();
