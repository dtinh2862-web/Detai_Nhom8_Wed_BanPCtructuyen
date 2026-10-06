// Trang chủ hiển thị tin nổi bật; trang chi tiết đọc bài tương ứng id.
function drawNewsDetail() {
    const target = document.querySelector("#news-detail");
    if (!target) return;
    // selectedNews nhận từ thẻ tin; id trên URL hỗ trợ mở liên kết trực tiếp.
    const selected = readStore("selectedNews", null);
    const requestedId = new URLSearchParams(location.search).get("id");
    const id = requestedId === null ? selected?.id : Number(requestedId);
    const n = news.find(item => item.id === id);
    if (!n) {
        target.innerHTML = "<h1>Không tìm thấy bài viết</h1>";
        return;
    }
    writeStore("selectedNews", n);
    document.title = n.title + " | G8-PC";

    // map chuyển các mục nội dung thành HTML; join ghép thành một chuỗi.
    const sections = n.sections.map(([heading, text]) =>
        `<h2>${escapeHTML(heading)}</h2><p>${escapeHTML(text)}</p>`
    ).join("");
    const related = news.filter(item => item.id !== n.id).map(newsCard).join("");
    target.innerHTML = `
        <!-- article chứa nội dung độc lập của bài viết. -->
        <article class="article">
            <span class="eyebrow">GÓC CÔNG NGHỆ</span>
            <h1>${escapeHTML(n.title)}</h1>
            <p class="small">G8-PC ·
                <time datetime="${n.date}">${n.date.split("-").reverse().join("/")}</time>
                · Bài viết học tập
            </p>
            <img class="article-cover" src="../IMG/tin-tuc/${n.image}"
                 alt=" ${escapeHTML(n.title)}" width="640" height="360">
            <p class="lead">${escapeHTML(n.excerpt)}</p>
            ${sections}
        </article>
        <!-- Chỉ liệt kê các bài khác, không lặp lại bài đang đọc. -->
        <section class="section">
            <h2>Tin liên quan</h2>
            <div class="row g-4 news-grid">${related}</div>
        </section>`;
}

// Chỉ file trang chi tiết gọi hàm này.
drawNewsDetail();
