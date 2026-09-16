# Group 8's PC sales website

Dự án học tập bán PC trực tuyến của Nhóm 8, chuyển thể luồng xử lý từ `DeTaiBanQuanAo(3).rar`. Bản này có **15 trang**, Bootstrap và jQuery lưu cục bộ, giao diện xanh công nghệ, hình PC dạng SVG, chú thích tiếng Việt trong các khối mã tự viết. Không cần npm hay kết nối Internet để chạy.

## 1. Mở website và xem mã nguồn

1. Giải nén vào thư mục mới, tránh trộn với bản cũ.
2. VS Code → File → Open Folder → chọn thư mục dự án.
3. Mở `HTML/trang-chu.html` bằng Live Server, hoặc dùng lệnh bên dưới.
4. Để **xem code**, nhấp phải tệp trong Explorer → Open With → Text Editor. Tab hiển thị website là bản xem trước, không phải trình soạn mã.

```bash
# Chạy máy chủ phục vụ các tệp trong thư mục hiện tại; cần cài Python.
python -m http.server 8000
```

Mở `http://localhost:8000/HTML/trang-chu.html`. Dùng cùng địa chỉ và cổng để các trang chia sẻ dữ liệu LocalStorage.

| Lệnh/thành phần | Ý nghĩa |
| --- | --- |
| `python` | Gọi chương trình Python |
| `-m http.server` | Chạy module máy chủ HTTP có sẵn |
| `8000` | Cổng của máy chủ |
| `Ctrl+C` | Dừng máy chủ trong Terminal |
| `git status` | Xem tệp đã thay đổi |
| `git diff` | Xem nội dung thay đổi chưa đưa vào staging |
| `git add .` | Đưa thay đổi trong thư mục hiện tại vào staging; kiểm tra trước khi dùng |
| `git commit -m "Mo ta thay doi"` | Lưu một phiên bản vào Git cục bộ |
| `git push` | Đẩy commit lên remote nếu đã cấu hình và có quyền; không tự thực hiện trong gói tải về |

## 2. Cấu trúc và các trang

Giữ bốn thư mục kỹ thuật `HTML`, `CSS`, `JS`, `IMG` để phù hợp cấu trúc đề tài. Tên trang, mã nghiệp vụ và thư mục con dùng tiếng Việt không dấu, nối bằng dấu gạch ngang. Tên thư viện chính thức được giữ nguyên để nhận diện phiên bản và giấy phép.

| Trang trong HTML/ | Vai trò |
| --- | --- |
| `trang-chu.html` | Banner, carousel, danh mục, sản phẩm và tin nổi bật |
| `san-pham.html` | Tìm kiếm, lọc nhu cầu/khoảng giá, sắp xếp |
| `chi-tiet-san-pham.html` | Ảnh, cấu hình, tab Bootstrap, số lượng, thêm giỏ/mua ngay |
| `gio-hang.html` | Chọn từng dòng/tất cả, tăng giảm, xóa, tổng tiền đã chọn |
| `thanh-toan.html` | Thông tin nhận hàng, mã ưu đãi, tạo đơn mô phỏng |
| `dang-ky.html` | Họ tên, Gmail, mật khẩu, nhập lại mật khẩu |
| `dang-nhap.html` | Đăng nhập bằng Gmail hoặc họ tên |
| `tai-khoan.html` | Hồ sơ, đổi email/mật khẩu và lịch sử đơn theo tài khoản |
| `bo-suu-tap.html` | Nhóm PC theo nhu cầu, tìm kiếm và lưu bộ sưu tập |
| `giam-gia.html` | PC ưu đãi, tìm kiếm, sắp giá và lưu sản phẩm |
| `khuyen-mai.html` | Mã giảm giá, tìm kiếm và lưu mã |
| `tin-tuc.html` | Lọc tin, tìm kiếm, lưu bài và sao chép liên kết |
| `chi-tiet-tin-tuc.html` | Nội dung một bài viết |
| `gioi-thieu.html` | Giới thiệu đề tài và nhóm |
| `so-do-trang.html` | Liên kết đến toàn bộ các trang |

