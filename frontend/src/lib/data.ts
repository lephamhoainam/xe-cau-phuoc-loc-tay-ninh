import type {
  About,
  ContactItem,
  HeroCard,
  Images,
  NewsItem,
  Service,
  Vehicle,
} from "./types";

// ====== LINK ẢNH: dán link Unsplash vào các chỗ "" bên dưới ======
// Để trống "" thì web hiện khung "Chưa có ảnh".
// Nên dùng link dạng: https://images.unsplash.com/photo-xxxx?auto=format&fit=crop&w=1200&q=80
export const images: Images = {
  hero: "",
  about: "",
  contact: "",
};

export const heroCard: HeroCard = {
  label: "Tải trọng xe cẩu",
  value: "5 – 100 tấn",
  note: "Điều xe nhanh tại Tây Ninh và các tỉnh lân cận.",
};

export const heroTrust: string[] = [
  "Báo giá rõ ràng, không phát sinh",
  "Operator nhiều năm kinh nghiệm",
];

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

export const services: Service[] = [
  { title: "Cho thuê xe cẩu", desc: "Thuê theo giờ, ca, ngày hoặc tháng, tải trọng 5 – 100 tấn.", image: "" },
  { title: "Cẩu lắp máy móc", desc: "Hạ và lắp đặt máy móc, thiết bị nhà xưởng chính xác, an toàn.", image: "" },
  { title: "Cẩu kết cấu thép", desc: "Dựng khung thép, cột điện, trạm biến áp, cấu kiện bê tông.", image: "" },
  { title: "Vận chuyển kèm cẩu", desc: "Chở và cẩu hàng nặng trọn gói, không cần thuê nhiều đơn vị.", image: "" },
];

export const vehicles: Vehicle[] = [
  { range: "5 – 10 tấn", use: "Máy móc nhỏ, vật tư, biển quảng cáo, hạ cây.", image: "" },
  { range: "15 – 25 tấn", use: "Nhà xưởng, kết cấu thép, thiết bị công nghiệp.", image: "" },
  { range: "30 – 50 tấn", use: "Cấu kiện bê tông, cột điện, thiết bị nặng.", image: "" },
  { range: "60 – 100 tấn", use: "Dự án lớn, nhà máy, máy móc siêu trọng.", image: "" },
];

export const news: NewsItem[] = [
  { title: "Cách chọn xe cẩu đúng tải trọng cho công trình", excerpt: "Chọn thiếu tải gây nguy hiểm, chọn thừa tải gây tốn kém. Đây là cách tính nhanh.", date: "01/10/2026", image: "", href: "/tin-tuc" },
  { title: "Cần chuẩn bị gì trước khi xe cẩu đến công trình", excerpt: "Mặt bằng, nền đất, đường vào và những lưu ý để buổi cẩu diễn ra suôn sẻ.", date: "25/09/2026", image: "", href: "/tin-tuc" },
  { title: "Quy tắc an toàn khi cẩu hàng nặng", excerpt: "Những nguyên tắc bắt buộc để bảo vệ người, hàng hóa và thiết bị.", date: "15/09/2026", image: "", href: "/tin-tuc" },
];

export const contactInfo: ContactItem[] = [
  { label: "Địa chỉ", value: "Tây Ninh (cập nhật địa chỉ thật)" },
  { label: "Giờ làm việc", value: "Phục vụ 24/7" },
  { label: "Khu vực", value: "Tây Ninh, TP.HCM, Bình Dương, Long An" },
];