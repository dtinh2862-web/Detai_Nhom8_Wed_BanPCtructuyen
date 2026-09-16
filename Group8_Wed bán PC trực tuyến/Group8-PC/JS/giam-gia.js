// Tương đương sale.js: tìm kiếm, sắp giá và wishlist_deals; dữ liệu giá là minh họa.
const DEAL_IDS = [1,2,3,5];
function renderDeals() {
    const target = document.querySelector("#deal-list");
    if (!target) return;
    const q = document.querySelector("#deal-search").value.trim().toLowerCase();
    const saved = loadSavedIds("wishlist_deals");
    const savedOnly = document.querySelector("#deal-saved").checked;
    const result = products.filter(p => DEAL_IDS.includes(p.id) && p.name.toLowerCase().includes(q) && (!savedOnly || saved.includes(p.id)));
    result.sort((a,b) => document.querySelector("#deal-sort").value === "desc" ? b.price-a.price : a.price-b.price);
    target.innerHTML = result.map(p => {
        // Dùng lại card PC, thêm giá tham chiếu và nút lưu thay vì lặp toàn bộ component.
        const extra = `<div class="saved-actions"><p class="small">Giá tham chiếu demo: <del>${money(Math.round(p.price/0.9))}</del></p><button class="btn btn-outline-dark" data-deal="${p.id}" aria-pressed="${saved.includes(p.id)}">${saved.includes(p.id)?"Bỏ lưu":"Lưu ưu đãi"}</button></div>`;
        return card(p).replace("</article>",extra+"</article>");
    }).join("") || '<p class="empty">Không có ưu đãi phù hợp.</p>';
}
$(document).on("click","[data-deal]",function(){
    if(toggleSavedId("wishlist_deals",Number($(this).attr("data-deal")))) renderDeals();
});
["deal-search","deal-sort","deal-saved"].forEach(id => document.getElementById(id)?.addEventListener(id==="deal-search"?"input":"change",renderDeals));
renderDeals();