Có thêm bốn trang tài khoản/bộ sưu tập/giảm giá/khuyến mãi so với bản 11 trang trước để bao phủ luồng của đề tài mẫu.

| Thư mục/tệp | Trách nhiệm |
| --- | --- |
| `CSS/chinh.css` | Mục lục import 11 phần CSS dùng chung |
| `CSS/co-so/` | Đặt lại kiểu mặc định, biến màu và kiểu cơ bản |
| `CSS/bo-cuc/` | Đầu trang, điều hướng và chân trang |
| `CSS/thanh-phan/` | Nút, biểu mẫu, thẻ sản phẩm, thẻ tin |
| `CSS/trang/` | Một CSS riêng cho mỗi trang HTML |
| `CSS/tuong-thich/tuong-thich.css` | Điều chỉnh bố cục theo chiều rộng màn hình |
| `CSS/thu-vien/`, `JS/thu-vien/` | Bootstrap CSS/bundle và jQuery local; giữ thông báo giấy phép |
| `JS/du-lieu.js` | 8 sản phẩm, 3 bài viết và bảng mã giảm giá mẫu |
| `JS/xac-thuc.js` | Đăng ký, đăng nhập, phiên hiện tại, kiểm tra quyền truy cập |
| `JS/chung.js` | LocalStorage, giỏ hàng, định dạng tiền, navbar, sự kiện dùng chung |
| `JS/san-pham.js` | Tạo thẻ sản phẩm, lọc và sắp xếp |
| `JS/chi-tiet-san-pham.js` | Đọc sản phẩm, số lượng, thêm giỏ và mua ngay |
| `JS/gio-hang.js` | Hiển thị và cập nhật giỏ, lựa chọn thanh toán |
| `JS/thanh-toan.js` | Kiểm tra người nhận, tính mã giảm và lưu đơn |
| `JS/tai-khoan.js` | Hồ sơ, thay đổi thông tin, lịch sử đơn |
| `JS/bo-suu-tap.js`, `JS/giam-gia.js`, `JS/khuyen-mai.js` | Tìm kiếm/lọc và lưu các mục tương ứng |
| `JS/tin-tuc.js`, `JS/chi-tiet-tin-tuc.js` | Danh sách, lưu/chia sẻ và nội dung tin |
| `IMG/` | Ảnh PC, tin tức, biểu tượng, thương hiệu và ảnh bìa SVG cục bộ |

## 3. Luồng chạy và dữ liệu

**Thứ tự nạp:** jQuery → Bootstrap bundle → dữ liệu → xác thực → JS chung → JS trang. HTML nạp Bootstrap CSS trước, sau đó CSS chung và CSS riêng. Đường dẫn `../` trong HTML đi lên thư mục gốc; đường dẫn trong `@import` được tính từ tệp CSS chứa nó.

**Đăng ký:** kiểm tra họ tên 2–40 ký tự, email hợp lệ kết thúc bằng `@gmail.com`, mật khẩu tối thiểu 6 ký tự, xác nhận khớp, email chưa tồn tại → thêm vào `users`. Không tự đăng nhập; liên kết sang đăng nhập điền sẵn email.

**Đăng nhập:** dùng `find()` tìm email hoặc họ tên không phân biệt hoa/thường, so sánh mật khẩu → ghi `currentUser` → cập nhật navbar → phát `auth:changed` → chuyển về trang chủ. Nếu hai người trùng họ tên, tìm theo tên trả về người đầu tiên như mẫu; nên đăng nhập bằng email.

