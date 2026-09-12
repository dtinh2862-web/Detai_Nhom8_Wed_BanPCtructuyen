# Group 8's PC sales website

Tên thư mục đề tài: DeTai_Nhom8_Wed bán PC trực tuyến.

Group 8's PC sales website — Nhóm 8. Bản 11 trang theo hai tài liệu mới, tên file tiếng Việt không dấu và chú thích tiếng Việt trong mã nguồn. Đăng nhập và đăng ký là hai trang độc lập; không đặt các form này trên trang chủ hoặc trang khác.

## 1. Mở website và xem code

1. Giải nén ZIP vào thư mục mới để tránh lẫn bản cũ.
2. Trong VS Code chọn File → Open Folder và mở thư mục dự án.
3. Nhấp phải HTML/trang-chu.html → Open with Live Server.
4. Nếu đang thấy giao diện thay vì code: nhấp phải file → Open With → Text Editor.
5. Muốn xem giao diện và code cùng lúc: mở trang bằng Chrome/Edge và để VS Code bên cạnh.
6. Muốn format file: dùng Format Document trong VS Code.

Có thể chạy bằng lệnh sau trong Terminal ở thư mục gốc:

```bash
python -m http.server 8000
```

- `python`: chạy Python đã cài trên máy.
- `-m http.server`: dùng module phục vụ file qua HTTP.
- `8000`: cổng để truy cập; mở http://localhost:8000/HTML/trang-chu.html.
- `Ctrl+C`: dừng server.

Chạy qua localhost giúp LocalStorage dùng chung giữa các trang và Web Crypto hoạt động. Không cần npm, backend hay Internet để chạy dự án.

## 2. Cấu trúc và nơi cần sửa

| Khu vực | Chức năng và nơi sửa |
| --- | --- |
| HTML/trang-chu.html | Banner, tìm kiếm, sản phẩm và tin nổi bật |
| HTML/dang-nhap.html | Form đăng nhập riêng |
| HTML/dang-ky.html | Form 6 trường, kết quả đăng ký |
| HTML/san-pham.html | Khung lọc và danh sách sản phẩm |
| HTML/chi-tiet-san-pham.html | Khung nhận chi tiết sản phẩm từ JS |
| HTML/gio-hang.html | Khung bảng giỏ |
| HTML/thanh-toan.html | Form nhận hàng, phương thức mô phỏng, tóm tắt |
| HTML/tin-tuc.html | Khung tin và bộ chọn loại |
| HTML/chi-tiet-tin-tuc.html | Khung chi tiết bài viết |
| HTML/gioi-thieu.html | Giới thiệu, thành viên, liên hệ và chính sách mẫu |
| HTML/so-do-trang-web.html | Cây liên kết giữa 11 trang |
| CSS/chinh.css | Điểm nạp CSS duy nhất, import 22 file CSS con |
| CSS/co-so/ | Reset, biến màu, font, container và quy tắc chung |
| CSS/bo-cuc/ | Đầu trang, thanh điều hướng, chân trang |
| CSS/thanh-phan/ | Nút, biểu mẫu, thẻ sản phẩm và thẻ tin dùng lại |
| CSS/trang/ | Bố cục riêng của từng trang |
| CSS/tuong-thich/ | Media query cho tablet và điện thoại |
| JS/du-lieu.js | Array sản phẩm và tin mẫu; khởi tạo LocalStorage |
| JS/dung-chung.js | Đọc/ghi bộ nhớ, thông báo, tiền tệ, bộ đếm, menu |
| JS/tai-khoan.js | Validation, đăng ký, đăng nhập, đăng xuất |
| JS/san-pham.js | Tạo card, lọc, sắp xếp và chi tiết sản phẩm |
| JS/gio-hang.js | Thêm, tăng/giảm, xóa, tổng tiền và đặt đơn mẫu |
| JS/tin-tuc.js | Danh sách tin, lọc loại và chi tiết tin |
| IMG/logo, banner, san-pham, tin-tuc, thanh-vien, bieu-tuong | 16 ảnh SVG minh họa nội bộ |

