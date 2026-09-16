// Tin tức: dùng dữ liệu riêng của đề tài PC, không lấy nội dung từ nhóm bán quần áo.
// Tạo thẻ tin trong cột Bootstrap; escapeHTML bảo vệ các trường văn bản.
function newsCard(n) {
    const url = "chi-tiet-tin-tuc.html?id=" + n.id;
    const date = n.date.split("-").reverse().join("/");
    return `
        <!-- Bootstrap chia 1 cột điện thoại, 2 cột tablet, 3 cột desktop. -->
        <div class="col-12 col-md-6 col-lg-4">
            <article class="card h-100 news-card">
                <a href="${url}">
                    <img src="../IMG/tin-tuc/${n.image}" alt="Minh họa: ${escapeHTML(n.title)}"
                         width="640" height="360" loading="lazy">
                </a>
                <div>
                    <!-- datetime lưu ngày máy đọc được, văn bản hiển thị ngày/tháng/năm. -->
                    <time datetime="${n.date}">${date}</time>
                    <h3><a href="${url}">${escapeHTML(n.title)}</a></h3>
                    <p>${escapeHTML(n.excerpt)}</p>
                    <a href="${url}">Đọc bài viết →</a>
                    <!-- saved_posts theo news.js mẫu; nút copy giữ liên kết đến bài PC. -->
                    <button class="btn btn-outline-dark mt-2" data-save-post="${n.id}" aria-pressed="${loadSavedIds("saved_posts").includes(n.id)}">${loadSavedIds("saved_posts").includes(n.id)?"Bỏ lưu tin":"Lưu tin"}</button>
                    <button class="btn btn-outline-dark mt-2" data-copy-post="${n.id}">Sao chép liên kết</button>
                </div>
            </article>
        </div>`;
}

// Khởi tạo bộ lọc ở trang danh sách; các trang khác bỏ qua khối này.
const newsList = document.querySelector("#news-list");
if (newsList) {
    const filter = document.querySelector("#news-category");
    // Cập nhật cả số bài và các thẻ sau mỗi lần đổi loại tin.
    function renderNewsList() {
        // Như getFiltered của mẫu: kết hợp loại tin với bộ lọc bài đã lưu.
        const savedOnly = document.querySelector("#news-saved")?.checked;
        const saved = loadSavedIds("saved_posts");
        const items = news.filter(n => (filter.value === "all" || n.category === filter.value) && (!savedOnly || saved.includes(n.id)));
        newsList.innerHTML = items.length ? items.map(newsCard).join("") :
            '<p class="empty">Chưa có tin thuộc loại này.</p>';
        document.querySelector("#news-count").textContent = items.length + " bài viết";
    }
    filter.addEventListener("change", renderNewsList);
    document.querySelector("#news-saved")?.addEventListener("change", renderNewsList);
    renderNewsList();
}
// Hiển thị tin nổi bật khi được nạp ở trang chủ.
const homeNews = document.getElementById("home-news");
if (homeNews) homeNews.innerHTML = news.map(newsCard).join("");

// Lưu/bỏ lưu bài viết và cập nhật nhãn nút tại chỗ như saved_posts của nhóm mẫu.
$(document).on("click","[data-save-post]",function(){
    const id = Number($(this).attr("data-save-post"));
    if(toggleSavedId("saved_posts",id)) {
        const saved = loadSavedIds("saved_posts").includes(id);
        this.textContent = saved ? "Bỏ lưu tin" : "Lưu tin";
        this.setAttribute("aria-pressed", String(saved));
        document.querySelector("#news-category")?.dispatchEvent(new Event("change"));
    }
});
// Clipboard có thể bị chặn; fallback hiện đường dẫn để tự sao chép.
$(document).on("click","[data-copy-post]",async function(){
    const id = Number($(this).attr("data-copy-post"));
    const url = new URL("chi-tiet-tin-tuc.html?id="+id, location.href).href;
    try { await navigator.clipboard.writeText(url); notify("Đã sao chép liên kết."); }
    catch { window.prompt("Sao chép liên kết bài viết:",url); }
});
