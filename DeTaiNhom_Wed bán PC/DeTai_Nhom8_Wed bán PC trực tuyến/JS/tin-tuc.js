// Tin tức từ mảng và LocalStorage: danh sách, lọc loại, chi tiết.
// Tạo HTML cho một thẻ tin gồm ảnh, ngày, tiêu đề và liên kết chi tiết.
function newsCard(n) {
  return '<article class="news-card"><a href="chi-tiet-tin-tuc.html?id='+n.id+'"><img src="../IMG/tin-tuc/'+n.image+'" alt="Minh họa: '+escapeHTML(n.title)+'" width="640" height="360" loading="lazy"></a><div><time datetime="'+n.date+'">'+n.date.split("-").reverse().join("/")+'</time><h3><a href="chi-tiet-tin-tuc.html?id='+n.id+'">'+escapeHTML(n.title)+'</a></h3><p>'+escapeHTML(n.excerpt)+'</p><a href="chi-tiet-tin-tuc.html?id='+n.id+'">Đọc bài viết →</a></div></article>';
}
// Hiển thị tin nổi bật hoặc bài viết tương ứng id trên URL.
function drawNews() {
  ["home-news"].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML=news.map(newsCard).join("");});
  const target=document.querySelector("#news-detail");
  if (!target) return;
  const n=news.find(n=>n.id===Number(new URLSearchParams(location.search).get("id")));
  if (!n) { target.innerHTML="<h1>Không tìm thấy bài viết</h1>"; return; }
  document.title=n.title+" | Group 8\'s PC sales website";
  target.innerHTML='<article class="article"><span class="eyebrow">GÓC CÔNG NGHỆ</span><h1>'+escapeHTML(n.title)+'</h1><p class="small">Nhóm 8 · <time datetime="'+n.date+'">'+n.date.split("-").reverse().join("/")+'</time> · Bài viết học tập</p><img class="article-cover" src="../IMG/tin-tuc/'+n.image+'" alt="Minh họa: '+escapeHTML(n.title)+'" width="640" height="360"><p class="lead">'+escapeHTML(n.excerpt)+'</p>'+n.sections.map(([heading,text])=>'<h2>'+escapeHTML(heading)+'</h2><p>'+escapeHTML(text)+'</p>').join("")+'</article><section class="section"><h2>Tin liên quan</h2><div class="news-grid">'+news.filter(x=>x.id!==n.id).map(newsCard).join("")+'</div></section>';
}

// Tìm khung danh sách tin để gắn bộ lọc.
const newsList = document.querySelector("#news-list");
if (newsList) {
  const filter = document.querySelector("#news-category");
  // Lọc tin theo loại đang chọn rồi cập nhật số lượng và thẻ tin.
  function renderNewsList() {
    const items = news.filter(n => filter.value === "all" || n.category === filter.value);
    newsList.innerHTML = items.length ? items.map(newsCard).join("") : '<p class="empty">Chưa có tin thuộc loại này.</p>';
    document.querySelector("#news-count").textContent = items.length + " bài viết";
  }
  // Cập nhật kết quả khi người dùng thay đổi lựa chọn.
  filter.addEventListener("change", renderNewsList);
  renderNewsList();
}
drawNews();