Tên file được Việt hóa; tên biến/class hiện có vẫn giữ nhất quán giữa HTML/CSS/JS để dễ lần theo. Từ khóa chuẩn như function, display và href không dịch sang tiếng Việt.

Header/menu/footer dùng cùng cấu trúc trên 11 trang. Sửa CSS đầu trang chỉ ở CSS/bo-cuc/dau-trang.css; sửa cấu trúc HTML header thì cập nhật đồng bộ 11 trang.

## 3. Cách đọc chú thích

```html
<!-- href là địa chỉ trang đích; bấm vào sẽ mở trang sản phẩm. -->
<a href="san-pham.html">Xem sản phẩm</a>
```

```css
/* Căn giữa khung khi còn khoảng trống ở hai bên. */
.container {
    margin: 0 auto;
}
```

```javascript
// Tìm sản phẩm có id bằng mã truyền từ URL.
const sanPhamDuocChon = products.find(p => p.id === 1);
```

- HTML dùng `<!-- ... -->`.
- CSS dùng `/* ... */`.
- JavaScript dùng `// ...` hoặc `/* ... */`.
- Chú thích giải thích mã nguồn và không hiển thị thành nội dung website.
- Không đặt chú thích vào giữa chuỗi ký tự, tên thuộc tính hoặc giá trị.
- Những chuỗi HTML dài trong JS là mẫu để tạo card/bảng. Hãy đọc chú thích đầu hàm rồi lần theo class trong CSS.

## 4. HTML — thẻ và thuộc tính đang dùng

| Cú pháp | Dùng để làm gì |
| --- | --- |
| DOCTYPE html | Khai báo tài liệu HTML hiện đại |
| html lang="vi" | Khai báo ngôn ngữ tiếng Việt |
| head | Chứa metadata, title, CSS và script |
| meta charset="UTF-8" | Hiển thị đúng chữ tiếng Việt |
| meta name="viewport" | Cho giao diện dùng chiều rộng thiết bị trên điện thoại |
| title | Tên hiển thị trên tab trình duyệt |
| header / nav / main / footer | Xác định đầu trang, điều hướng, nội dung chính, cuối trang |
| section / article / aside | Nhóm nội dung, bài độc lập, nội dung phụ |
| div / span | Khối hoặc đoạn nhỏ để nhóm và định dạng nội dung |
| h1, h2, h3 | Các cấp tiêu đề; mỗi trang có một h1 cho nội dung chính |
| p | Một đoạn văn |
| a | Liên kết có thể bấm |
| href | Địa chỉ đích của liên kết; trên link stylesheet là địa chỉ CSS |
| src | Đường dẫn tài nguyên của img hoặc script |
| alt | Mô tả thay thế cho ảnh; alt rỗng dùng cho ảnh chỉ trang trí |
| width / height trên img | Kích thước gợi ý và giữ không gian ảnh trước khi tải |
| loading="lazy" | Cho trình duyệt trì hoãn tải ảnh ở xa vùng nhìn |
| link rel="stylesheet" | Nạp stylesheet bên ngoài |
| class | Nhóm phần tử để dùng chung CSS; có thể lặp lại |
| id | Định danh duy nhất trong một trang, dùng với CSS, JS hoặc liên kết # |
| form | Gom các trường nhập thành biểu mẫu |
| action | Trang nhận dữ liệu form; tìm kiếm chuyển sang san-pham.html |
| name | Tên trường; FormData hoặc URL dùng tên này làm khóa |
| label / for | Nhãn mô tả; for trỏ đến id của trường nhập |
| input type | Chọn kiểu nhập: text, email, tel, password, number, search, radio |
| required | Trình duyệt yêu cầu điền trường trước khi gửi form |
| placeholder | Gợi ý trong ô trống; không thay thế label |
| value | Giá trị nhập hoặc giá trị một lựa chọn |
| minlength / maxlength | Giới hạn độ dài văn bản |
| min / max / step | Giới hạn và bước nhảy cho số lượng |
| pattern | Biểu thức kiểm tra định dạng khi dùng validation HTML |
| autocomplete | Gợi ý cho trình duyệt loại thông tin cần điền |
| novalidate | Tắt kiểm tra tự động của form; đăng ký được kiểm tra bằng JS để có thông báo cụ thể |
| button type="submit" | Gửi biểu mẫu; button trong form mặc định cũng là submit |
| select / option | Danh sách lựa chọn, ví dụ loại sản phẩm hoặc loại tin |
| fieldset / legend | Nhóm radio COD/chuyển khoản và tên nhóm |
| table / caption / thead / tbody | Bảng dữ liệu, tiêu đề bảng, phần đầu và phần thân |
| tr / th / td / scope | Dòng, ô tiêu đề, ô dữ liệu; scope xác định tiêu đề cho hàng/cột |
| ul / li | Danh sách dùng cho Sitemap |
| dl / dt / dd | Danh sách tên trường và giá trị đăng ký thành công |
| time datetime | Ngày ở dạng máy đọc được, kèm nội dung ngày hiển thị |
| hidden | Ẩn khối cho tới khi JS bỏ trạng thái này |
| disabled | Vô hiệu hóa nút, chẳng hạn khi giỏ hàng trống |
| script defer | Tải JS ngoài và chạy sau khi phân tích HTML, theo thứ tự xuất hiện |
| data-page | Thuộc tính tự đặt, JS đọc qua document.body.dataset.page |
| aria-label | Tên thao tác cho công cụ hỗ trợ đọc màn hình |
| aria-current | Đánh dấu mục menu của trang hiện tại |
| role="status" / aria-live | Cho công cụ hỗ trợ thông báo nội dung thay đổi |
| tabindex="-1" | Cho phép JS đưa focus vào khối kết quả mà không thêm nó vào vòng Tab thông thường |
| noscript | Nội dung giải thích khi trình duyệt không bật JS |

