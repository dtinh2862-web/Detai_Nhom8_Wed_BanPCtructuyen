// Sản phẩm: tạo thẻ, lọc danh sách và đọc chi tiết bằng id trên URL.
// card trả về HTML; Bootstrap col-* chia 1/2/3 cột theo kích thước màn hình.
function card(p) {
    const description = Object.values(p.specs).slice(0, 3).join(" · ");
    const url = "chi-tiet-san-pham.html?id=" + p.id;
    // escapeHTML ngăn nội dung văn bản trong LocalStorage trở thành thẻ HTML.
    return `
        <!-- col-12: toàn hàng; md: hai cột; lg: ba cột. -->
        <div class="col-12 col-md-6 col-lg-4 product-column">
            <article class="card h-100 product-card the-san-pham">
                <!-- href chuyển tới đúng sản phẩm, loading trì hoãn ảnh ngoài màn hình. -->
                <a class="product-image" href="${url}">
                    <img src="../IMG/san-pham/${p.image}" alt="${escapeHTML(p.name)}"
                         width="480" height="400" loading="lazy">
                </a>
                <div class="product-body">
                    <span class="tag">${categoryNames[p.category]}</span>
                    <h3><a href="${url}">${escapeHTML(p.name)}</a></h3>
                    <p>${escapeHTML(description)}</p>
                    <div class="product-bottom">
                        <strong class="price">${money(p.price)}</strong>
                        <a class="btn btn-outline-dark" href="${url}" aria-label="Xem ${escapeHTML(p.name)}">Chi tiết →</a>
                        <!-- jQuery trong chung.js bắt data-add-cart và kiểm tra đăng nhập. -->
                        <button class="btn btn-warning" type="button" data-add-cart="${p.id}">Thêm giỏ</button>
                    </div>
                </div>
            </article>
        </div>`;
}

// Chỉ khởi tạo bộ lọc khi trang có khung #product-list.
function drawProducts() {
    const list = document.querySelector("#product-list");
    if (!list) return;
    const params = new URLSearchParams(location.search);
    let query = params.get("q") || "";
    const category = document.querySelector("#category");
    const budget = document.querySelector("#budget");
    const sort = document.querySelector("#sort");
    if (Object.hasOwn(categoryNames, params.get("category"))) {
        category.value = params.get("category");
    }
    document.querySelector("#global-search").value = query;

    // Bỏ dấu và chuyển chữ thường để tìm kiếm tiếng Việt thuận tiện hơn.
    const normalize = text => text.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();

    // Lọc theo cả ba điều kiện, sau đó sắp xếp mảng kết quả mới.
    function draw() {
        let result = products.filter(p =>
            (category.value === "all" || p.category === category.value) &&
            normalize(p.name + " " + Object.values(p.specs).join(" ")).includes(normalize(query.trim())) &&
            (budget.value === "all" ||
             (budget.value === "low" && p.price < 15000000) ||
             (budget.value === "mid" && p.price >= 15000000 && p.price <= 30000000) ||
             (budget.value === "high" && p.price > 30000000))
        );
        result.sort((a, b) => sort.value === "asc" ? a.price - b.price :
            sort.value === "desc" ? b.price - a.price : b.id - a.id);
        list.innerHTML = result.length ? result.map(card).join("") :
            '<p class="empty">Không tìm thấy sản phẩm. Hãy thử xóa bộ lọc.</p>';
        document.querySelector("#result-count").textContent = result.length + " sản phẩm";
        document.querySelector("#search-note").textContent = query ? "Kết quả tìm kiếm: " + query : "";
    }

    // change chạy khi chọn bộ lọc; click xóa điều kiện rồi vẽ lại danh sách.
    [category, budget, sort].forEach(el => el.addEventListener("change", draw));
    document.querySelector("#reset-filter").addEventListener("click", () => {
        query = "";
        category.value = "all";
        budget.value = "all";
        sort.value = "new";
        document.querySelector("#global-search").value = "";
        draw();
    });
    draw();
}

// Script nằm cuối body nên DOM sẵn sàng; mỗi hàm kiểm tra khung của trang tương ứng.
const featured = document.querySelector("#featured");
if (featured) {
    featured.innerHTML = products.filter(p => [1, 2, 3, 5].includes(p.id)).map(card).join("");
}
drawProducts();
