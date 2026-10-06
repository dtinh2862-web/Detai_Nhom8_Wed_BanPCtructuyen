// Tương đương promotion.js: tìm mã, lọc mã đã lưu và lưu vào saved_promo_codes.
function renderPromos() {
    const target = document.querySelector("#promo-list");
    if (!target) return;
    const q = document.querySelector("#promo-search").value.trim().toUpperCase();
    const saved = loadSavedIds("saved_promo_codes");
    const only = document.querySelector("#promo-saved").checked;
    const result = DANH_SACH_UU_DAI.filter(p => p.code.includes(q) && (!only || saved.includes(p.code)));
    target.innerHTML = result.map(p => `<div class="col-md-4"><article class="promo-card">
        <span class="eyebrow">MÃ ƯU ĐÃI</span><h2>Giảm ${p.percent}%</h2><h3>${escapeHTML(p.title)}</h3>
        <code>${p.code}</code><p>Nhập mã ở bước thanh toán. Mỗi đơn hàng sử dụng một mã ưu đãi.</p>
        <button class="btn btn-warning" data-promo="${p.code}" aria-pressed="${saved.includes(p.code)}">${saved.includes(p.code)?"Bỏ lưu mã":"Lưu mã"}</button>
        <a class="btn btn-outline-dark" href="san-pham.html">Chọn PC</a>
    </article></div>`).join("") || '<p class="empty">Không có mã phù hợp.</p>';
}
$(document).on("click", "[data-promo]", function() {
    if (toggleSavedId("saved_promo_codes", $(this).attr("data-promo"))) renderPromos();
});
document.querySelector("#promo-search")?.addEventListener("input", renderPromos);
document.querySelector("#promo-saved")?.addEventListener("change", renderPromos);
renderPromos();