Ví dụ đường dẫn:

```html
<!-- Cùng thư mục HTML: mở trang đăng nhập. -->
<a href="dang-nhap.html">Đăng nhập</a>
<!-- ../ đi lên thư mục gốc, sau đó vào IMG/san-pham. -->
<img src="../IMG/san-pham/pc-gaming-01.svg" alt="PC gaming minh họa">
<!-- ?id=1 truyền mã sản phẩm cho JavaScript ở trang chi tiết. -->
<a href="chi-tiet-san-pham.html?id=1">Chi tiết</a>
```

## 5. CSS — thuộc tính và bộ chọn

| Cú pháp | Ý nghĩa |
| --- | --- |
| .ten-class | Chọn các phần tử mang class đó |
| #ten-id | Chọn phần tử có id đó |
| cha con | Chọn phần tử con ở bất kỳ mức lồng nào |
| cha > con | Chỉ chọn con trực tiếp |
| a:hover | Kiểu khi trỏ chuột lên liên kết |
| :focus-visible | Đường nhấn khi người dùng điều hướng bằng bàn phím |
| :disabled | Kiểu của nút bị vô hiệu hóa |
| [hidden] | Chọn phần tử có thuộc tính hidden |
| :root / --ten-bien | Nơi khai báo biến giao diện dùng chung |
| var(--accent) | Đọc biến màu nhấn |
| @import | Nạp CSS con; tất cả import đặt trước các quy tắc thường |
| @media(max-width:700px) | Áp dụng kiểu khi viewport rộng không quá 700px |
| !important | Ưu tiên khai báo; chỉ dùng có chủ đích, chẳng hạn giữ hidden thực sự ẩn |
| min(), max(), clamp() | Tính giới hạn kích thước linh hoạt |
| fr / repeat() / minmax() | Chia cột Grid theo phần không gian và giới hạn |
| px / % / vw | Pixel CSS, phần trăm theo ngữ cảnh và phần trăm chiều rộng viewport |

