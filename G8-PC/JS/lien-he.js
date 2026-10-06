// Điền thông tin thật của đúng 5 thành viên tại đây. Không tạo số điện thoại/email giả.
// name: họ tên; phone: số di động Việt Nam; email: Gmail; avatar: đường dẫn ảnh từ trang HTML.
const CONTACT_MEMBERS = [
    { name: "Đặng Thành Tính", phone: "0965497569", email: "thanhtinhdangg@gmail.com", avatar: "../IMG/thanh-vien/videoframe_13305.png" },
    { name: "", phone: "", email: "", avatar: "../IMG/thanh-vien/thanh-vien-2.svg" },
    { name: "", phone: "", email: "", avatar: "../IMG/thanh-vien/thanh-vien-3.svg" },
    { name: "", phone: "", email: "", avatar: "../IMG/thanh-vien/thanh-vien-4.svg" },
    { name: "", phone: "", email: "", avatar: "../IMG/thanh-vien/thanh-vien-5.svg" },
    { name: "", phone: "", email: "", avatar: "../IMG/thanh-vien/thanh-vien-5.svg" },
    { name: "", phone: "", email: "", avatar: "../IMG/thanh-vien/thanh-vien-5.svg" },
    { name: "", phone: "", email: "", avatar: "../IMG/thanh-vien/thanh-vien-5.svg" }

];

// Tạo một dòng liên hệ: có dữ liệu hợp lệ thì dùng a; chưa có thì chỉ hiển thị thông báo.
function createContactLine(icon, label, value, href) {
    const row = document.createElement("div");
    row.className = "contact-line";
    const image = document.createElement("img");
    image.src = "../IMG/bieu-tuong/" + icon + ".svg";
    image.alt = ""; // Nhãn bên cạnh đã nói rõ mục đích, tránh đọc lặp biểu tượng.
    image.width = 24;
    image.height = 24;
    row.appendChild(image);

    const content = document.createElement("div");
    const title = document.createElement("span");
    title.className = "contact-label";
    title.textContent = label;
    content.appendChild(title);

    // tel mở ứng dụng gọi; mailto mở ứng dụng email, không gửi tự động.
    const detail = document.createElement(href ? "a" : "span");
    detail.textContent = href ? value : "Chưa cập nhật";
    if (href) detail.href = href;
    else detail.className = "contact-pending";
    content.appendChild(detail);
    row.appendChild(content);
    return row;
}

// Tạo đúng 5 thẻ bằng DOM/textContent để nội dung liên hệ không bị phân tích như HTML.
function renderContacts() {
    const list = document.getElementById("contact-list");
    if (!list) return;
    list.replaceChildren();

    CONTACT_MEMBERS.forEach(function (member, index) {
        // Bootstrap: 1 cột trên điện thoại, 2 cột từ sm, 3 cột từ lg.
        const column = document.createElement("div");
        column.className = "col-12 col-sm-6 col-lg-4";
        const card = document.createElement("article");
        card.className = "contact-card h-100";

        // Ảnh riêng và tên của mỗi người; ảnh trung tính dùng khi chưa có avatar thật.
        const name = member.name.trim() || "Thành viên " + (index + 1);
        const avatar = document.createElement("img");
        avatar.className = "contact-avatar";
        avatar.src = member.avatar;
        avatar.alt = "Ảnh đại diện " + name;
        avatar.width = 112;
        avatar.height = 112;
        const title = document.createElement("h2");
        title.textContent = name;
        card.append(avatar, title);

        // Tái sử dụng regex điện thoại/email; chỉ tạo liên kết khi thông tin hợp lệ.
        const phone = normalizePhone(member.phone);
        const email = member.email.trim();
        const phoneLink = validatePhone(phone) ? "tel:" + phone : "";
        const emailLink = isValidEmail(email) && /@gmail\.com$/i.test(email) ? "mailto:" + email : "";
        card.appendChild(createContactLine("dien-thoai", "Điện thoại", member.phone, phoneLink));
        card.appendChild(createContactLine("gmail", "Gmail", email, emailLink));
        column.appendChild(card);
        list.appendChild(column);
    });
}

// Script nằm cuối body nên vùng #contact-list đã tồn tại khi hàm được gọi.
renderContacts();
