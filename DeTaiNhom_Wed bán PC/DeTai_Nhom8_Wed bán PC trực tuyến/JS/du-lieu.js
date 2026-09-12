// Dữ liệu minh họa; không phải giá bán thực tế. File này không xử lý DOM.
// Mảng sản phẩm mẫu: id duy nhất, giá là số để tính tiền.
const defaultProducts = [
  {
    "id": 1,
    "name": "Group 8 G1 Starter",
    "category": "gaming",
    "price": 15990000,
    "image": "pc-gaming-01.svg",
    "specs": {
      "CPU": "AMD Ryzen 5 5600G",
      "Mainboard": "B550",
      "RAM": "16GB DDR4",
      "VGA": "Radeon tích hợp",
      "SSD": "SSD 500GB",
      "PSU": "500W",
      "Case": "Mid Tower minh họa"
    },
    "description": "Cấu hình minh họa dùng trong đồ án. Thông số và giá không phải báo giá thương mại."
  },
  {
    "id": 2,
    "name": "Group 8 G2 Performance",
    "category": "gaming",
    "price": 24990000,
    "image": "pc-gaming-02.svg",
    "specs": {
      "CPU": "Intel Core i5-13400F",
      "Mainboard": "B760 DDR4",
      "RAM": "16GB DDR4",
      "VGA": "RTX 4060 8GB",
      "SSD": "SSD 1TB",
      "PSU": "650W",
      "Case": "Mid Tower minh họa"
    },
    "description": "Cấu hình minh họa dùng trong đồ án. Thông số và giá không phải báo giá thương mại."
  },
  {
    "id": 3,
    "name": "Group 8 Office Mini",
    "category": "office",
    "price": 8990000,
    "image": "pc-van-phong-01.svg",
    "specs": {
      "CPU": "Intel Core i3-12100",
      "Mainboard": "H610 DDR4",
      "RAM": "8GB DDR4",
      "VGA": "Intel UHD",
      "SSD": "SSD 256GB",
      "PSU": "400W",
      "Case": "Mid Tower minh họa"
    },
    "description": "Cấu hình minh họa dùng trong đồ án. Thông số và giá không phải báo giá thương mại."
  },
  {
    "id": 4,
    "name": "Group 8 Office Plus",
    "category": "office",
    "price": 11990000,
    "image": "pc-van-phong-02.svg",
    "specs": {
      "CPU": "Intel Core i5-12400",
      "Mainboard": "B660 DDR4",
      "RAM": "16GB DDR4",
      "VGA": "Intel UHD",
      "SSD": "SSD 500GB",
      "PSU": "450W",
      "Case": "Mid Tower minh họa"
    },
    "description": "Cấu hình minh họa dùng trong đồ án. Thông số và giá không phải báo giá thương mại."
  },
  {
    "id": 5,
    "name": "Group 8 Creator C1",
    "category": "creator",
    "price": 28990000,
    "image": "pc-do-hoa-01.svg",
    "specs": {
      "CPU": "AMD Ryzen 7 7700",
      "Mainboard": "B650",
      "RAM": "32GB DDR5",
      "VGA": "RTX 4060 8GB",
      "SSD": "SSD 1TB",
      "PSU": "750W",
      "Case": "Mid Tower minh họa"
    },
    "description": "Cấu hình minh họa dùng trong đồ án. Thông số và giá không phải báo giá thương mại."
  },
  {
    "id": 6,
    "name": "Group 8 Creator Pro",
    "category": "creator",
    "price": 42990000,
    "image": "pc-do-hoa-02.svg",
    "specs": {
      "CPU": "Intel Core i7-14700F",
      "Mainboard": "B760 DDR5",
      "RAM": "32GB DDR5",
      "VGA": "RTX 4070 12GB",
      "SSD": "SSD 2TB",
      "PSU": "850W",
      "Case": "Mid Tower minh họa"
    },
    "description": "Cấu hình minh họa dùng trong đồ án. Thông số và giá không phải báo giá thương mại."
  },
  {
    "id": 7,
    "name": "Group 8 Stream One",
    "category": "streaming",
    "price": 31990000,
    "image": "pc-phat-truc-tiep-01.svg",
    "specs": {
      "CPU": "AMD Ryzen 7 7700",
      "Mainboard": "B650",
      "RAM": "32GB DDR5",
      "VGA": "RTX 4060 Ti 8GB",
      "SSD": "SSD 1TB",
      "PSU": "750W",
      "Case": "Mid Tower minh họa"
    },
    "description": "Cấu hình minh họa dùng trong đồ án. Thông số và giá không phải báo giá thương mại."
  },
  {
    "id": 8,
    "name": "RAM 16GB DDR4 minh họa",
    "category": "component",
    "price": 890000,
    "image": "ram-mau.svg",
    "specs": {
      "Loại": "DDR4",
      "Dung lượng": "16GB",
      "Tốc độ": "3200 MT/s"
    },
    "description": "Linh kiện mẫu để thực hành lọc sản phẩm theo danh mục."
  }
];
// Mảng tin mẫu: lưu loại tin, ngày và từng đoạn nội dung.
const defaultNews = [
  {
    "id": 1,
    "category": "guide",
    "title": "Bắt đầu chọn PC từ nhu cầu sử dụng",
    "date": "2026-09-12",
    "image": "tin-chon-may-tinh.svg",
    "excerpt": "Học tập, làm việc hay sáng tạo? Một danh sách nhu cầu giúp việc chọn máy rõ ràng hơn.",
    "sections": [
      [
        "Liệt kê công việc thường làm",
        "Trước khi nhìn tên cấu hình, hãy ghi lại các tác vụ: soạn tài liệu, học lập trình, thiết kế hay chơi game. Đây là cách để xác định mục tiêu mua máy thay vì chỉ so sánh giá."
      ],
      [
        "Đặt giới hạn ngân sách",
        "Chia ngân sách dự kiến cho thùng máy và các thiết bị đi kèm như màn hình, bàn phím, chuột. Trong bản demo này, giá sản phẩm chỉ là dữ liệu mẫu để thực hành so sánh."
      ],
      [
        "Đọc thông số trước khi thêm giỏ",
        "Trang chi tiết trình bày CPU, mainboard, RAM, VGA, SSD, nguồn và vỏ máy. Hãy sử dụng bảng đó để ghi lại những điểm cần tìm hiểu thêm."
      ]
    ]
  },
  {
    "id": 2,
    "category": "technology",
    "title": "Đọc bảng cấu hình trên Group 8\'s PC sales website",
    "date": "2026-09-11",
    "image": "tin-cau-hinh.svg",
    "excerpt": "Làm quen với cách trình bày thông số và so sánh các sản phẩm trong đồ án.",
    "sections": [
      [
        "Bảng thông số chung",
        "Mỗi PC trên website sử dụng cùng một cấu trúc dữ liệu. Nhờ đó người xem có thể tìm các mục CPU, RAM và SSD tại cùng vị trí."
      ],
      [
        "Không chỉ nhìn tên sản phẩm",
        "Tên Gaming hay Creator là cách phân loại nhu cầu trong bài tập. Khi xem cấu hình thật, cần kiểm tra tài liệu nhà sản xuất và khả năng đáp ứng phần mềm sử dụng."
      ],
      [
        "Thực hành so sánh",
        "Mở hai trang sản phẩm và lập bảng khác biệt về RAM, ổ lưu trữ và giá. Bài tập giúp rèn kỹ năng đọc dữ liệu trước khi đưa ra lựa chọn."
      ]
    ]
  },
  {
    "id": 3,
    "category": "website",
    "title": "Khám phá luồng mua hàng mô phỏng",
    "date": "2026-09-10",
    "image": "tin-mua-hang.svg",
    "excerpt": "Từ card sản phẩm đến mã đơn mẫu: hiểu cách các trang liên kết với nhau.",
    "sections": [
      [
        "Chọn sản phẩm",
        "Dùng bộ lọc ở trang danh sách rồi mở trang chi tiết. Nhấn thêm vào giỏ để lưu sản phẩm vào trình duyệt."
      ],
      [
        "Kiểm tra giỏ hàng",
        "Tăng, giảm hoặc xóa sản phẩm. Thành tiền được tính từ giá mẫu nhân với số lượng; tổng giỏ là tổng các dòng sản phẩm."
      ],
      [
        "Xác nhận đơn mẫu",
        "Nhập dữ liệu thử nghiệm ở trang checkout. Khi xác nhận, website hiển thị mã đơn mẫu và xóa giỏ. Không có thông tin nào được gửi đến cửa hàng hay ngân hàng."
      ]
    ]
  }
];
// Ánh xạ mã loại sản phẩm sang tên hiển thị.
const categoryNames = { gaming: "PC Gaming", office: "PC Văn phòng", creator: "PC Đồ họa", streaming: "PC Streaming", component: "Linh kiện" };