| Thuộc tính | Công dụng |
| --- | --- |
| align-items | Căn các phần tử theo trục phụ. |
| aspect-ratio | Giữ tỉ lệ khung ảnh. |
| background | Đặt nền. |
| border | Đặt đường viền. |
| border-collapse | Gộp các đường viền bảng. |
| border-radius | Bo góc khối. |
| bottom | Đặt khoảng cách từ mép dưới. |
| box-shadow | Tạo bóng đổ. |
| box-sizing | Tính padding và border vào kích thước khi dùng border-box. |
| color | Đặt màu chữ. |
| cursor | Đặt hình con trỏ chuột. |
| display | Chọn cách bố trí phần tử (block, flex hoặc grid). |
| flex | Quy định khả năng co giãn trong Flexbox. |
| flex-direction | Chọn chiều xếp phần tử Flexbox. |
| flex-wrap | Cho phép phần tử xuống hàng khi thiếu chỗ. |
| font-family | Chọn phông chữ. |
| font-size | Đặt cỡ chữ. |
| font-weight | Đặt độ đậm chữ. |
| gap | Tạo khoảng cách giữa các phần tử con. |
| grid-template-columns | Chia số cột và độ rộng cột trong Grid. |
| height | Đặt chiều cao. |
| justify-content | Phân bố các phần tử theo trục chính. |
| letter-spacing | Điều chỉnh khoảng cách giữa các ký tự. |
| line-height | Đặt chiều cao dòng để dễ đọc. |
| margin | Tạo khoảng cách bên ngoài khối; auto có thể dùng để căn giữa. |
| max-height | Giới hạn chiều cao tối đa. |
| max-width | Giới hạn chiều rộng tối đa. |
| min-height | Đặt chiều cao tối thiểu. |
| min-width | Đặt chiều rộng tối thiểu. |
| object-fit | Chọn cách ảnh vừa khung. |
| opacity | Đặt độ trong suốt. |
| outline | Vẽ đường nhấn khi phần tử được chọn. |
| outline-offset | Tạo khoảng cách giữa đường focus và phần tử. |
| overflow | Xử lý nội dung tràn khung. |
| overflow-wrap | Cho phép ngắt chuỗi dài để không tràn khung. |
| padding | Tạo khoảng đệm bên trong khối. |
| place-items | Căn phần tử theo cả hai chiều trong Grid. |
| position | Chọn cơ chế định vị. |
| right | Đặt khoảng cách từ mép phải. |
| text-align | Căn nội dung chữ. |
| text-decoration | Điều chỉnh gạch chân hoặc trang trí chữ. |
| text-transform | Đổi cách hiển thị chữ hoa hoặc chữ thường. |
| top | Đặt khoảng cách từ mép trên trong cơ chế định vị. |
| transition | Tạo chuyển đổi nhẹ khi kiểu hiển thị thay đổi. |
| white-space | Quy định cách giữ khoảng trắng và xuống dòng. |
| width | Đặt chiều rộng. |
| z-index | Xác định thứ tự lớp hiển thị. |

Các biến thể margin-top, margin-inline, padding-block… điều chỉnh riêng cạnh hoặc trục. Với hướng chữ hiện tại: inline là ngang, block là dọc.

- Flexbox phù hợp hàng logo/search/tài khoản và nút thao tác.
- Grid phù hợp lưới sản phẩm, tin tức, hai cột chi tiết và checkout.
- Table chỉ dùng cho dữ liệu cấu hình/giỏ, không dựng toàn bộ giao diện.
- Responsive nạp cuối để điều chỉnh quy tắc desktop trên màn hình nhỏ.

## 6. JavaScript — lệnh, phương thức và luồng xử lý

