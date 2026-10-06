# G8-PC — Mã nguồn website bán máy tính

Bản cập nhật từ tệp ZIP người dùng cung cấp ngày 06/10/2026. Giao diện gồm 16 trang, dùng HTML, CSS, JavaScript thuần, Bootstrap và jQuery cục bộ. Các nội dung nói về nhóm thực hiện, đồ án, demo hay thử nghiệm đã được thay bằng nội dung mua sắm; mô tả kỹ thuật nằm trong tài liệu và comment mã nguồn.

## Thay đổi trong bản G8-PC

- Đổi nhận diện hiển thị sang **G8-PC**, gồm đầu trang, chân trang, tên tab, sản phẩm, bài viết và logo.
- Trang chủ có nút **Danh mục sản phẩm**: rê chuột để xổ danh sách; trên điện thoại nhấn để mở/đóng. Gồm tất cả sản phẩm, PC Gaming, PC Văn phòng, PC Đồ họa, PC Streaming và linh kiện.
- Footer của cả 16 trang có liên kết **Thông tin liên hệ**, mở trang danh bạ 5 thành viên.
- Màu sắc, sản phẩm, giá, mã ưu đãi và các luồng còn lại giữ theo bản trước.

### Điền danh bạ 5 thành viên

Mở `JS/lien-he.js`, điền đúng 5 phần tử trong `CONTACT_MEMBERS`:

```javascript
// Thay chuỗi rỗng bằng dữ liệu thật; avatar là đường dẫn từ thư mục HTML.
{
    name: "",       // Họ và tên thành viên.
    phone: "",      // Số di động Việt Nam 10 chữ số, ví dụ định dạng đầu 03/05/07/08/09.
    email: "",      // Gmail của thành viên, kết thúc bằng @gmail.com.
    avatar: "../IMG/thanh-vien/thanh-vien-1.svg" // Thay bằng ảnh .jpg/.png nếu có.
}
```

Chưa có dữ liệu thật nên bản giao có 5 avatar trung tính, nhãn Thành viên 1–5 và “Chưa cập nhật”. Không gán số điện thoại/email giả. Khi dữ liệu hợp lệ, JS tự tạo `tel:` để mở ứng dụng gọi và `mailto:` để mở ứng dụng email; thao tác này không tự gửi thư. Điền từng thành viên và thay ảnh tương ứng để khách có thể liên hệ.

### Các tệp bổ sung

| Tệp | Mục đích |
| --- | --- |
| `JS/danh-muc.js` | Mở/đóng danh mục bằng chuột, chạm, Enter/Space, ArrowDown/Escape |
| `HTML/thong-tin-lien-he.html` | Khung trang danh bạ thành viên |
| `CSS/trang/thong-tin-lien-he.css` | Thẻ thành viên, avatar và dòng liên hệ |
| `JS/lien-he.js` | Dữ liệu 5 người, render an toàn bằng textContent, kiểm tra và tạo liên kết |
| `IMG/thanh-vien/thanh-vien-1.svg` đến `thanh-vien-5.svg` | 5 avatar trung tính có thể thay bằng ảnh thật |
| `IMG/bieu-tuong/dien-thoai.svg`, `gmail.svg` | Biểu tượng minh họa hình thức liên hệ |

`pointerenter`/`pointerleave` nhận thao tác rê chuột; `hidden` ẩn danh sách; `aria-expanded` thông báo trạng thái cho công nghệ trợ năng; `keydown` nhận phím điều khiển; `focusout` đóng khi Tab ra ngoài. `createElement`, `appendChild` và `textContent` tạo nội dung liên hệ mà không ghép dữ liệu cá nhân thành HTML.

## 1. Chạy website và mở code

1. Giải nén ZIP vào thư mục mới. Mở thư mục `G8-PC` bằng VS Code.
2. Nhấp phải `HTML/trang-chu.html` → **Open with Live Server**.
3. Muốn xem mã thay vì giao diện: **Open With → Text Editor**.
4. Luôn dùng cùng địa chỉ/cổng localhost để các trang cùng truy cập dữ liệu trình duyệt.

Có thể chạy từ Terminal ở thư mục `G8-PC`:

```bash
# -m chạy module http.server có sẵn trong Python; 8000 là cổng máy chủ.
python -m http.server 8000
```

Mở `http://localhost:8000/HTML/trang-chu.html`. Không cần cài npm, tải thêm thư viện hoặc kết nối Internet khi dùng website.

