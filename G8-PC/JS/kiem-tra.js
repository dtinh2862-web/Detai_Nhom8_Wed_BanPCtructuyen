// Các biểu thức chính quy dùng chung: tách riêng để dễ đọc và điều chỉnh quy tắc.
const MAU_KIEM_TRA = {
    // Tên tiếng Việt: chữ có dấu; giữa các từ cho phép khoảng trắng, dấu nháy hoặc gạch nối.
    hoTen: /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u,
    // Email có tên hộp thư, @, tên miền và phần mở rộng; không giới hạn nhà cung cấp Gmail.
    email: /^[A-Za-z0-9]+[A-Za-z0-9._%+-]*@[A-Za-z0-9]+(?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9]+(?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/,
    // Mật khẩu 8–32 ký tự, có ít nhất một chữ Latin và một chữ số, không chứa khoảng trắng.
    matKhau: /^(?=.*[A-Za-z])(?=.*\d)[^\s]{8,32}$/,
    // Số di động Việt Nam dạng nội địa: 10 chữ số, đầu 03/05/07/08/09.
    dienThoai: /^0[35789]\d{8}$/,
    // Địa chỉ cho phép chữ, số và dấu thường gặp ở số nhà, ngõ, đường; loại dấu < và >.
    diaChi: /^[\p{L}\p{M}\d\s.,\/#()'-]{5,150}$/u,
    // Số lượng là số nguyên từ 1 đến 999; không nhận số âm, số thập phân hoặc số mũ.
    soLuong: /^[1-9]\d{0,2}$/,
    // Mã ưu đãi gồm 4–16 chữ cái in hoa hoặc chữ số.
    maUuDai: /^[A-Z0-9]{4,16}$/
};

// trim xóa khoảng trắng đầu/cuối; replace gộp nhiều khoảng trắng thành một dấu cách.
function cleanText(value) {
    return String(value || "").trim().replace(/\s+/g, " ");
}

// Kiểm tra tên theo độ dài trước, sau đó mới kiểm tra các ký tự được phép.
function isValidName(value) {
    const name = cleanText(value);
    return name.length >= 2 && name.length <= 50 && MAU_KIEM_TRA.hoTen.test(name);
}

// Regex kiểm tra hình thức email; không xác minh hộp thư có thật hoặc đã thuộc về người dùng.
function isValidEmail(value) {
    const email = String(value || "").trim();
    return email.length <= 254 && MAU_KIEM_TRA.email.test(email) && !email.includes("..");
}

// Trả chuỗi lỗi để form hiển thị; chuỗi rỗng nghĩa là mật khẩu hợp lệ.
function validatePassword(value) {
    if (!value) return "Vui lòng nhập mật khẩu.";
    if (!MAU_KIEM_TRA.matKhau.test(value)) {
        return "Mật khẩu cần 8–32 ký tự, có chữ và số, không chứa khoảng trắng.";
    }
    return "";
}

// Cho phép người dùng nhập số điện thoại có khoảng trắng, dấu chấm hoặc gạch nối.
function normalizePhone(value) {
    return String(value || "").replace(/[\s.-]/g, "");
}

// Các hàm ngắn dùng lại trong thanh toán, chi tiết sản phẩm và giỏ hàng.
function validateName(value) {
    return isValidName(value);
}

function validateEmail(value) {
    return isValidEmail(value);
}

function validatePhone(value) {
    return MAU_KIEM_TRA.dienThoai.test(normalizePhone(value));
}

function validateAddress(value) {
    return MAU_KIEM_TRA.diaChi.test(cleanText(value));
}

function isValidQuantity(value) {
    return MAU_KIEM_TRA.soLuong.test(String(value));
}

function isValidCoupon(value) {
    return MAU_KIEM_TRA.maUuDai.test(value);
}