**Mua hàng:** bấm sản phẩm → lưu `selectedProduct` và chuyển trang chi tiết; URL có `id` hỗ trợ mở trực tiếp. Thêm giỏ yêu cầu đăng nhập. Cùng mã sản phẩm thì cộng số lượng, tối thiểu 1, không đặt giới hạn 10 như bản cũ. Giỏ cho chọn từng dòng/tất cả; thanh toán từ giỏ chỉ lưu các dòng được chọn vào `checkout`. Mua ngay chuẩn bị riêng sản phẩm vừa chọn. Khi không có checkout, trang thanh toán dùng toàn bộ giỏ như mã mẫu.

**Đặt hàng:** kiểm tra tên chỉ chứa chữ/khoảng trắng, số điện thoại 10 số với đầu 03/05/07/08/09, email, địa chỉ và phương thức thanh toán. `G8PC10`, `SALE20`, `NEW15` giảm lần lượt 10%, 20%, 15%. Chỉ áp dụng một mã, không cộng dồn. Tổng = tạm tính − số tiền giảm đã làm tròn. Lưu vào `orders_<id>` → xóa toàn bộ `cart` và `checkout` → hiện modal thành công → về trang chủ sau 2 giây. Đây là hành vi xóa cả giỏ của đề tài mẫu, kể cả dòng chưa chọn.

**Tài khoản:** nhập đúng mật khẩu hiện tại trước khi đổi Gmail hoặc mật khẩu; kiểm tra trùng email và xác nhận mật khẩu mới; ghi lại cả `users` lẫn `currentUser`. Lịch sử đọc theo id người đang đăng nhập. Đăng xuất xóa phiên hiện tại.

**Các mục đã lưu:** bấm Lưu lần nữa để bỏ lưu; checkbox chỉ hiện mục đã lưu kết hợp với bộ lọc. Danh sách lưu và giỏ dùng chung trong trình duyệt như mẫu; lịch sử đơn tách theo id tài khoản.

| Key LocalStorage | Dữ liệu |
| --- | --- |
| `users` | Mảng `{id, name, email, password, createdAt}` |
| `currentUser` | `{id, name, email, password}` của phiên hiện tại |
| `products`, `news` | Dữ liệu mẫu phục vụ danh sách |
| `selectedProduct`, `selectedNews` | Đối tượng chọn trước khi mở chi tiết |
| `cart` | Mảng sản phẩm với `quantity`, `selected`; giá được tra lại từ danh mục |
| `checkout` | Các dòng chuẩn bị thanh toán |
| `orders_<id>` | Mảng đơn gồm người nhận, items, subTotal, discount, coupon, total, status, date |
| `wishlist_collections` | Danh sách mã bộ sưu tập đã lưu |
| `wishlist_deals` | Danh sách id sản phẩm ưu đãi đã lưu |
| `saved_promo_codes` | Danh sách mã ưu đãi đã lưu |
| `saved_posts` | Danh sách id tin đã lưu |

Để bám logic mẫu, mật khẩu demo được lưu trực tiếp trong LocalStorage: **chỉ nhập thông tin và mật khẩu giả để học tập**. Đây không phải hệ thống xác thực, thanh toán hoặc bảo vệ dữ liệu phía máy chủ. Tài khoản định dạng hash của bản ZIP cũ không tương thích; dữ liệu cũ không bị tự xóa, hãy thử bằng email demo mới hoặc hồ sơ trình duyệt riêng.

## 4. Giải thích HTML và Bootstrap

Các chú thích `<!-- ... -->` trước khối mã giải thích mục đích. Không chèn chú thích vào giữa chuỗi thuộc tính hoặc nội dung thư viện minified.

