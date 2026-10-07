// =====================================================================
// DỮ LIỆU MẪU (MOCK DATA) CỦA WEBSITE
// ---------------------------------------------------------------------
// - Mọi nội dung chữ và link ảnh đều nằm trong file này.
// - Kiểu dữ liệu (type) khai báo ở ./types.ts.
// - Sau này có backend (be) thì thay bằng dữ liệu gọi từ API,
//   giữ nguyên kiểu để các trang không phải sửa.
// =====================================================================

import { Truck, Factory, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
  VehicleTier,
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
export const heroTrust = [
  "Báo giá rõ ràng, không phát sinh",
  "Nhiều năm kinh nghiệm vận hành",
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
  {
    slug: "cho-thue-xe-cau",
    title: "Cho thuê xe cẩu",
    desc: "Thuê theo giờ, ca, ngày hoặc tháng, tải trọng 5 – 100 tấn.",
    image: "",
    capacity: "5 – 100 tấn",
    points: [
      "Thuê linh hoạt theo giờ, ca, ngày, tháng",
      "Tư vấn đúng tải trọng cần thuê",
      "Báo giá rõ ràng trước khi triển khai",
    ],
  },
  {
    slug: "cau-lap-may-moc",
    title: "Cẩu lắp máy móc",
    desc: "Hạ và lắp đặt máy móc, thiết bị nhà xưởng chính xác, an toàn.",
    image: "",
    points: [
      "Khảo sát mặt bằng và đường vào trước khi cẩu",
      "Đặt máy đúng vị trí, hạn chế va chạm",
      "Phù hợp cả mặt bằng chật hẹp",
    ],
  },
  {
    slug: "cau-ket-cau-thep",
    title: "Cẩu kết cấu thép",
    desc: "Dựng khung thép, cột điện, trạm biến áp, cấu kiện bê tông.",
    image: "",
    points: [
      "Dựng khung thép, cột điện, trạm biến áp",
      "Cẩu cấu kiện bê tông đúc sẵn",
      "Thi công theo quy tắc an toàn lao động",
    ],
  },
  {
    slug: "van-chuyen-kem-cau",
    title: "Vận chuyển kèm cẩu",
    desc: "Chở và cẩu hàng nặng trọn gói, không cần thuê nhiều đơn vị.",
    image: "",
    points: [
      "Một đầu mối cho cả vận chuyển và cẩu",
      "Tiết kiệm thời gian phối hợp",
      "Giao hàng thẳng đến vị trí thi công",
    ],
  },
];

// Các nhóm xe theo tải trọng (hiển thị dạng 3 card ở trang chủ)
export const vehicleTiers: VehicleTier[] = [
  {
    range: "5 – 25 tấn",
    title: "Xe cẩu 5 – 25 tấn: linh hoạt cho việc nhỏ và vừa",
    desc: "Từ máy móc nhỏ, vật tư, biển quảng cáo, hạ cây đến công việc trong nhà xưởng và lắp kết cấu thép.",
    icon: Truck,
    details: [
      "Xe 5 – 10 tấn: máy móc nhỏ, vật tư, biển quảng cáo, hạ cây. Nhỏ gọn, dễ vào hẻm và mặt bằng chật.",
      "Xe 15 – 25 tấn: nhà xưởng, kết cấu thép, thiết bị công nghiệp. Sức nâng và tầm với lớn hơn.",
      "Lưu ý: tầm với càng xa thì sức nâng càng giảm, hãy cho chúng tôi biết trọng lượng vật cẩu và khoảng cách từ xe đến vị trí đặt.",
    ],
  },
  {
    range: "30 – 50 tấn",
    title: "Xe cẩu 30 – 50 tấn: cho cấu kiện và thiết bị nặng",
    desc: "Cẩu cấu kiện bê tông, cột điện và thiết bị nặng cho công trình, nhà máy.",
    icon: Factory,
    details: [
      "Công việc thường gặp: cấu kiện bê tông, cột điện, thiết bị nặng.",
      "Mặt bằng: cần chỗ đặt chân chống phẳng và đủ chắc; nền đất yếu nên trải thêm tấm lót để tránh lún.",
      "Khảo sát trước: vị trí đặt xe, đường vào và đường dây điện trên cao, đặc biệt khi cẩu cột điện.",
      "Báo giá theo trọng lượng, tầm với và thời gian thi công thực tế.",
    ],
  },
  {
    range: "60 – 100 tấn",
    title: "Xe cẩu 60 – 100 tấn: cho dự án lớn và máy móc siêu trọng",
    desc: "Dành cho dự án lớn, nhà máy và máy móc siêu trọng cần sức nâng, tầm với lớn.",
    icon: Building2,
    details: [
      "Công việc thường gặp: dự án lớn, nhà máy, máy móc siêu trọng.",
      "Chuẩn bị: nên báo trước để chuẩn bị xe, phụ kiện; xe lớn cần đường vào và mặt bằng rộng.",
      "An toàn: khảo sát hiện trường và thống nhất phương án nâng trước khi thi công.",
      "Báo giá theo trọng lượng, độ cao, tầm với và thời gian thi công thực tế.",
    ],
  },
];

// Tin tức mới nhất (href là đường dẫn khi bấm vào bài)
export const news: NewsItem[] = [
  {
    id: 1,
    title: "Cách chọn xe cẩu đúng tải trọng cho công trình",
    excerpt: "Chọn thiếu tải gây nguy hiểm, chọn thừa tải gây tốn kém. Đây là cách tính nhanh.",
    date: "01/10/2026",
    image: "",
    href: "/tin-tuc",
    tag: "Kinh nghiệm",
  },
  {
    id: 2,
    title: "Cần chuẩn bị gì trước khi xe cẩu đến công trình",
    excerpt: "Mặt bằng, nền đất, đường vào và những lưu ý để buổi cẩu diễn ra suôn sẻ.",
    date: "25/09/2026",
    image: "",
    href: "/tin-tuc",
    tag: "Cẩm nang",
  },
  {
    id: 3,
    title: "Quy tắc an toàn khi cẩu hàng nặng",
    excerpt: "Những nguyên tắc bắt buộc để bảo vệ người, hàng hóa và thiết bị.",
    date: "15/09/2026",
    image: "",
    href: "/tin-tuc",
    tag: "An toàn",
  },
  {
    id: 4,
    title: "Quy tắc an toàn khi cẩu hàng nặng",
    excerpt: "Những nguyên tắc bắt buộc để bảo vệ người, hàng hóa và thiết bị.",
    date: "15/09/2026",
    image: "",
    href: "/tin-tuc",
    tag: "An toàn",
  },
  {
    id: 5,
    title: "Quy tắc an toàn khi cẩu hàng nặng",
    excerpt: "Những nguyên tắc bắt buộc để bảo vệ người, hàng hóa và thiết bị.",
    date: "15/09/2026",
    image: "",
    href: "/tin-tuc",
    tag: "An toàn",
  },
];

// Thông tin liên hệ hiển thị ở phần Liên hệ của trang chủ
export const contactInfo: ContactItem[] = [
  { label: "Địa chỉ", value: "Tây Ninh (cập nhật địa chỉ thật)" },
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