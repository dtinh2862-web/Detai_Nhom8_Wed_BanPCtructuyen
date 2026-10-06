// Tương đương collection.js: nhóm sản phẩm theo nhu cầu, lọc và lưu bộ sưu tập.
const COLLECTIONS = [{
    id: "gaming",
    name: "Góc Gaming",
    description: "PC chơi game và giải trí."
}, {
    id: "office",
    name: "Làm việc hiệu quả",
    description: "PC cho văn phòng, học tập."
}, {
    id: "creator",
    name: "Không gian sáng tạo",
    description: "Cấu hình dựng hình và thiết kế."
}, {
    id: "component",
    name: "Nâng cấp hệ thống",
    description: "Linh kiện mở rộng máy tính."
}];
// Lọc bộ sưu tập theo tên và trạng thái đã lưu rồi tạo thẻ Bootstrap.
function renderCollections() {
    const target = document.querySelector("#collection-list");
    if (!target) return;
    const q = document.querySelector("#collection-search").value.trim().toLowerCase();
    const savedOnly = document.querySelector("#collection-saved").checked;
    const saved = loadSavedIds("wishlist_collections");
    const result = COLLECTIONS.filter(c => c.name.toLowerCase().includes(q) && (!savedOnly || saved.includes(c.id)));
    target.innerHTML = result.map(c => {
        const image = products.find(p => p.category === c.id)?.image;
        return `<div class="col-md-6 col-lg-3"><article class="card h-100 product-card">
            <img src="../IMG/san-pham/${image}" alt="${escapeHTML(c.name)}" width="480" height="400">
            <div class="product-body"><h2 class="h5">${escapeHTML(c.name)}</h2><p>${escapeHTML(c.description)}</p>
                <a class="btn btn-warning" href="san-pham.html?category=${c.id}">Khám phá</a>
                <button type="button" class="btn btn-outline-dark mt-2" data-collection="${c.id}" aria-pressed="${saved.includes(c.id)}">${saved.includes(c.id)?"Bỏ lưu":"Lưu bộ sưu tập"}</button>
            </div></article></div>`;
    }).join("") || '<p class="empty">Không có bộ sưu tập phù hợp.</p>';
}
// jQuery delegation tiếp tục hoạt động sau khi danh sách được render lại.
$(document).on("click", "[data-collection]", function() {
    if (toggleSavedId("wishlist_collections", $(this).attr("data-collection"))) renderCollections();
});
document.querySelector("#collection-search")?.addEventListener("input", renderCollections);
document.querySelector("#collection-saved")?.addEventListener("change", renderCollections);
renderCollections();