| Cú pháp | Dùng để làm gì |
| --- | --- |
| `<!DOCTYPE html>` | Khai báo tài liệu HTML5 |
| `lang="vi"` | Khai báo ngôn ngữ tiếng Việt |
| `meta charset="UTF-8"` | Hiển thị tiếng Việt đúng mã hóa |
| `meta name="viewport"` | Cho phép bố cục thích ứng màn hình di động |
| `head`, `title`, `body` | Siêu dữ liệu, tên tab và nội dung trang |
| `header`, `nav`, `main`, `section`, `footer` | Chia nội dung thành các vùng có ý nghĩa |
| `a`, `href` | Tạo liên kết; href là địa chỉ đích |
| `link rel="stylesheet" href="..."` | Nạp một tệp CSS |
| `script src="..."` | Nạp một tệp JavaScript |
| `img`, `src`, `alt` | Ảnh, đường dẫn ảnh và mô tả thay thế |
| `id`, `class` | Định danh duy nhất và nhóm dùng CSS/JS |
| `form`, `label`, `for`, `input`, `name` | Biểu mẫu, nhãn liên kết ô nhập và tên dữ liệu gửi |
| `type`, `required`, `minlength`, `min` | Loại ô/nút, bắt buộc nhập, độ dài/số tối thiểu |
| `select`, `option`, `textarea` | Lựa chọn và ô văn bản nhiều dòng |
| `button type="button"` | Nút xử lý JS, không tự gửi form |
| `button type="submit"` | Nút gửi form |
| `hidden`, `aria-live`, `aria-label` | Ẩn khối và hỗ trợ công nghệ trợ năng |
| `data-*` | Gắn dữ liệu cho JS hoặc Bootstrap |
| `container`, `row`, `col-md-6`, `col-lg-3` | Lưới Bootstrap; cột đổi theo kích thước màn hình |
| `navbar`, `navbar-expand-lg`, `collapse` | Thanh điều hướng thu gọn trên màn hình nhỏ |
| `data-bs-toggle`, `data-bs-target` | Chọn hành vi Bootstrap và phần tử đích |
| `dropdown`, `dropdown-menu`, `dropdown-item` | Menu Khám phá |
| `carousel`, `carousel-item` | Banner luân phiên |
| `nav-tabs`, `tab-pane` | Các tab nội dung chi tiết |
| `modal`, `modal-dialog`, `modal-content` | Hộp thoại xác nhận đơn |
| `btn`, `btn-warning`, `form-control`, `alert` | Kiểu nút, ô nhập và thông báo; màu được điều chỉnh bằng CSS dự án |
| `d-flex`, `gap-2`, `mt-3`, `py-4` | Tiện ích bố cục, khoảng cách, lề và đệm |

## 5. Giải thích CSS

Chú thích CSS có dạng `/* Giải thích chức năng khối bên dưới */`.

| Cú pháp | Dùng để làm gì |
| --- | --- |
| `selector { property: value; }` | Chọn phần tử và khai báo kiểu |
| `.ten-lop`, `#dinh-danh` | Chọn theo class hoặc id |
| `:root`, `--mau-nhan`, `var()` | Khai báo và dùng lại biến màu |
| `@import url(...)` | Ghép các phần CSS chung |
| `box-sizing: border-box` | Tính kích thước gồm cả padding và border |
| `display: flex`, `grid` | Sắp xếp phần tử theo hàng/cột hoặc lưới |
| `gap`, `padding`, `margin` | Khoảng cách giữa phần tử, đệm bên trong, lề bên ngoài |
| `width`, `max-width`, `min-height` | Điều khiển kích thước và giới hạn |
| `color`, `background`, `border` | Màu chữ, nền và đường viền |
| `border-radius`, `box-shadow` | Bo góc và đổ bóng |
| `object-fit` | Quy định cách ảnh vừa khung |
| `position`, `z-index` | Định vị và thứ tự lớp hiển thị |
| `:hover`, `:focus-visible` | Trạng thái trỏ chuột và focus bàn phím |
| `transition`, `transform` | Chuyển động và dịch/chỉnh hình khối |
| `@media` | Quy tắc áp dụng theo kích thước màn hình |

Đổi bảng màu tại `CSS/co-so/bien-mau.css`; sửa bố cục riêng trong `CSS/trang/<ten-trang>.css` để tránh ảnh hưởng các trang khác.

## 6. Giải thích JavaScript và jQuery

