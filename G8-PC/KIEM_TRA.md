# Kiểm tra bản G8-PC — danh mục và liên hệ

- Cú pháp của 16 tệp JS nghiệp vụ hợp lệ.
- 16 trang HTML có liên kết nội bộ, ảnh và CSS hợp lệ; header/footer dùng chung.
- 23 ảnh SVG phân tích được; mã thư viện bên thứ ba không sửa.
- Menu có 6 lựa chọn, kiểm tra mở khi rê chuột, đóng khi rời, click mở/đóng, click ngoài, ArrowDown và Escape; aria-expanded đồng bộ với hidden.
- Trang liên hệ có 5 thẻ, 5 avatar và 10 biểu tượng liên hệ.
- Khi chưa có thông tin, không tạo liên kết gọi/email giả; khi nhập dữ liệu hợp lệ thì tạo đúng tel/mailto.
- Kiểm tra tên chứa thẻ HTML được hiển thị như văn bản; dữ liệu điện thoại/email sai không tạo liên kết.
- Giữ nguyên giá, mã ưu đãi và xử lý nghiệp vụ của bản trước; chỉ đổi thương hiệu và thêm danh mục/liên hệ.

Các kiểm tra tương tác dùng jsdom, không phải kiểm tra bố cục trực quan. Mở Live Server để xem thêm trên desktop/điện thoại. Cần điền dữ liệu thật trong JS/lien-he.js để sử dụng các liên kết liên hệ.

---

## Kết quả của bản trước (giữ để đối chiếu)

# Kết quả kiểm tra bản cập nhật 06/10/2026

## Đã đạt

- 15 trang HTML, tiêu đề riêng, không trùng id trong từng trang.
- Header/footer thống nhất; 514 liên kết và tham chiếu tài nguyên nội bộ hợp lệ.
- 16 ảnh SVG phân tích được; 14 tệp JS nghiệp vụ kiểm tra cú pháp thành công.
- Các tệp Bootstrap/jQuery giữ nguyên nội dung so với ZIP đầu vào.
- 37 tình huống nghiệp vụ bằng Node VM: tên tiếng Việt, email ngoài Gmail, mật khẩu, điện thoại, địa chỉ, số lượng, đăng ký, email trùng, đăng nhập, giỏ, checkout, coupon, đổi tài khoản, lịch sử đơn và lỗi lưu trữ.
- 15 trang tải trong jsdom bằng các tệp JS thật, không phát sinh lỗi script hoặc thiếu tài nguyên.
- Kiểm tra văn bản DOM sau khi chạy JS: không có nhãn Nhóm 8, Group 8, demo, mô phỏng, đồ án, đề tài, MSSV hay thử nghiệm.
- Tương tác DOM: submit đăng ký sai/đúng; đăng nhập; đổi bộ lọc; thêm giỏ; chọn thanh toán; áp dụng mã; submit đơn; hiển thị mã đơn và lịch sử.
- Bootstrap dropdown và tab phản hồi sự kiện; xử lý modal xác nhận chạy được trong DOM.

## Phạm vi kiểm tra

Node VM dùng DOM giả lập; jsdom chạy DOM/sự kiện nhưng không dựng bố cục hoặc vẽ pixel như trình duyệt. Điều hướng trang trong jsdom được mô phỏng bằng việc chuyển dữ liệu LocalStorage sang tài liệu tiếp theo. Không coi các kiểm tra này là kiểm tra trực quan hoặc chứng nhận W3C.

Chưa chạy được Chromium trong môi trường xử lý vì không tải được gói trình duyệt. Trước khi nộp hoặc đưa lên hosting, mở Live Server thử ở desktop và điện thoại: độ rộng menu, ảnh, carousel, bàn phím, tab, modal, bộ lọc và toàn bộ luồng mua hàng.

## Các bước thử nhanh

1. Mở HTML/trang-chu.html, chọn Sản phẩm và lọc PC Văn phòng.
2. Đăng ký bằng dữ liệu thử; thử tên có số, email thiếu @, mật khẩu thiếu số để xem lỗi.
3. Đăng nhập, thêm hai PC vào giỏ. Chỉ chọn một PC để thanh toán.
4. Nhập số điện thoại sai rồi sửa đúng; thử TECH10 và một mã không tồn tại.
5. Xác nhận đơn, mở Tài khoản xem lịch sử; quay lại Giỏ để kiểm tra PC chưa mua còn được giữ.
6. Đổi email hoặc mật khẩu, đăng xuất rồi đăng nhập bằng thông tin mới.

Không có kết nối server hoặc thanh toán thật; giới hạn kỹ thuật được giải thích trong README.
