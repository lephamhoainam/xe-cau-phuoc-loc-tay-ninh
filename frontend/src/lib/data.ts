// =====================================================================
// DỮ LIỆU MẪU (MOCK DATA) CỦA WEBSITE
// ---------------------------------------------------------------------
// - Mọi nội dung chữ và link ảnh đều nằm trong file này.
// - Kiểu dữ liệu (type) khai báo ở ./types.ts.
// - Sau này có backend (be) thì thay bằng dữ liệu gọi từ API,
//   giữ nguyên kiểu để các trang không phải sửa.
// =====================================================================

import type {
  About,
  AboutCompany,
  Business,
  ContactItem,
  Cta,
  HeroCard,
  Images,
  NewsItem,
  PageInfo,
  PageKey,
  Reason,
  Service,
  Step,
  Vehicle,
} from "./types";

// =====================================================================
// 1. ẢNH CHUNG
// Dán link Unsplash vào các chỗ "" bên dưới.
// Để trống "" thì web hiện khung "Chưa có ảnh".
// Nên dùng link dạng:
// https://images.unsplash.com/photo-xxxx?auto=format&fit=crop&w=1200&q=80
// =====================================================================
export const images: Images = {
  hero: "", // Ảnh lớn ở banner trang chủ
  about: "", // Ảnh phần giới thiệu ở trang chủ
  contact: "", // Ảnh phần liên hệ ở trang chủ
};

// =====================================================================
// 2. THÔNG TIN CÁC TRANG DÙNG CHUNG (tiêu đề, phụ đề, breadcrumb)
// Breadcrumb tự thêm "Trang chủ" ở đầu, nên ở đây chỉ khai báo
// từ trang hiện tại trở đi.
// Dùng: <PageBanner page={pages.gioiThieu} />
// =====================================================================
export const pages: Record<PageKey, PageInfo> = {
  gioiThieu: {
    title: "Giới thiệu",
    subtitle: "Đơn vị cho thuê xe cẩu uy tín tại Tây Ninh, tải trọng 5 – 100 tấn.",
    breadcrumb: [{ label: "Giới thiệu" }],
  },
  dichVu: {
    title: "Dịch vụ",
    subtitle: "Giải pháp cẩu hàng cho nhà xưởng, công trình và dự án.",
    breadcrumb: [{ label: "Dịch vụ" }],
  },
  tinTuc: {
    title: "Tin tức",
    subtitle: "Kinh nghiệm, cẩm nang và cập nhật từ chúng tôi.",
    breadcrumb: [{ label: "Tin tức" }],
  },
  lienHe: {
    title: "Liên hệ",
    subtitle: "Gọi ngay để được tư vấn và báo giá nhanh nhất.",
    breadcrumb: [{ label: "Liên hệ" }],
  },
  timKiem: {
    title: "Tìm kiếm",
    subtitle: "Kết quả tìm kiếm xe cẩu và dịch vụ.",
    breadcrumb: [{ label: "Tìm kiếm" }],
  },
};

// =====================================================================
// 3. TRANG CHỦ
// =====================================================================

// Thẻ số liệu nổi bên cạnh ảnh ở banner
export const heroCard: HeroCard = {
  label: "Tải trọng xe cẩu",
  value: "5 – 100 tấn",
  note: "Điều xe nhanh tại Tây Ninh và các tỉnh lân cận.",
};

// Các dòng cam kết ngắn dưới nút ở banner
export const heroTrust: string[] = [
  "Báo giá rõ ràng, không phát sinh",
  "Operator nhiều năm kinh nghiệm",
];

// Phần giới thiệu ngắn ở trang chủ (số liệu 10+, 500+ chỉ là MẪU, thay số thật)
export const about: About = {
  paragraphs: [
    "Chúng tôi chuyên cho thuê xe cẩu phục vụ nhà xưởng, công trình xây dựng, lắp đặt máy móc và vận chuyển hàng nặng tại Tây Ninh.",
    "Đội xe đa dạng tải trọng, tài xế và operator có tay nghề, luôn đặt an toàn và đúng hẹn lên hàng đầu.",
  ],
  stats: [
    { value: "10+", label: "Năm kinh nghiệm" },
    { value: "500+", label: "Công trình" },
    { value: "24/7", label: "Sẵn sàng phục vụ" },
  ],
};

// Danh sách dịch vụ hiển thị ở trang chủ
export const services: Service[] = [
  { title: "Cho thuê xe cẩu", desc: "Thuê theo giờ, ca, ngày hoặc tháng, tải trọng 5 – 100 tấn.", image: "" },
  { title: "Cẩu lắp máy móc", desc: "Hạ và lắp đặt máy móc, thiết bị nhà xưởng chính xác, an toàn.", image: "" },
  { title: "Cẩu kết cấu thép", desc: "Dựng khung thép, cột điện, trạm biến áp, cấu kiện bê tông.", image: "" },
  { title: "Vận chuyển kèm cẩu", desc: "Chở và cẩu hàng nặng trọn gói, không cần thuê nhiều đơn vị.", image: "" },
];

// Các loại xe theo tải trọng
export const vehicles: Vehicle[] = [
  { range: "5 – 10 tấn", use: "Máy móc nhỏ, vật tư, biển quảng cáo, hạ cây.", image: "" },
  { range: "15 – 25 tấn", use: "Nhà xưởng, kết cấu thép, thiết bị công nghiệp.", image: "" },
  { range: "30 – 50 tấn", use: "Cấu kiện bê tông, cột điện, thiết bị nặng.", image: "" },
  { range: "60 – 100 tấn", use: "Dự án lớn, nhà máy, máy móc siêu trọng.", image: "" },
];