| Lệnh/thao tác | Mục đích |
| --- | --- |
| `python` | Chạy Python đã được cài trên máy |
| `-m http.server` | Phục vụ các tệp của thư mục hiện tại qua HTTP |
| `8000` | Cổng của máy chủ cục bộ |
| `Ctrl+C` | Dừng máy chủ trong Terminal |
| Format Document | Căn lại thụt lề mã nguồn trong VS Code |
| `git status` | Xem danh sách thay đổi trong một repository Git |
| `git diff` | Xem nội dung thay đổi chưa đưa vào staging |
| `git add .` | Đưa thay đổi vào staging, cần kiểm tra danh sách trước |
| `git commit -m "Cap nhat giao dien"` | Lưu phiên bản vào Git cục bộ |
| `git push` | Đẩy commit lên remote khi đã cấu hình repository và có quyền |

ZIP này là mã nguồn, không tự tạo repository, đẩy GitHub hoặc triển khai website.

## 2. Cấu trúc và trách nhiệm từng phần

Giữ bốn thư mục chính `HTML`, `CSS`, `JS`, `IMG`. Tên tệp nghiệp vụ dùng tiếng Việt không dấu; tên thư viện giữ nguyên để nhận diện và bảo toàn thông báo giấy phép.

| Trang trong `HTML/` | Chức năng |
| --- | --- |
| `trang-chu.html` | Logo, tìm kiếm, menu, carousel, danh mục, sản phẩm và tin nổi bật |
| `san-pham.html` | Tìm kiếm, lọc nhu cầu/ngân sách, sắp xếp giá |
| `chi-tiet-san-pham.html` | Cấu hình, ảnh, tab Bootstrap, số lượng, thêm giỏ/mua ngay |
| `gio-hang.html` | Chọn sản phẩm, tăng/giảm số lượng, xóa, tổng tiền |
| `thanh-toan.html` | Kiểm tra người nhận, mã ưu đãi, phương thức và lưu đơn |
| `dang-ky.html` | Kiểm tra họ tên/email/mật khẩu, xác nhận và thông tin sau đăng ký |
| `dang-nhap.html` | Đăng nhập bằng email hoặc họ tên |
| `tai-khoan.html` | Hồ sơ, đổi email/mật khẩu, lịch sử đơn |
| `bo-suu-tap.html` | Cấu hình theo nhu cầu, tìm kiếm và lưu bộ sưu tập |
| `giam-gia.html` | PC nổi bật, sắp giá, lưu ưu đãi, liên kết đến mã giảm |
| `khuyen-mai.html` | Tìm kiếm và lưu mã ưu đãi |
| `tin-tuc.html`, `chi-tiet-tin-tuc.html` | Lọc/lưu bài viết, sao chép liên kết và đọc nội dung |
| `gioi-thieu.html` | Giới thiệu cửa hàng, các bước mua hàng và hỗ trợ chọn PC |
| `so-do-trang.html` | Liên kết nhanh đến toàn bộ trang |
| `thong-tin-lien-he.html` | Danh bạ 5 thành viên: avatar, tên, điện thoại và Gmail |

| Đường dẫn | Vai trò |
| --- | --- |
| `CSS/chinh.css` | Import 11 tệp CSS dùng chung |
| `CSS/co-so/` | Đặt lại mặc định, biến màu và kiểu cơ bản |
| `CSS/bo-cuc/` | Đầu trang, menu và chân trang |
| `CSS/thanh-phan/` | Nút, biểu mẫu, thẻ sản phẩm và thẻ tin |
| `CSS/trang/` | Mỗi HTML có một tệp CSS riêng |
| `CSS/tuong-thich/` | Bố cục điện thoại/tablet, giảm chuyển động khi người dùng yêu cầu |
| `CSS/thu-vien/`, `JS/thu-vien/` | Bootstrap CSS, Bootstrap bundle và jQuery lưu cục bộ |
| `JS/du-lieu.js` | 8 sản phẩm, 3 bài viết, loại sản phẩm và mã ưu đãi |
| `JS/kiem-tra.js` | Toàn bộ regex và các hàm kiểm tra dữ liệu dùng chung |
| `JS/xac-thuc.js` | Đăng ký, đăng nhập, đăng xuất, thông báo lỗi form |
| `JS/chung.js` | JSON/LocalStorage, định dạng tiền, giỏ, liên kết, navbar |
| Các JS còn lại | Tên trùng chức năng trang để dễ tìm xử lý tương ứng |
| `IMG/` | Logo G8-PC, hình PC, ảnh bìa, tin tức và biểu tượng SVG |

**Thứ tự tải:** jQuery → Bootstrap → dữ liệu → kiểm tra → xác thực → JS chung → JS trang. Script đặt cuối body; form xác thực gắn sự kiện sau DOMContentLoaded. Không đổi thứ tự tùy ý vì tệp sau gọi hàm của tệp trước.

