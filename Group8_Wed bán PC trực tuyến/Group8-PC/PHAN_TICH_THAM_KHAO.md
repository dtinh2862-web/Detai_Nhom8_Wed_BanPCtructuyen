# Đối chiếu đề tài bán quần áo → bán PC Nhóm 8

## Nguồn và cách chuyển thể

Tham khảo trực tiếp mã trong `DeTaiBanQuanAo(3).rar`. Mẫu dùng HTML nhiều trang, Bootstrap/jQuery local, JS tách theo chức năng và LocalStorage để liên kết các bước chọn sản phẩm → giỏ → thanh toán → tài khoản. Phần xác thực được chuyển thể từ mã mẫu; không coi toàn bộ mã nguồn là sáng tác độc lập. Bootstrap và jQuery giữ nguyên thông báo bản quyền/giấy phép của nhà phát hành.

## Ánh xạ chức năng

| Trang/chức năng mẫu | Bản PC | Luồng được giữ |
| --- | --- | --- |
| index | trang-chu.html | Điều hướng, banner, sản phẩm và tin |
| list | san-pham.html | Tìm kiếm/lọc/sắp xếp, chọn sản phẩm |
| productdetails | chi-tiet-san-pham.html | Đọc sản phẩm đã chọn, số lượng, thêm giỏ/mua ngay |
| cart | gio-hang.html | Gộp dòng, chọn dòng/tất cả, cập nhật tổng và checkout |
| payment | thanh-toan.html | Checkout ưu tiên hơn cart, coupon, orders theo id, xóa giỏ, modal và về trang chủ |
| account | tai-khoan.html | Hồ sơ, đổi thông tin bằng mật khẩu hiện tại, lịch sử đơn |
| collection | bo-suu-tap.html | Lọc/tìm kiếm và lưu bộ sưu tập |
| sale | giam-gia.html | PC ưu đãi, lọc/sắp giá và lưu sản phẩm |
| promotion | khuyen-mai.html | Mã ưu đãi và lưu mã |
| news | tin-tuc.html | Tìm/lọc tin, lưu và sao chép liên kết |
| introduction | gioi-thieu.html | Thông tin đề tài/nhóm |
| auth | dang-nhap.html, dang-ky.html, xac-thuc.js | Bốn trường đăng ký, Gmail, login email hoặc tên, currentUser |

## Những điểm chuyển đổi có chủ đích

- Nội dung thời trang chuyển thành PC Gaming, văn phòng, đồ họa, phát trực tiếp và linh kiện; cấu hình phần cứng thay lựa chọn màu/size. Cùng id PC gộp thành một dòng giỏ.
- Màu xanh công nghệ, nền sáng, ảnh SVG PC và tên tệp tiếng Việt thay nhận diện của mẫu. Không sao chép hình quần áo sang sản phẩm PC.
- Giữ đăng ký/đăng nhập là hai trang riêng theo yêu cầu trước của dự án; không sao chép modal đăng nhập. Thêm trang chi tiết tin và sơ đồ trang từ bản trước. Tổng cộng 15 trang, không phải giới hạn 11 trang cũ.
- Mật khẩu lưu trực tiếp và so sánh như mẫu để dễ theo dõi bài học; chỉ dùng tài khoản giả. Định dạng tài khoản hash của bản cũ không được chuyển đổi tự động.
- Giữ các kiểm tra JSON lỗi, giá/số lượng tra từ giỏ và danh mục hiện tại, escape văn bản khi render, báo lỗi khi không lưu đơn được. Đây là các điều chỉnh để bản demo không dùng dữ liệu hỏng hoặc báo thành công sai.
- Mã ưu đãi chuyển thành G8PC10, SALE20, NEW15; cả ba mã hiển thị đều dùng được ở thanh toán. Giá gạch ngang trên trang giảm giá là giá minh họa tính từ giá danh mục, không phải lịch sử giá thương mại.
- Trang thanh toán kiểm tra thêm email, địa chỉ, phương thức. Xóa toàn bộ giỏ sau đơn thành công và trở về trang chủ sau 2 giây như luồng mẫu.
- Không tái tạo hiệu ứng sản phẩm bay vào giỏ; thay bằng thông báo và cập nhật số lượng trên navbar. Chức năng thêm giỏ vẫn được giữ.

## Đọc mã theo thứ tự

1. HTML/trang-chu.html: xem cấu trúc, thư viện và thứ tự script.
2. JS/du-lieu.js và JS/chung.js: hiểu đối tượng sản phẩm, storage, card, giỏ.
3. JS/xac-thuc.js: đăng ký → đăng nhập → currentUser → chặn thao tác khi chưa đăng nhập.
4. JS/san-pham.js → JS/chi-tiet-san-pham.js → JS/gio-hang.js → JS/thanh-toan.js: theo một đơn từ chọn PC đến lưu lịch sử.
5. JS/tai-khoan.js: xem đơn của người dùng và thay đổi thông tin.
6. Các file bộ sưu tập/giảm giá/khuyến mãi/tin tức: so sánh cùng mô hình lọc + lưu danh sách id.
7. CSS/chinh.css và CSS/trang/: phân biệt CSS dùng chung với CSS riêng.

Chú thích nằm trước các khối nội dung, nhóm quy tắc và hàm/sự kiện để giải thích mục đích. README bổ sung bảng cú pháp HTML, CSS, JavaScript, Bootstrap, jQuery và lệnh chạy dự án.