// Ánh xạ mã loại tin sang tên hiển thị.
const newsCategoryNames = {guide:"Hướng dẫn", technology:"Công nghệ", website:"Trải nghiệm website"};

// Khởi tạo lần đầu; dữ liệu sai cấu trúc được phục hồi từ mảng mẫu.
// Đọc danh mục đã lưu; khởi tạo hoặc phục hồi mảng mẫu khi dữ liệu không hợp lệ.
function loadCatalog(key, defaults, isValid) {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (Array.isArray(saved) && saved.length > 0 &&
        saved.every(isValid) && new Set(saved.map(x => x.id)).size === saved.length) {
      return saved;
    }
    localStorage.setItem(key, JSON.stringify(defaults));
  } catch (error) {
    // Vẫn hiển thị mảng mẫu khi trình duyệt chặn LocalStorage.
  }
  return defaults;
}
// Kiểm tra cấu trúc một sản phẩm trước khi dùng dữ liệu từ LocalStorage.
function validProduct(p) {
  return p && Number.isInteger(p.id) && p.id > 0 &&
    typeof p.name === "string" && typeof p.description === "string" &&
    Object.hasOwn(categoryNames,p.category) && Number.isFinite(p.price) && p.price >= 0 &&
    defaultProducts.some(x => x.image === p.image) &&
    p.specs && !Array.isArray(p.specs) && typeof p.specs === "object" &&
    Object.values(p.specs).every(x => typeof x === "string");
}
// Kiểm tra cấu trúc một tin trước khi hiển thị.
function validNews(n) {
  return n && Number.isInteger(n.id) && n.id > 0 &&
    typeof n.title === "string" && typeof n.excerpt === "string" &&
    Object.hasOwn(newsCategoryNames,n.category) &&
    typeof n.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(n.date) &&
    defaultNews.some(x => x.image === n.image) &&
    Array.isArray(n.sections) && n.sections.every(s =>
      Array.isArray(s) && s.length === 2 && s.every(x => typeof x === "string"));
}
// Danh sách sản phẩm lấy từ bộ nhớ hoặc mảng mẫu.
const products = loadCatalog("sanPham", defaultProducts, validProduct);
// Danh sách tin lấy từ bộ nhớ hoặc mảng mẫu.
const news = loadCatalog("tinTuc", defaultNews, validNews);