`../` trong HTML đi lên thư mục gốc; đường dẫn `@import` được tính từ chính tệp CSS chứa nó. Chỉnh màu ở `CSS/co-so/bien-mau.css`, chỉnh bố cục riêng ở `CSS/trang/`.

## 3. Luồng xử lý và biểu thức chính quy

JS viết theo các hàm nhỏ, điều kiện `if` trả lỗi sớm, mảng sản phẩm và các hàm `find`, `filter`, `map`, `reduce`. Không dùng framework, API, class phức tạp hoặc bước build. Danh mục đọc trực tiếp từ `du-lieu.js` để bỏ cơ chế cache cũ và tránh xuất hiện lại nội dung cũ sau cập nhật.

### Quy tắc kiểm tra

Các regex được khai báo duy nhất trong `JS/kiem-tra.js`, dùng lại ở đăng ký, đổi tài khoản, chi tiết sản phẩm và thanh toán. `.test(value)` trả `true` nếu chuỗi khớp quy tắc.

| Dữ liệu | Biểu thức/quy tắc | Ví dụ |
| --- | --- | --- |
| Họ tên | `/^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u` và độ dài 2–50 | `Đặng Thành Tính` hợp lệ; `Tính123` sai |
| Email | Xem `MAU_KIEM_TRA.email`: hộp thư + `@` + tên miền có dấu chấm; tối đa 254 ký tự, không có hai dấu chấm liên tiếp | `khach@example.com` hợp lệ; `khach@` sai |
| Mật khẩu mới | `/^(?=.*[A-Za-z])(?=.*\d)[^\s]{8,32}$/` | `G8pc12345` hợp lệ; `abcdefgh` sai vì thiếu số |
| Điện thoại | `/^0[35789]\d{8}$/` sau khi bỏ khoảng trắng/dấu chấm/gạch nối | `090 123 4567` → `0901234567`; `0123456789` sai |
| Địa chỉ | `/^[\p{L}\p{M}\d\s.,\/#()'-]{5,150}$/u` | `12/3 Nguyễn Huệ, Phường 1` hợp lệ; chuỗi có `<script>` sai |
| Số lượng | `/^[1-9]\d{0,2}$/` | 1–999; không nhận `0`, `-1`, `1.5`, `1e2` trong ô nhập |
| Mã ưu đãi | `/^[A-Z0-9]{4,16}$/` rồi đối chiếu bảng mã | `tech10` được đổi thành `TECH10`; đúng định dạng chưa chắc là mã có hiệu lực |

| Thành phần regex | Ý nghĩa |
| --- | --- |
| `^`, `$` | Đầu và cuối chuỗi, giúp kiểm tra toàn bộ giá trị |
| `[A-Z0-9]` | Một ký tự thuộc tập chữ in hoa hoặc chữ số |
| `\d`, `\s` | Một chữ số, một ký tự khoảng trắng |
| `[^\s]` | Ký tự không phải khoảng trắng |
| `\p{L}`, `\p{M}`, cờ `u` | Chữ Unicode, dấu kết hợp, chế độ Unicode để nhận tên tiếng Việt |
| `+`, `*` | Lặp từ một lần, hoặc từ không lần trở lên |
| `{8,32}` | Lặp ít nhất 8 và tối đa 32 lần |
| `(?:...)` | Gom nhóm mà không lấy riêng kết quả nhóm |
| `(?=.*[A-Za-z])` | Kiểm tra phía trước có ít nhất một chữ Latin |
| `(?=.*\d)` | Kiểm tra phía trước có ít nhất một chữ số |
| `\.` | Dấu chấm thật; dấu `.` không escape nghĩa là ký tự bất kỳ |

Regex email chỉ kiểm tra hình thức, không xác nhận hộp thư có thật. Regex điện thoại áp dụng số di động Việt Nam dạng nội địa, chưa nhận dạng `+84`. Regex không thay thế xử lý dữ liệu phía máy chủ.

### Theo dõi một lượt mua hàng

