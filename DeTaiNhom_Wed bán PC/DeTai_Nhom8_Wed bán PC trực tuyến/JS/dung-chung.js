// Hàm dùng chung: LocalStorage, thông báo, menu và số lượng giỏ.
// Đọc JSON theo key từ LocalStorage; trả giá trị dự phòng nếu thiếu hoặc lỗi.
function readStore(key, fallback) {
  try { const value=JSON.parse(localStorage.getItem(key)); return value===null?fallback:value; }
  catch { return fallback; }
}
// Chuyển dữ liệu sang JSON rồi lưu; báo lỗi nếu trình duyệt chặn lưu trữ.
function writeStore(key,value) {
  try { localStorage.setItem(key,JSON.stringify(value)); return true; }
  catch { notify("Không lưu được dữ liệu. Hãy cho phép lưu trữ của trình duyệt."); return false; }
}
// Hiển thị thông báo ngắn và tự ẩn sau vài giây.
function notify(text) {
  const el=document.querySelector("#toast");
  el.textContent=text; el.hidden=false;
  clearTimeout(window.toastTimeout);
  window.toastTimeout=setTimeout(()=>el.hidden=true,4000);
}

// Định dạng số thành tiền Việt Nam; dữ liệu gốc vẫn là số.
const money = value => new Intl.NumberFormat("vi-VN", {style:"currency", currency:"VND"}).format(value);
// Chuyển ký tự HTML đặc biệt thành văn bản an toàn trước khi đưa vào innerHTML.
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
// Tính tổng số lượng sản phẩm và cập nhật huy hiệu giỏ hàng.
function updateCartCount() {
  document.querySelector("#cart-count").textContent=getCart().reduce((n,row)=>n+row.quantity,0);
}
document.querySelectorAll(".menu a").forEach(a => {
  const page = document.body.dataset.page;
  const pageMap = {"trang-chu":"index","san-pham":"products","tin-tuc":"news","gioi-thieu":"about","so-do-trang-web":"sitemap"};
  const target = pageMap[a.getAttribute("href").replace(".html", "")];
  if (target === page || (target === "products" && page === "product-detail") ||
      (target === "news" && page === "news-detail")) a.setAttribute("aria-current","page");
});
// Form tìm kiếm dùng action=san-pham.html và tham số q, hoạt động từ mọi trang.
