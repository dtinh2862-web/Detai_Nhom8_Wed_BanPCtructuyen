// Trang PC nổi bật: tìm kiếm, sắp xếp và lưu id sản phẩm vào wishlist_deals.
const DEAL_IDS = [1, 2, 3, 5];
// Lọc sản phẩm nổi bật, sắp xếp giá rồi bổ sung nút lưu ưu đãi.
function renderDeals() {
    const target = document.querySelector("#deal-list");
    if (!target) return;
    const q = document.querySelector("#deal-search").value.trim().toLowerCase();
    const saved = loadSavedIds("wishlist_deals");
    const savedOnly = document.querySelector("#deal-saved").checked;
    const result = products.filter(p => DEAL_IDS.includes(p.id) && p.name.toLowerCase().includes(q) && (!savedOnly || saved.includes(p.id)));
    result.sort((a, b) => document.querySelector("#deal-sort").value === "desc" ? b.price - a.price : a.price - b.price);
    target.innerHTML = result.map(p => {
        // Dùng lại card PC, thêm liên kết mã ưu đãi và nút lưu để tránh lặp HTML.
        const extra = `<div class="saved-actions"><p class="small"><a href="khuyen-mai.html">Xem mã ưu đãi áp dụng</a></p><button class="btn btn-outline-dark" data-deal="${p.id}" aria-pressed="${saved.includes(p.id)}">${saved.includes(p.id)?"Bỏ lưu":"Lưu ưu đãi"}</button></div>`;
        return card(p).replace("</article>", extra + "</article>");
    }).join("") || '<p class="empty">Không có ưu đãi phù hợp.</p>';
}
$(document).on("click", "[data-deal]", function() {
    if (toggleSavedId("wishlist_deals", Number($(this).attr("data-deal")))) renderDeals();
});
["deal-search", "deal-sort", "deal-saved"].forEach(id => document.getElementById(id)?.addEventListener(id === "deal-search" ? "input" : "change", renderDeals));
renderDeals();
