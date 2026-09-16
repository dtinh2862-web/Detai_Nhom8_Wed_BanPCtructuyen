// Chuyển thể account.js: hồ sơ, lịch sử orders_<id>, đổi email và mật khẩu hiện tại.
function updateAccountDetails(data) {
    const user = getCurrentUser();
    if (!user) return {ok:false,message:"Vui lòng đăng nhập."};
    if (!data.currentPassword || data.currentPassword !== user.password) {
        return {ok:false,field:"currentPassword",message:"Mật khẩu hiện tại không đúng."};
    }
    const users = loadUsers();
    const email = String(data.newEmail || "").trim();
    const password = String(data.newPassword || "");
    const confirm = String(data.confirmPassword || "");
    const changeEmail = !!email && email !== user.email;
    const changePassword = !!password || !!confirm;
    // Cùng thứ tự mẫu: xác thực mật khẩu hiện tại, email mới, mật khẩu mới.
    if (changeEmail && (!isValidEmail(email) || !email.endsWith("@gmail.com"))) return {ok:false,field:"newEmail",message:"Email mới phải là Gmail hợp lệ."};
    if (changeEmail && users.some(u => u.id !== user.id && String(u.email).toLowerCase() === email.toLowerCase())) return {ok:false,field:"newEmail",message:"Email đã được đăng ký."};
    if (changePassword && validatePassword(password)) return {ok:false,field:"newPassword",message:validatePassword(password)};
    if (changePassword && password !== confirm) return {ok:false,field:"confirmPassword",message:"Mật khẩu mới nhập lại không khớp."};
    if (!changeEmail && !changePassword) return {ok:false,field:"newEmail",message:"Nhập email mới hoặc mật khẩu mới cần cập nhật."};
    const target = users.find(u => u.id === user.id);
    if (!target) return {ok:false,message:"Không tìm thấy tài khoản."};
    if (changeEmail) target.email = email;
    if (changePassword) target.password = password;
    try {
        // Cập nhật cả users và currentUser như account.js mẫu.
        saveUsers(users);
        setCurrentUser({...user,email:target.email,password:target.password});
        syncNavUser();
        return {ok:true,message:"Cập nhật tài khoản thành công."};
    } catch { return {ok:false,message:"Không lưu được thay đổi."}; }
}
// Lịch sử chỉ lấy key của người đang đăng nhập; escape văn bản trước khi render.
function renderOrderHistory() {
    const target = document.querySelector("#order-history");
    const user = getCurrentUser();
    if (!target || !user) return;
    const raw = readStore("orders_" + user.id, []);
    const orders = Array.isArray(raw) ? raw.filter(o => o && Array.isArray(o.items)) : [];
    target.innerHTML = orders.length ? [...orders].reverse().map(order => `
        <details class="order-card">
            <summary><strong>${escapeHTML(order.id)}</strong> · ${money(Number(order.total)||0)} · ${escapeHTML(order.status || "Chờ xác nhận")}</summary>
            <p class="small">Ngày: ${escapeHTML(new Date(order.date || order.createdAt).toLocaleString("vi-VN"))}</p>
            ${order.items.map(item => `<div class="order-line"><span>${escapeHTML(item.name)} × ${Number(item.quantity)||0}</span><strong>${money((Number(item.price)||0)*(Number(item.quantity)||0))}</strong></div>`).join("")}
            <p>Người nhận: ${escapeHTML(order.customerName || order.customer?.name || "")}</p>
            <p>Địa chỉ: ${escapeHTML(order.customerAddress || order.customer?.address || "")}</p>
            <p class="small">Đơn học tập, không giao hàng hoặc thu tiền.</p>
        </details>`).join("") : '<p class="empty">Chưa có đơn hàng. <a href="san-pham.html">Chọn PC</a></p>';
}
function renderProfile() {
    const user = getCurrentUser();
    if (!user) return;
    document.querySelector("#profile-name").textContent = user.name;
    document.querySelector("#profile-email").textContent = user.email;
    const record = loadUsers().find(item => item.id === user.id);
    document.querySelector("#profile-date").textContent = record?.createdAt ? new Date(record.createdAt).toLocaleDateString("vi-VN") : "—";
    renderOrderHistory();
}
// Trang account bị chặn khi chưa đăng nhập, tương đương account.html của mẫu.
if (document.querySelector("#account-form") && requireLogin()) {
    renderProfile();
    document.querySelector("#account-form").addEventListener("submit", event => {
        event.preventDefault();
        const form = event.currentTarget;
        const result = updateAccountDetails(Object.fromEntries(new FormData(form)));
        showFormResult(form,"account-message",result);
        if (result.ok) { form.reset(); renderProfile(); }
    });
}
