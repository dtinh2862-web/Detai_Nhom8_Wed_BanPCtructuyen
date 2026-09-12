// Hiển thị sản phẩm, bộ lọc, tin tức và trạng thái menu.
// Tạo HTML cho một thẻ sản phẩm từ object; không tự thay đổi giỏ hàng.
function card(p) {
  const description = Object.values(p.specs).slice(0, 3).join(" · ");
  return '<article class="product-card"><a class="product-image" href="chi-tiet-san-pham.html?id='+p.id+'"><img src="../IMG/san-pham/'+p.image+'" alt="'+escapeHTML(p.name)+'" width="480" height="400" loading="lazy"></a><div class="product-body"><span class="tag">'+categoryNames[p.category]+'</span><h3><a href="chi-tiet-san-pham.html?id='+p.id+'">'+escapeHTML(p.name)+'</a></h3><p>'+escapeHTML(description)+'</p><div class="product-bottom"><strong class="price">'+money(p.price)+'</strong><a href="chi-tiet-san-pham.html?id='+p.id+'" aria-label="Xem '+escapeHTML(p.name)+'">Chi tiết →</a></div></div></article>';
}
// Hiển thị danh sách và gắn sự kiện lọc/sắp xếp trên trang sản phẩm.
function drawProducts() {
  const list = document.querySelector("#product-list");
  if (!list) return;
  const params = new URLSearchParams(location.search);
  let query = params.get("q") || "";
  const category = document.querySelector("#category");
  const budget = document.querySelector("#budget");
  const sort = document.querySelector("#sort");
  if (Object.hasOwn(categoryNames, params.get("category"))) category.value = params.get("category");
  document.querySelector("#global-search").value = query;
  const normalize = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  // Lọc theo loại, ngân sách, tìm kiếm rồi sắp xếp và cập nhật danh sách.
  function draw() {
    let result = products.filter(p =>
      (category.value === "all" || p.category === category.value) &&
      normalize(p.name+" "+Object.values(p.specs).join(" ")).includes(normalize(query.trim())) &&
      (budget.value === "all" || (budget.value === "low" && p.price < 15000000) ||
      (budget.value === "mid" && p.price >= 15000000 && p.price <= 30000000) ||
      (budget.value === "high" && p.price > 30000000)));
    result.sort((a,b) => sort.value === "asc" ? a.price-b.price : sort.value === "desc" ? b.price-a.price : b.id-a.id);
    list.innerHTML = result.length ? result.map(card).join("") : '<p class="empty">Không tìm thấy sản phẩm. Hãy thử xóa bộ lọc.</p>';
    document.querySelector("#result-count").textContent = result.length+" sản phẩm";
    document.querySelector("#search-note").textContent = query ? "Kết quả tìm kiếm: "+query : "";
  }
  // Cập nhật kết quả khi người dùng thay đổi lựa chọn.
  [category,budget,sort].forEach(el => el.addEventListener("change",draw));
  // Bắt thao tác bấm nút hoặc liên kết chức năng.
  document.querySelector("#reset-filter").addEventListener("click", () => {
    query=""; category.value="all"; budget.value="all"; sort.value="new";
    document.querySelector("#global-search").value=""; draw();
  });
  draw();
}
// Lấy id từ URL, tìm sản phẩm và hiển thị thông số; gắn nút thêm giỏ.
function drawDetail() {
  const target = document.querySelector("#detail");
  if (!target) return;
  const id = Number(new URLSearchParams(location.search).get("id"));
  const p = products.find(p => p.id === id);
  if (!p) { target.innerHTML='<h1>Không tìm thấy sản phẩm</h1><p>Vui lòng chọn lại từ danh sách.</p>'; return; }
  document.title=p.name+" | Group 8\'s PC sales website";
  target.innerHTML='<section class="detail-grid"><div class="detail-image"><img src="../IMG/san-pham/'+p.image+'" alt="'+escapeHTML(p.name)+'" width="480" height="400"></div><div><span class="eyebrow">'+categoryNames[p.category]+'</span><h1>'+escapeHTML(p.name)+'</h1><p>'+escapeHTML(Object.values(p.specs).slice(0,4).join(" · "))+'</p><p class="detail-price">'+money(p.price)+'</p><p>'+escapeHTML(p.description)+'</p><form id="add-form"><label>Số lượng<input id="quantity" type="number" value="1" min="1" max="10" step="1" required></label><button class="btn">Thêm vào giỏ hàng</button></form><p class="small">Tối đa 10 sản phẩm mỗi loại trong bản demo.</p></div></section><section class="section"><h2>Thông số chi tiết</h2><div class="table-scroll"><table><caption>Cấu hình '+escapeHTML(p.name)+'</caption><tbody>'+Object.entries(p.specs).map(([k,v])=>'<tr><th scope="row">'+escapeHTML(k)+'</th><td>'+escapeHTML(v)+'</td></tr>').join("")+'</tbody></table></div></section><section class="section"><h2>Sản phẩm liên quan</h2><div class="product-grid">'+products.filter(x=>x.id!==p.id).sort((a,b)=>Number(b.category===p.category)-Number(a.category===p.category)).slice(0,3).map(card).join("")+'</div></section>';
  // Bắt sự kiện gửi form để kiểm tra dữ liệu và xử lý bằng JavaScript.
  document.querySelector("#add-form").addEventListener("submit",event=>{
    // Ngăn form tải lại trang trước khi xử lý xong.
    event.preventDefault(); const quantity=Number(document.querySelector("#quantity").value);
    if (Number.isInteger(quantity) && quantity>=1 && quantity<=10) addCart(p.id,quantity);
  });
}
// Tìm khung sản phẩm nổi bật trên trang chủ.
const featured=document.querySelector("#featured");
if(featured)featured.innerHTML=products.filter(p=>[1,2,3,5].includes(p.id)).map(card).join("");
drawProducts(); drawDetail();