1. **Đăng ký:** chuẩn hóa họ tên và email → regex → xác nhận mật khẩu → kiểm tra email trùng → lưu `users`; không tự đăng nhập.
2. **Đăng nhập:** tìm email/họ tên không phân biệt hoa/thường → so mật khẩu → lưu `currentUser` → cập nhật navbar. Email giúp phân biệt tài khoản khi trùng họ tên.
3. **Chọn PC:** mở sản phẩm theo `id` trên URL → số lượng hợp lệ → yêu cầu đăng nhập → thêm hoặc gộp dòng cùng mã vào `cart`.
4. **Giỏ:** chọn dòng cần mua → lưu vào `checkout`; số lượng luôn từ 1 đến 999. Giá/ảnh/tên đọc lại từ danh mục, không tin giá bị sửa trong LocalStorage.
5. **Thanh toán:** kiểm tra thông tin → mã `TECH10` giảm 10%, `SALE20` giảm 20%, `NEW15` giảm 15% → tính tổng. Chỉ một mã cho mỗi đơn, không cộng dồn.
6. **Xác nhận:** lưu `orders_<id>` → chỉ xóa dòng đã mua khỏi giỏ → xóa checkout → hiện modal mã đơn. Không tự chuyển trang sau 2 giây; khách chủ động xem đơn hoặc mua tiếp.
7. **Tài khoản:** xem lịch sử theo id; đổi thông tin yêu cầu đúng mật khẩu hiện tại, email mới không trùng và mật khẩu mới đúng quy tắc.

Các form có `novalidate` để JS hiển thị thông báo tiếng Việt thống nhất; `required`, `type`, `minlength`, `maxlength` vẫn mô tả đúng trường dữ liệu. Khi sai, `showFormResult()` hiện Bootstrap alert, gắn `is-invalid`, `aria-invalid` và focus tới trường cần sửa. Mật khẩu đã đăng ký ở bản trước vẫn được đăng nhập theo giá trị đã lưu; quy tắc 8–32 ký tự áp dụng khi đăng ký hoặc đổi mật khẩu mới.

| Key LocalStorage | Mục đích |
| --- | --- |
| `users`, `currentUser` | Danh sách tài khoản và phiên hiện tại |
| `selectedProduct`, `selectedNews` | Mục được chọn trước khi sang chi tiết |
| `cart`, `checkout` | Giỏ hàng và các dòng chuẩn bị đặt |
| `orders_<id>` | Lịch sử đơn của từng tài khoản |
| `wishlist_collections`, `wishlist_deals` | Bộ sưu tập và PC đã lưu |
| `saved_promo_codes`, `saved_posts` | Mã ưu đãi và tin đã lưu |

Danh mục `products`/`news` từng lưu ở bản cũ được bỏ qua, không cần xóa toàn bộ dữ liệu người dùng. Giỏ và lịch sử hiện tại được giữ; tên sản phẩm lịch sử được đối chiếu theo id để hiển thị thương hiệu mới.

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
| `setTimeout(..., 4000)` | Ẩn thông báo ngắn sau khoảng 4 giây |
| `navigator.clipboard.writeText` | Sao chép liên kết tin khi trình duyệt cho phép |

## 7. Ghi chú kỹ thuật và kiểm tra

Giao diện trình bày như cửa hàng PC; phần xử lý vẫn là **front-end dùng LocalStorage**, chưa có máy chủ nhận đơn, cổng thanh toán, gửi email hoặc quản lý tồn kho. Mật khẩu đang được lưu dạng rõ theo cấu trúc cũ: chỉ dùng thông tin thử trong môi trường học tập. Trước khi vận hành thương mại cần xác thực và băm mật khẩu phía server, xác minh email, kiểm tra giá/đơn trên server và tích hợp thanh toán. Chọn “Chuyển khoản” hiện chỉ ghi phương thức vào đơn, không thực hiện giao dịch.

Hình PC là SVG, giá và cấu hình là bộ dữ liệu có sẵn của dự án; cần xác nhận lại thông tin bán hàng trước khi công khai. Website không tự thêm số điện thoại, địa chỉ cửa hàng hoặc cam kết bảo hành chưa được cung cấp.

Mã tự viết có comment theo khối nội dung, nhóm CSS, hàm và sự kiện. Không sửa/chèn comment từng dòng vào Bootstrap/jQuery minified; giữ nguyên giấy phép và giải thích các lớp/hàm sử dụng tại nơi tích hợp.

Bản trước đã đạt 37 kiểm tra nghiệp vụ và kiểm tra DOM/sự kiện 15 trang. Bản G8-PC kiểm tra bổ sung menu danh mục, danh bạ và liên kết của 16 trang. Kiểm tra tự động trong lần cập nhật: cú pháp JS, liên kết và tài nguyên 16 trang, nội dung hiển thị, regex, đăng ký/đăng nhập, giỏ, coupon, tài khoản và lưu đơn. Các kết quả chi tiết nằm trong `KIEM_TRA.md`. Chưa kiểm tra trực quan bằng trình duyệt; khi mở Live Server, thử thêm menu điện thoại, carousel, tab cấu hình và modal xác nhận.