| Cú pháp | Công dụng |
| --- | --- |
| const / let | Khai báo biến; const không gán lại biến, nhưng nội dung object/array vẫn có thể đổi |
| function / return | Đóng gói thao tác thành hàm; trả kết quả hoặc kết thúc hàm |
| if / else | Rẽ nhánh theo điều kiện, ví dụ tài khoản có tồn tại không |
| === / !== | So sánh bằng/khác nghiêm ngặt |
| && / \|\| / ! | Và, hoặc, phủ định điều kiện |
| Array / Object | Mảng nhiều bản ghi; object mô tả một sản phẩm/tài khoản |
| p => p.id === id | Hàm mũi tên kiểm tra sản phẩm khớp id |
| find | Lấy phần tử đầu tiên thỏa điều kiện |
| filter | Tạo mảng gồm các phần tử thỏa điều kiện |
| map | Chuyển từng phần tử thành kết quả khác, ví dụ sản phẩm thành chuỗi card HTML |
| forEach | Thực hiện thao tác trên mỗi phần tử |
| reduce | Gom mảng thành một giá trị, như tổng tiền |
| sort | Sắp xếp mảng tại chỗ; dự án sort trên kết quả filter |
| slice / join / includes | Lấy một phần mảng, nối chuỗi, kiểm tra có chứa |
| Object.entries / values | Lấy các cặp khóa-giá trị hoặc danh sách giá trị của object |
| Object.fromEntries | Đổi các cặp tên-giá trị của FormData thành object |
| Object.hasOwn | Kiểm tra object có khóa trực tiếp đó không |
| Set | Tập giá trị không trùng; dùng kiểm tra id |
| document.querySelector | Tìm phần tử đầu tiên theo selector CSS |
| querySelectorAll / getElementById | Lấy nhiều phần tử theo selector / lấy theo id |
| textContent | Gán chữ thuần; an toàn khi hiển thị thông tin người dùng |
| innerHTML | Gán chuỗi HTML; nội dung từ bộ nhớ phải escape trước khi ghép |
| addEventListener | Gắn xử lý sự kiện submit, click, change hoặc storage |
| event.preventDefault() | Ngăn hành vi mặc định, ví dụ tải lại trang khi submit |
| FormData(form) | Đọc dữ liệu theo name của các trường trong form |
| input.value / element.dataset | Đọc giá trị ô nhập / các thuộc tính data-* |
| element.hidden / disabled | Hiện-ẩn khối / bật-tắt nút |
| location.search / URLSearchParams | Đọc phần ?id=... hoặc ?q=... trên URL |
| location.href | Chuyển trang; đăng nhập đúng chuyển về trang-chu.html |
| localStorage.getItem / setItem | Đọc/ghi dữ liệu dạng chuỗi theo key |
| JSON.stringify / JSON.parse | Object/Array → chuỗi JSON và chuỗi JSON → dữ liệu |
| try / catch / finally | Xử lý lỗi lưu trữ hoặc crypto và khôi phục nút sau thao tác |
| Number / Number.isInteger / isFinite | Đổi sang số và kiểm tra số lượng/giá hợp lệ |
| Math.min / Math.max | Chặn số lượng trong giới hạn |
| trim / toLowerCase | Bỏ khoảng trắng đầu/cuối và đổi chữ thường để so sánh |
| normalize / replace / test | Chuẩn hóa chuỗi, thay ký tự và kiểm tra regex |
| async / await | Chờ thao tác bất đồng bộ như băm mật khẩu |
| crypto.getRandomValues / subtle.digest | Tạo salt ngẫu nhiên và băm mật khẩu thử nghiệm |
| Intl.NumberFormat | Định dạng giá tiền tiếng Việt |
| Date.now | Tạo phần mã đơn mô phỏng dựa trên thời điểm |
| setTimeout / clearTimeout | Hẹn ẩn thông báo / hủy lần hẹn cũ |
| ?. / ?? | Truy cập khi có dữ liệu / giá trị thay thế khi null hoặc undefined; đọc theo vị trí dùng |
| ... | Sao chép hoặc mở rộng phần tử mảng/object |

### Các hàm chính trong dự án

