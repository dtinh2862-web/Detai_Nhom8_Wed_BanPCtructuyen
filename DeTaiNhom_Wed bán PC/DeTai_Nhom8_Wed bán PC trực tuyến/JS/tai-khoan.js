// Tài khoản demo cục bộ. Không thay thế xác thực phía máy chủ.
// Đọc mảng tài khoản và loại các phần tử không hợp lệ.
function getUsers() {
  const users=readStore("taiKhoan",[]);
  return Array.isArray(users)?users.filter(u=>u && typeof u.username==="string" && typeof u.email==="string" && typeof u.passwordHash==="string"):[];
}
// Cập nhật lời chào và nút đăng xuất từ trạng thái đăng nhập.
function updateAccount() {
  const user=readStore("dangNhapHienTai",null);
  const valid=user && typeof user.username==="string" && getUsers().some(u=>u.username===user.username);
  document.querySelector("#account-link").textContent=valid?"Xin chào, "+user.username:"Tài khoản";
  document.querySelector("#logout").hidden=!valid;
}
// Băm mật khẩu thử nghiệm kèm salt bằng Web Crypto; không phải xác thực máy chủ.
async function passwordHash(password,salt) {
  // Hash nhằm tránh lưu mật khẩu dạng rõ; dữ liệu cục bộ vẫn có thể bị sửa.
  if(!globalThis.crypto?.subtle) throw new Error("Hãy chạy bằng Live Server (localhost) để dùng tài khoản demo.");
  const buffer=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(salt+password));
  return Array.from(new Uint8Array(buffer),b=>b.toString(16).padStart(2,"0")).join("");
}
// Kiểm tra bằng JavaScript, không chỉ dựa vào thuộc tính required của HTML.
// Kiểm tra họ tên, email, điện thoại, username và hai ô mật khẩu.
function validateRegistration(data) {
  if (!data.name.trim()) return "Vui lòng nhập họ và tên.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) return "Email không hợp lệ.";
  if (!/^0[0-9]{9}$/.test(data.phone)) return "Điện thoại phải có 10 chữ số và bắt đầu bằng 0.";
  if (!/^[A-Za-z0-9_]{3,30}$/.test(data.username.trim())) return "Tên đăng nhập gồm 3–30 chữ, số hoặc dấu gạch dưới.";
  if (data.password.length < 8) return "Mật khẩu cần ít nhất 8 ký tự.";
  if (data.password !== data.confirm) return "Mật khẩu xác nhận chưa khớp.";
  return "";
}
// Chỉ gắn xử lý đăng ký khi có form trên trang Đăng ký.
const register=document.querySelector("#register-form");
// Bắt sự kiện gửi form để kiểm tra dữ liệu và xử lý bằng JavaScript.
if(register) register.addEventListener("submit",async event=>{
  // Ngăn form tải lại trang trước khi xử lý xong.
  event.preventDefault();
  const data=Object.fromEntries(new FormData(register));
  const message=document.querySelector("#register-message");
  const username=data.username.trim().toLowerCase(), email=data.email.trim().toLowerCase();
  document.querySelector("#registration-result").hidden = true;
  const validationError = validateRegistration(data);
  if (validationError) { message.textContent = validationError; return; }
  if(data.password!==data.confirm) {message.textContent="Mật khẩu xác nhận chưa khớp.";return;}
  if(getUsers().some(u=>u.username.toLowerCase()===username||u.email.toLowerCase()===email)) {message.textContent="Tên đăng nhập hoặc email đã được đăng ký.";return;}
  const button=register.querySelector("button"); button.disabled=true;
  try {
    const salt=Array.from(crypto.getRandomValues(new Uint8Array(16)),b=>b.toString(16).padStart(2,"0")).join("");
    const hash=await passwordHash(data.password,salt);
    const users=getUsers();
    if(users.some(u=>u.username===username||u.email===email)) throw new Error("Tài khoản đã tồn tại.");
    if(writeStore("taiKhoan",[...users,{name:data.name.trim(),username,email,phone:data.phone,salt,passwordHash:hash}])) {
      message.textContent="Đăng ký thành công. Thông tin của bạn ở bên dưới.";
      document.querySelector("#registered-name").textContent=data.name.trim();
      document.querySelector("#registered-email").textContent=email;
      document.querySelector("#registered-phone").textContent=data.phone;
      document.querySelector("#registered-username").textContent=username;
      document.querySelector("#registration-result").hidden=false;
      register.reset();
    }
  } catch(error) {message.textContent=error.message;}
  finally {button.disabled=false;}
});
// Chỉ gắn xử lý đăng nhập khi có form trên trang Đăng nhập.
const login=document.querySelector("#login-form");
// Bắt sự kiện gửi form để kiểm tra dữ liệu và xử lý bằng JavaScript.
if(login) login.addEventListener("submit",async event=>{
  // Ngăn form tải lại trang trước khi xử lý xong.
  event.preventDefault();
  const data=Object.fromEntries(new FormData(login));
  const identity=data.identity.trim().toLowerCase();
  const user=getUsers().find(u=>u.username.toLowerCase()===identity||u.email.toLowerCase()===identity);
  const message=document.querySelector("#login-message"), button=login.querySelector("button"); button.disabled=true;
  try {
    if(!user || await passwordHash(data.password,user.salt)!==user.passwordHash) {
      message.textContent="Tên đăng nhập/email hoặc mật khẩu không đúng.";return;
    }
    if(writeStore("dangNhapHienTai",{username:user.username})) {
      updateAccount(); message.textContent="Đăng nhập thành công. Bạn có thể tiếp tục mua sắm.";
      login.reset();
      location.href = "trang-chu.html";
    }
  } catch(error) {message.textContent=error.message;}
  finally {button.disabled=false;}
});
// Bắt thao tác bấm nút hoặc liên kết chức năng.
document.querySelector("#logout").addEventListener("click",()=>{
  if(writeStore("dangNhapHienTai",null)) {updateAccount();notify("Đã đăng xuất tài khoản demo.");}
});
updateAccount();
