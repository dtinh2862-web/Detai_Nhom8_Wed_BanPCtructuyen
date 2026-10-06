// Dữ liệu minh họa; không phải giá bán thực tế. File này không xử lý DOM.
// Mảng sản phẩm mẫu: id duy nhất, giá là số để tính tiền.
const defaultProducts = [{
    "id": 1,
    "name": "G8-PC G1 Starter",
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
        "Case": "Mid Tower"
    },
    "description": "PC gọn gàng cho góc chơi game và các tác vụ hằng ngày với Ryzen 5, RAM 16GB và SSD 500GB."
}, {
    "id": 2,
    "name": "G8-PC G2 Performance",
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
        "Case": "Mid Tower"
    },
    "description": "Kết hợp Core i5 và RTX 4060, RAM 16GB cùng SSD 1TB cho góc máy gaming đa dụng."
}, {
    "id": 3,
    "name": "G8-PC Office Mini",
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
        "Case": "Mid Tower"
    },
    "description": "Cấu hình Core i3, RAM 8GB và SSD 256GB cho soạn thảo, bảng tính và công việc văn phòng."
}, {
    "id": 4,
    "name": "G8-PC Office Plus",
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
        "Case": "Mid Tower"
    },
    "description": "Bộ máy Core i5 cùng RAM 16GB và SSD 500GB dành cho công việc văn phòng và nhiều ứng dụng đồng thời."
}, {
    "id": 5,
    "name": "G8-PC Creator C1",
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
        "Case": "Mid Tower"
    },
    "description": "Ryzen 7, RAM 32GB DDR5 và đồ họa RTX 4060 dành cho góc làm việc sáng tạo."
}, {
    "id": 6,
    "name": "G8-PC Creator Pro",
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
        "Case": "Mid Tower"
    },
    "description": "Core i7, RAM 32GB và SSD 2TB kết hợp RTX 4070, mở rộng không gian cho dự án và nội dung sáng tạo."
}, {
    "id": 7,
    "name": "G8-PC Stream One",
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
        "Case": "Mid Tower"
    },
    "description": "Bộ máy Ryzen 7, RTX 4060 Ti và RAM 32GB dành cho góc chơi game và phát trực tiếp."
}, {
    "id": 8,
    "name": "RAM 16GB DDR4",
    "category": "component",
    "price": 890000,
    "image": "ram-ddr4.svg",
    "specs": {
        "Loại": "DDR4",
        "Dung lượng": "16GB",
        "Tốc độ": "3200 MT/s"
    },
    "description": "Bộ nhớ DDR4 16GB, tốc độ 3200 MT/s. Kiểm tra chuẩn RAM và khe cắm bo mạch chủ trước khi nâng cấp."
}];
// Mảng tin mẫu: lưu loại tin, ngày và từng đoạn nội dung.
const defaultNews = [{
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
            "Chia ngân sách dự kiến cho thùng máy và các thiết bị đi kèm như màn hình, bàn phím, chuột. Ưu tiên linh kiện phục vụ công việc chính trước khi bổ sung phụ kiện."
        ],
        [
            "Đọc thông số trước khi thêm giỏ",
            "Trang chi tiết trình bày CPU, mainboard, RAM, VGA, SSD, nguồn và vỏ máy. Hãy sử dụng bảng đó để ghi lại những điểm cần tìm hiểu thêm."
        ]
    ]
}, {
    "id": 2,
    "category": "technology",
    "title": "Đọc bảng cấu hình trên G8-PC",
    "date": "2026-09-11",
    "image": "tin-cau-hinh.svg",
    "excerpt": "Tìm hiểu các mục CPU, RAM, đồ họa và lưu trữ trước khi chọn cấu hình.",
    "sections": [
        [
            "Bảng thông số chung",
            "Mỗi PC trên website sử dụng cùng một cấu trúc dữ liệu. Nhờ đó người xem có thể tìm các mục CPU, RAM và SSD tại cùng vị trí."
        ],
        [
            "Không chỉ nhìn tên sản phẩm",
            "Tên Gaming hay Creator gợi ý nhu cầu sử dụng. Hãy đối chiếu từng linh kiện với yêu cầu của phần mềm và trò chơi bạn thường dùng."
        ],
        [
            "So sánh các lựa chọn",
            "Mở hai trang sản phẩm và lập bảng khác biệt về RAM, ổ lưu trữ và giá. Chú ý cả nhu cầu hiện tại và kế hoạch nâng cấp trước khi đưa ra lựa chọn."
        ]
    ]
}, {
    "id": 3,
    "category": "website",
    "title": "Hướng dẫn đặt PC tại G8-PC",
    "date": "2026-09-10",
    "image": "tin-mua-hang.svg",
    "excerpt": "Chọn cấu hình, kiểm tra giỏ hàng và hoàn tất thông tin nhận hàng.",
    "sections": [
        [
            "Chọn sản phẩm",
            "Dùng bộ lọc ở trang danh sách rồi mở trang chi tiết. Đăng nhập và nhấn Thêm vào giỏ để tiếp tục lựa chọn."
        ],
        [
            "Kiểm tra giỏ hàng",
            "Tăng, giảm hoặc xóa sản phẩm. Thành tiền được tính từ giá sản phẩm nhân với số lượng; tổng giỏ là tổng các dòng sản phẩm."
        ],
        [
            "Xác nhận đơn hàng",
            "Điền thông tin nhận hàng, nhập mã ưu đãi nếu có và kiểm tra tổng tiền trước khi xác nhận. Bạn có thể xem lại mã đơn và danh sách sản phẩm trong mục Tài khoản."
        ]
    ]
}];
// Ánh xạ mã loại sản phẩm sang tên hiển thị.
const categoryNames = {
    gaming: "PC Gaming",
    office: "PC Văn phòng",
    creator: "PC Đồ họa",
    streaming: "PC Streaming",
    component: "Linh kiện"
};

// Ánh xạ mã loại tin sang tên hiển thị.
const newsCategoryNames = {
    guide: "Hướng dẫn",
    technology: "Công nghệ",
    website: "Trải nghiệm website"
};

// Danh mục chỉ đọc: sửa sản phẩm/bài viết ngay trong tệp này, không cần xử lý cache.
const products = defaultProducts;
const news = defaultNews;

// Bảng mã hợp lệ: khóa là mã ưu đãi, giá trị là phần trăm được giảm.
const VALID_COUPONS = {
    TECH10: 10,
    SALE20: 20,
    NEW15: 15
};
const DANH_SACH_UU_DAI = [{
    code: "TECH10",
    title: "Khởi động cùng G8-PC",
    percent: 10
}, {
    code: "SALE20",
    title: "Tuần lễ PC",
    percent: 20
}, {
    code: "NEW15",
    title: "Góc máy mới",
    percent: 15
}];