| Hàm | Nhiệm vụ |
| --- | --- |
| addCart | Thêm sản phẩm hoặc tăng số lượng của dòng đã có trong giỏ. |
| card | Tạo HTML cho một thẻ sản phẩm từ object; không tự thay đổi giỏ hàng. |
| draw | Lọc theo loại, ngân sách, tìm kiếm rồi sắp xếp và cập nhật danh sách. |
| drawDetail | Lấy id từ URL, tìm sản phẩm và hiển thị thông số; gắn nút thêm giỏ. |
| drawNews | Hiển thị tin nổi bật hoặc bài viết tương ứng id trên URL. |
| drawProducts | Hiển thị danh sách và gắn sự kiện lọc/sắp xếp trên trang sản phẩm. |
| escapeHTML | Chuyển ký tự HTML đặc biệt thành văn bản an toàn trước khi đưa vào innerHTML. |
| getCart | Đọc giỏ, loại dữ liệu sai, gộp dòng trùng và giới hạn số lượng 1–10. |
| getUsers | Đọc mảng tài khoản và loại các phần tử không hợp lệ. |
| loadCatalog | Đọc danh mục đã lưu; khởi tạo hoặc phục hồi mảng mẫu khi dữ liệu không hợp lệ. |
| newsCard | Tạo HTML cho một thẻ tin gồm ảnh, ngày, tiêu đề và liên kết chi tiết. |
| notify | Hiển thị thông báo ngắn và tự ẩn sau vài giây. |
| passwordHash | Băm mật khẩu thử nghiệm kèm salt bằng Web Crypto; không phải xác thực máy chủ. |
| readStore | Đọc JSON theo key từ LocalStorage; trả giá trị dự phòng nếu thiếu hoặc lỗi. |
| renderCart | Vẽ bảng giỏ và gắn thao tác tăng, giảm, xóa từng sản phẩm. |
| renderCheckout | Hiển thị tóm tắt đơn và vô hiệu hóa đặt hàng nếu giỏ trống. |
| renderNewsList | Lọc tin theo loại đang chọn rồi cập nhật số lượng và thẻ tin. |
| saveCart | Lưu giỏ hàng rồi cập nhật số lượng hiển thị ở header. |
| totalCart | Cộng đơn giá nhân số lượng của tất cả các dòng trong giỏ. |
| updateAccount | Cập nhật lời chào và nút đăng xuất từ trạng thái đăng nhập. |
| updateCartCount | Tính tổng số lượng sản phẩm và cập nhật huy hiệu giỏ hàng. |
| validNews | Kiểm tra cấu trúc một tin trước khi hiển thị. |
| validProduct | Kiểm tra cấu trúc một sản phẩm trước khi dùng dữ liệu từ LocalStorage. |
| validateRegistration | Kiểm tra họ tên, email, điện thoại, username và hai ô mật khẩu. |
| writeStore | Chuyển dữ liệu sang JSON rồi lưu; báo lỗi nếu trình duyệt chặn lưu trữ. |

### Luồng dữ liệu dễ nhớ

1. du-lieu.js khai báo mẫu và đọc sanPham/tinTuc từ LocalStorage.
2. san-pham.js tạo card có liên kết chi-tiet-san-pham.html?id=...
3. Trang chi tiết đọc id → find sản phẩm → bấm thêm → gio-hang.js lưu giỏ.
4. Trang giỏ đọc giỏ → cộng đơn giá × số lượng → sang thanh toán.
5. Xác nhận đơn mẫu → hiển thị mã, không gửi dữ liệu đi → làm trống giỏ.

Ví dụ JSON:

```javascript
// Chuyển mảng thành chuỗi để LocalStorage lưu được.
localStorage.setItem("gioHang", JSON.stringify([{ id: 1, quantity: 2 }]));
// Đọc lại chuỗi và khôi phục thành mảng; đây là ví dụ giản lược.
const gioHangMau = JSON.parse(localStorage.getItem("gioHang") || "[]");
```

Trong mã thật, readStore dùng try/catch để dữ liệu JSON hỏng không làm trang dừng chạy.

## 7. Các key LocalStorage

| Key | Dữ liệu |
| --- | --- |
| taiKhoan | Mảng tài khoản thử nghiệm |
| dangNhapHienTai | Username đang đăng nhập |
| sanPham | Mảng sản phẩm |
| tinTuc | Mảng tin tức |
| gioHang | Id sản phẩm và quantity |

Không cần donHang vì không lưu lịch sử đơn. Khi sửa dữ liệu mẫu trong du-lieu.js, xóa riêng key sanPham/tinTuc trong DevTools → Application → Local Storage rồi tải lại. Không xóa toàn bộ nếu muốn giữ tài khoản và giỏ.