Chú thích `// ...` hoặc `/* ... */` giải thích từng nhóm nghiệp vụ, hàm và sự kiện. Bootstrap/jQuery là thư viện bên thứ ba: giữ nguyên mã minified và giấy phép; chú thích tại nơi nạp và nơi sử dụng, không diễn giải lại từng dòng nội bộ thư viện.

| Cú pháp/hàm | Dùng để làm gì |
| --- | --- |
| `const`, `let`, `function`, `return` | Khai báo dữ liệu, hàm và trả kết quả |
| `if`, `else`, `try`, `catch` | Rẽ nhánh và xử lý lỗi |
| `===`, `&&`, `||`, `!`, `?.` | So sánh nghiêm ngặt, điều kiện và truy cập khi có giá trị |
| `querySelector`, `querySelectorAll` | Tìm một hoặc nhiều phần tử DOM |
| `addEventListener` | Đăng ký xử lý click, submit, input, change |
| `event.preventDefault()` | Chặn gửi form/chuyển trang mặc định để xử lý bằng JS |
| `FormData`, `Object.fromEntries` | Lấy dữ liệu form thành đối tượng theo thuộc tính name |
| `textContent` | Gán văn bản mà không phân tích thành HTML |
| `innerHTML`, `escapeHTML` | Tạo giao diện từ chuỗi; escape dữ liệu văn bản trước khi chèn |
| `classList`, `setAttribute` | Đổi lớp CSS và thuộc tính trạng thái |
| `map`, `filter`, `find`, `some`, `reduce` | Biến đổi, lọc, tìm, kiểm tra và tính tổng mảng |
| `sort`, `[...array]`, `Set` | Sắp xếp, sao chép mảng và loại trùng |
| `JSON.stringify`, `JSON.parse` | Chuyển đối tượng thành chuỗi lưu trữ và đọc lại |
| `localStorage.getItem/setItem/removeItem` | Đọc, ghi, xóa dữ liệu trình duyệt |
| `URLSearchParams`, `location.href` | Đọc id/bộ lọc từ URL và chuyển trang |
| `Intl.NumberFormat`, `Math.round` | Định dạng VNĐ và làm tròn số tiền giảm |
| `Date.now`, `toISOString` | Tạo mã theo thời gian và lưu ngày đơn |
| `$(document).on("click", selector, handler)` | jQuery bắt sự kiện cho cả thẻ tạo động sau khi tải trang |
| `$(this).attr(...)` | Đọc thuộc tính phần tử vừa bấm |
| `bootstrap.Modal.getOrCreateInstance(...).show()` | Tạo/lấy modal và mở thông báo |
| `setTimeout(..., 2000)` | Chạy thao tác chuyển trang sau khoảng 2 giây |
| `navigator.clipboard.writeText` | Sao chép liên kết tin khi trình duyệt cho phép |

## 7. Đối chiếu và phạm vi

Xem `PHAN_TICH_THAM_KHAO.md` để biết phần nào giữ luồng mẫu và phần nào chuyển đổi cho PC. Sản phẩm, giá, ưu đãi, ảnh và thông tin nhóm là dữ liệu minh họa cần thay bằng dữ liệu thật trước khi nộp nếu giảng viên yêu cầu.

Đã kiểm tra cú pháp JS, cấu trúc 15 trang, đường dẫn nội bộ/ảnh SVG và 26 tình huống nghiệp vụ bằng Node VM (DOM giả lập): đăng ký/đăng nhập, giỏ, chọn thanh toán, mã giảm, đơn theo tài khoản, đổi thông tin, lỗi lưu trữ và đăng xuất. Chưa kiểm tra trực quan bằng trình duyệt hoặc xác nhận W3C; hãy mở Live Server thử navbar, carousel, tab, modal và bố cục điện thoại trước khi nộp.

Không có backend, thanh toán thật, email thật hay quản trị. GitHub chưa được cập nhật từ gói mã này; tải ZIP, kiểm tra rồi đưa lên repository của nhóm bằng tài khoản có quyền.
