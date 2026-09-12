// Giỏ hàng và checkout mô phỏng. Không có API hay thanh toán thật.
// Đọc giỏ, loại dữ liệu sai, gộp dòng trùng và giới hạn số lượng 1–10.
function getCart() {
  const raw=readStore("gioHang",[]);
  if(!Array.isArray(raw)) return [];
  const valid=[];
  raw.forEach(row=>{
    if(!row || !products.some(p=>p.id===row.id) || !Number.isInteger(row.quantity) || row.quantity<1) return;
    const previous=valid.find(x=>x.id===row.id);
    if(previous) previous.quantity=Math.min(10,previous.quantity+row.quantity);
    else valid.push({id:row.id,quantity:Math.min(10,row.quantity)});
  });
  return valid;
}
// Lưu giỏ hàng rồi cập nhật số lượng hiển thị ở header.
function saveCart(cart) {const ok=writeStore("gioHang",cart);if(ok)updateCartCount();return ok;}
// Thêm sản phẩm hoặc tăng số lượng của dòng đã có trong giỏ.
function addCart(id,quantity) {
  const cart=getCart(), item=cart.find(x=>x.id===id);
  if((item?.quantity||0)+quantity>10) {notify("Tối đa 10 sản phẩm mỗi loại.");return;}
  if(item) item.quantity+=quantity; else cart.push({id,quantity});
  if(saveCart(cart))notify("Đã thêm sản phẩm vào giỏ hàng.");
}
// Cộng đơn giá nhân số lượng của tất cả các dòng trong giỏ.
function totalCart() {return getCart().reduce((total,row)=>total+products.find(p=>p.id===row.id).price*row.quantity,0);}
const emptyCart='<div class="empty"><h2>Giỏ hàng đang trống</h2><p>Chọn sản phẩm trước khi xác nhận đơn mẫu.</p><a class="btn" href="san-pham.html">Khám phá sản phẩm →</a></div>';
// Vẽ bảng giỏ và gắn thao tác tăng, giảm, xóa từng sản phẩm.
function renderCart() {
  const el=document.querySelector("#cart-content");if(!el)return;
  const cart=getCart();
  if(!cart.length){el.innerHTML=emptyCart;return;}
  el.innerHTML='<div class="table-scroll"><table class="cart-table"><caption>Sản phẩm trong giỏ hàng</caption><thead><tr><th scope="col">Sản phẩm</th><th scope="col">Đơn giá</th><th scope="col">Số lượng</th><th scope="col">Thành tiền</th><th scope="col">Xóa</th></tr></thead><tbody>'+cart.map(row=>{
    const p=products.find(p=>p.id===row.id);
    return '<tr><td><a class="cart-product" href="chi-tiet-san-pham.html?id='+p.id+'"><img src="../IMG/san-pham/'+p.image+'" alt="" width="70" height="60"><strong>'+escapeHTML(p.name)+'</strong></a></td><td>'+money(p.price)+'</td><td><div class="quantity-controls"><button data-id="'+p.id+'" data-action="minus" aria-label="Giảm số lượng '+escapeHTML(p.name)+'" '+(row.quantity===1?'disabled':'')+'>−</button><span>'+row.quantity+'</span><button data-id="'+p.id+'" data-action="plus" aria-label="Tăng số lượng '+escapeHTML(p.name)+'" '+(row.quantity===10?'disabled':'')+'>+</button></div></td><td>'+money(p.price*row.quantity)+'</td><td><button class="remove" data-id="'+p.id+'" data-action="remove" aria-label="Xóa '+escapeHTML(p.name)+'">Xóa</button></td></tr>';
  }).join("")+'</tbody></table></div><div class="cart-footer"><a href="san-pham.html">← Tiếp tục mua</a><div><p>Tổng cộng <strong class="price">'+money(totalCart())+'</strong></p><a class="btn" href="thanh-toan.html">Tiến hành thanh toán →</a></div></div>';
  // Bắt thao tác bấm nút hoặc liên kết chức năng.
  el.querySelectorAll("[data-action]").forEach(button=>button.addEventListener("click",()=>{
    const current=getCart(), item=current.find(x=>x.id===Number(button.dataset.id));
    if(!item)return;
    if(button.dataset.action==="plus")item.quantity=Math.min(10,item.quantity+1);
    if(button.dataset.action==="minus")item.quantity=Math.max(1,item.quantity-1);
    const next=button.dataset.action==="remove"?current.filter(x=>x.id!==item.id):current;
    if(saveCart(next)) renderCart();
  }));
}
// Hiển thị tóm tắt đơn và vô hiệu hóa đặt hàng nếu giỏ trống.
function renderCheckout() {
  const summary=document.querySelector("#checkout-summary");if(!summary)return;
  const cart=getCart();
  document.querySelector("#place-order").disabled=!cart.length;
  summary.innerHTML=cart.length?'<h2>Đơn hàng của bạn</h2>'+cart.map(row=>{
    const p=products.find(p=>p.id===row.id);
    return '<div class="order-line"><span>'+escapeHTML(p.name)+' × '+row.quantity+'</span><strong>'+money(p.price*row.quantity)+'</strong></div>';
  }).join("")+'<div class="order-line"><span>Tổng đơn mẫu</span><strong class="price">'+money(totalCart())+'</strong></div><p class="small">Không thu tiền, không giao hàng thực tế.</p>':emptyCart;
}
// Chỉ xử lý đặt đơn ở trang Thanh toán.
const checkout=document.querySelector("#checkout-form");
if(checkout) {
  const session=readStore("dangNhapHienTai",null),user=getUsers().find(u=>u.username===session?.username);
  if(user) ["name","phone","email"].forEach(key=>checkout.elements[key].value=user[key]||"");
  // Bắt sự kiện gửi form để kiểm tra dữ liệu và xử lý bằng JavaScript.
  checkout.addEventListener("submit",event=>{
    // Ngăn form tải lại trang trước khi xử lý xong.
    event.preventDefault();
    if(!getCart().length){renderCheckout();return;}
    const data=Object.fromEntries(new FormData(checkout));
    if(!data.name.trim()||!data.address.trim()){document.querySelector("#checkout-message").textContent="Vui lòng nhập họ tên và địa chỉ hợp lệ.";return;}
    const total=totalCart(),count=getCart().reduce((sum,row)=>sum+row.quantity,0);
    if(!saveCart([]))return;
    const id="TZ-DEMO-"+Date.now().toString(36).toUpperCase();
    document.querySelector("#checkout-content").hidden=true;
    const success=document.querySelector("#checkout-success");
    success.hidden=false;success.className="success-panel";
    success.innerHTML='<span class="eyebrow">ĐÃ HOÀN TẤT MÔ PHỎNG</span><h2>Đơn mẫu đã được xác nhận</h2><p id="confirmation-text"></p><p>Không có đơn hàng thật được gửi đi. Giỏ hàng đã được làm trống.</p><a class="btn" href="san-pham.html">Tiếp tục khám phá</a>';
    document.querySelector("#confirmation-text").textContent="Mã đơn: "+id+" · "+count+" sản phẩm · "+money(total)+" · "+data.payment+" (mô phỏng)";
    success.focus();
  });
}
// Đồng bộ giao diện khi dữ liệu được thay đổi từ tab khác.
window.addEventListener("storage",event=>{
  if(event.key==="gioHang"||event.key===null){updateCartCount();renderCart();renderCheckout();}
  if(event.key==="taiKhoan"||event.key==="dangNhapHienTai"||event.key===null)updateAccount();
});
updateCartCount();renderCart();renderCheckout();