Đăng ký kiểm tra 6 trường, hiển thị lại họ tên/email/điện thoại/username, không hiển thị mật khẩu. Mật khẩu demo được băm kèm salt. Đây vẫn chỉ là mô phỏng cục bộ: LocalStorage có thể bị sửa, không dùng dữ liệu cá nhân hay mật khẩu thật.

## 8. Bootstrap và jQuery

Bản này không dùng Bootstrap hoặc jQuery vì hai tài liệu cho phép CSS và JavaScript thuần. Do đó không có file thư viện hay chú thích giả về thư viện không được sử dụng.

- Bootstrap là thư viện giao diện: những class như container, row, col có quy tắc do thư viện định nghĩa.
- jQuery là thư viện hỗ trợ thao tác DOM/sự kiện: ví dụ $(selector) là cú pháp của jQuery, không phải JavaScript có sẵn.
- Class .container trong dự án này là CSS tự viết, không đồng nghĩa đang dùng Bootstrap.
- Menu được làm bằng CSS, form kiểm tra bằng JavaScript thuần.
- Nếu sau này có yêu cầu thêm thư viện, lưu file local trong CSS/thu-vien và JS/thu-vien; giữ nguyên thông báo bản quyền, chú thích ở phần tích hợp tự viết. Không cần sửa mã thư viện minified.

## 9. Hoàn thiện và kiểm tra trước khi nộp

1. Điền tên, MSSV, vai trò và liên hệ nhóm trong gioi-thieu.html; ảnh thành viên hiện là minh họa.
2. Thử đăng ký sai/trống/trùng tài khoản rồi thử trường hợp đúng.
3. Đăng nhập đúng phải chuyển về trang chủ; đăng xuất cập nhật header.
4. Thử lọc sản phẩm/tin, id không tồn tại, thêm/xóa/đổi số lượng.
5. Thử checkout: giỏ rỗng không đặt được; đơn hợp lệ có mã mẫu và giỏ được làm trống.
6. Kiểm tra trên Chrome và Edge/Firefox; thu nhỏ cửa sổ để thử responsive.
7. Kiểm tra W3C HTML/CSS trước khi nộp.

Đã kiểm tra: cú pháp 6 JS, 11 title riêng, header/footer thống nhất, 307 tham chiếu nội bộ, 22 CSS import, 16 SVG hợp lệ và 21 ca xử lý bằng Node VM. Test VM không thay thế thao tác trong trình duyệt. Chưa xác minh trực quan/W3C/hai trình duyệt trong môi trường hiện tại.

Ảnh SVG là hình minh họa tự tạo; thông số và giá là dữ liệu mẫu, không phải báo giá đang bán. Không backend, database, admin, API, chatbot, tồn kho hay thanh toán thật.

## 10. Lệnh Git thường dùng

Chỉ chạy trong repository của bạn; ZIP tải xuống không chứa thư mục .git.

| Lệnh | Dùng để làm gì |
| --- | --- |
| git status | Xem file đang thay đổi |
| git diff | Xem nội dung thay đổi chưa stage |
| git add HTML CSS IMG JS README.md | Chọn thay đổi của các phần này cho commit tiếp theo |
| git commit -m "Mo ta thay doi" | Lưu một mốc lịch sử trên máy |
| git pull | Lấy và tích hợp thay đổi từ nhánh theo dõi; kiểm tra thay đổi cục bộ trước |
| git push origin main | Đẩy commit từ main lên origin; cần quyền GitHub |
| git switch -c ten-nhanh | Tạo và chuyển sang nhánh mới để làm việc nhóm |

Nếu muốn cập nhật repo từ ZIP, trước tiên lưu các thay đổi riêng của bạn, thay bộ mã cũ bằng bộ mới trong repo rồi kiểm tra git diff. Không chỉ chép đè vì tên file của bản này đã đổi; file tiếng Anh cũ phải được bỏ khỏi bản làm việc sau khi bạn kiểm tra. Lịch sử bản cũ vẫn có trong Git.