// Tin tức mới nhất (href là đường dẫn khi bấm vào bài)
export const news: NewsItem[] = [
  {
    title: "Cách chọn xe cẩu đúng tải trọng cho công trình",
    excerpt: "Chọn thiếu tải gây nguy hiểm, chọn thừa tải gây tốn kém. Đây là cách tính nhanh.",
    date: "01/10/2026",
    image: "",
    href: "/tin-tuc",
  },
  {
    title: "Cần chuẩn bị gì trước khi xe cẩu đến công trình",
    excerpt: "Mặt bằng, nền đất, đường vào và những lưu ý để buổi cẩu diễn ra suôn sẻ.",
    date: "25/09/2026",
    image: "",
    href: "/tin-tuc",
  },
  {
    title: "Quy tắc an toàn khi cẩu hàng nặng",
    excerpt: "Những nguyên tắc bắt buộc để bảo vệ người, hàng hóa và thiết bị.",
    date: "15/09/2026",
    image: "",
    href: "/tin-tuc",
  },
];

// Thông tin liên hệ hiển thị ở phần Liên hệ của trang chủ
export const contactInfo: ContactItem[] = [
  { label: "Địa chỉ", value: "Tây Ninh (cập nhật địa chỉ thật)" },
  { label: "Giờ làm việc", value: "Phục vụ 24/7" },
  { label: "Khu vực", value: "Tây Ninh, TP.HCM, Bình Dương, Long An" },
];

// =====================================================================
// 4. TRANG GIỚI THIỆU (/gioi-thieu)
// =====================================================================

// Section 2: Giới thiệu công ty
export const aboutCompany: AboutCompany = {
  image: "", // Ảnh bên trái của section
  paragraphs: [
    "Chúng tôi chuyên cung cấp dịch vụ cho thuê xe cẩu phục vụ nhà xưởng, công trình xây dựng, lắp đặt máy móc và vận chuyển hàng nặng tại Tây Ninh và các tỉnh lân cận.",
    "Với đội xe đa dạng tải trọng từ 5 đến 100 tấn cùng đội ngũ operator giàu kinh nghiệm, chúng tôi luôn đặt an toàn, đúng hẹn và minh bạch chi phí lên hàng đầu.",
  ],
  // Các gạch đầu dòng điểm nổi bật
  highlights: [
    "Đội xe đa dạng, bảo dưỡng định kỳ",
    "Operator có chứng chỉ, nhiều năm kinh nghiệm",
    "Báo giá rõ ràng trước khi thi công",
  ],
  // Số liệu MẪU, thay bằng số thật
  stats: [
    { value: "10+", label: "Năm kinh nghiệm" },
    { value: "500+", label: "Công trình" },
    { value: "24/7", label: "Sẵn sàng phục vụ" },
  ],
};

// Section 3: Ngành nghề kinh doanh chính
export const businesses: Business[] = [
  { title: "Cho thuê xe cẩu", desc: "Thuê theo giờ, ca, ngày hoặc tháng với tải trọng từ 5 đến 100 tấn.", image: "" },
  { title: "Cẩu lắp máy móc", desc: "Hạ và lắp đặt máy móc, thiết bị nhà xưởng chính xác, an toàn.", image: "" },
  { title: "Cẩu kết cấu thép", desc: "Dựng khung thép, cột điện, trạm biến áp, cấu kiện bê tông.", image: "" },
  { title: "Vận chuyển hàng nặng", desc: "Chở và cẩu hàng nặng trọn gói, không cần thuê nhiều đơn vị.", image: "" },
];

// Section 4: Tại sao chọn chúng tôi
export const reasons: Reason[] = [
  { title: "Đủ tải trọng", desc: "Từ 5 tấn đến 100 tấn, chọn đúng xe cho từng công trình." },
  { title: "Điều xe nhanh", desc: "Có mặt đúng giờ, hỗ trợ cả ban đêm và ngày lễ." },
  { title: "Tay nghề cao", desc: "Operator nhiều năm kinh nghiệm, vận hành an toàn." },
  { title: "Giá rõ ràng", desc: "Báo giá trước, không phát sinh chi phí ngoài thỏa thuận." },
  { title: "Thiết bị đảm bảo", desc: "Xe được bảo dưỡng và kiểm định định kỳ." },
  { title: "Hỗ trợ tận tâm", desc: "Tư vấn phương án cẩu phù hợp ngay từ cuộc gọi đầu tiên." },
];

// Section 5: Quy trình làm việc (4 bước)
export const workSteps: Step[] = [
  { title: "Tiếp nhận", desc: "Nhận thông tin tải trọng, địa điểm, thời gian." },
  { title: "Khảo sát và báo giá", desc: "Tư vấn xe phù hợp và gửi báo giá rõ ràng." },
  { title: "Điều xe", desc: "Xe và operator có mặt tại công trình đúng hẹn." },
  { title: "Thi công và nghiệm thu", desc: "Cẩu an toàn, nghiệm thu và thanh toán." },
];

// Section 6: Kêu gọi liên hệ ở cuối trang
export const aboutCta: Cta = {
  title: "Cần thuê xe cẩu? Liên hệ ngay để được tư vấn",
  desc: "Cho chúng tôi biết tải trọng, địa điểm và thời gian, chúng tôi phản hồi nhanh nhất có thể.",
};