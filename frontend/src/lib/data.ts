// =====================================================================
// DỮ LIỆU MẪU (MOCK DATA) CỦA WEBSITE
// ---------------------------------------------------------------------
// - Mọi nội dung chữ nằm trong file này.
// - TOÀN BỘ ẢNH nằm ở object GALLERY ngay bên dưới (đầu file).
//   Muốn thêm hay đổi ảnh thì chỉ sửa ở GALLERY, không cần sửa chỗ khác.
// - Kiểu dữ liệu (type) khai báo ở ./types.ts.
// - Sau này có backend (be) thì thay bằng dữ liệu gọi từ API,
//   giữ nguyên kiểu để các trang không phải sửa.
// =====================================================================

import { Truck, Factory, Building2 } from "lucide-react";
import { site } from "./site";
import { gallery, cover } from "./gallery";

import type {
  About,
  AboutCompany,
  Business,
  ContactItem,
  Cta,
  HeroCard,
  Images,
  NewsItem,
  NewsDetail,
  GuideItem,
  PageInfo,
  PageKey,
  Reason,
  Service,
  Step,
  VehicleTier,
  FaqItem,
  ContactIntro,
  ContactDetail,
} from "./types";

// =====================================================================
// 0. TOÀN BỘ ẢNH (CHỈ SỬA Ở ĐÂY)
// Muốn thêm ảnh cho khối nào: thêm 1 dòng tên file vào mảng của khối đó.
// Muốn alt riêng cho 1 ảnh: { file: "ten.jpg", alt: "mô tả riêng" }
// Mảng rỗng [] thì web hiện "Chưa có ảnh". Ảnh để trong public/assets.
// =====================================================================
export const GALLERY = {
  // ---- Trang chủ ----
  hero: gallery("Đội xe cẩu 5 – 100 tấn tại Tây Ninh", [
    "he-thong-xe-tai-5-tan-100-tan.jpg",
  ]),
  about: gallery("Vận chuyển hàng nặng kèm cẩu tại Tây Ninh", [
    "van-chuyen-hang-kem-cau.jpg",
  ]),
  contact: gallery("Liên hệ thuê xe cẩu tại Tây Ninh", []),

  // ---- Dịch vụ ----
  serviceChoThueXeCau: gallery("Dịch vụ cho thuê xe cẩu tại Tây Ninh", [
    "gioi-thieu-cong-ty-phuoc-loc.jpg",
    "cho-thue-xe-cau.jpg",
  ]),
  serviceCauLapMayMoc: gallery("Cẩu lắp đặt máy móc nhà xưởng", [
    "cau-lap-may-moc-nha-xuong.jpg",
    "cau-lap-may-moc-01.jpg",
    "van-chuyen-kem-cau.jpg",
  ]),
  serviceCauKetCauThep: gallery("Cẩu dựng kết cấu thép công trình", [
    "cau-ket-cau-thep-cong-trinh-01.jpg",
    "cau-ket-cau-thep-cong-trinh.jpg",
    "cau-ket-cau-thep-cong-trinh-03.jpg",
    "cau-ket-cau-thep-cong-trinh-02.jpg",
    "cau-ket-cau-thep-cong-trinh-04.jpg",
  ]),
  serviceVanChuyenKemCau: gallery("Vận chuyển hàng nặng kèm cẩu", [
    "van-chuyen-kem-cau.jpg",
    "van-chuyen-kem-cau-03.jpg",
  ]),

  // ---- Ảnh trong bài chi tiết dịch vụ ----
  choThueXeCauHinhThuc: gallery("Xe cẩu làm việc tại công trình", [
    "xe-cau-lam-viec-tai-cong-truong.jpg",
  ]),

  // ---- Tin tức ----
  news1: gallery("Cách chọn xe cẩu đúng tải trọng cho công trình", [
    "https://images.unsplash.com/photo-1580901369227-308f6f40bdeb?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  ]),
  news2: gallery("Chuẩn bị trước khi xe cẩu đến công trình", [
    "https://images.unsplash.com/photo-1586458995526-09ce6839babe?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  ]),
  news3: gallery("Quy tắc an toàn khi cẩu hàng nặng", [
    "https://images.unsplash.com/photo-1597089038854-6be9a836a40d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  ]),
  news4: gallery("Quy tắc an toàn khi cẩu hàng nặng", [
    "https://plus.unsplash.com/premium_photo-1661963718103-0de1844b6076?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  ]),
  news5: gallery("Quy tắc an toàn khi cẩu hàng nặng", [
    "https://plus.unsplash.com/premium_photo-1661957532934-400acebc71b4?q=80&w=1240&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  ]),
  news6: gallery("Bảng giá thuê xe cẩu theo tải trọng và thời gian", [
    "https://plus.unsplash.com/premium_photo-1679784204535-e623926075cb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  ]),
  news7: gallery("Nên thuê xe cẩu hay mua xe cẩu", [
    "https://images.unsplash.com/photo-1774655746735-27946a887db0?q=80&w=1377&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  ]),
  news8: gallery("Sai lầm thường gặp khi thuê xe cẩu", [
    "https://images.unsplash.com/photo-1580901369227-308f6f40bdeb?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  ]),
  news9: gallery("Bảo dưỡng xe cẩu định kỳ", [
    "https://images.unsplash.com/photo-1586458995526-09ce6839babe?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  ]),

  // ---- Trang Giới thiệu ----
  aboutCompany: gallery("Công ty cho thuê xe cẩu tại Tây Ninh", [
    "he-thong-xe-tai-5-tan-100-tan.jpg",
  ]),
  businessChoThueXeCau: gallery("Cho thuê xe cẩu", []),
  businessCauLapMayMoc: gallery("Cẩu lắp máy móc", [
    "cau-lap-may-moc-01.jpg",
  ]),
  businessCauKetCauThep: gallery("Cẩu kết cấu thép", [
    "cau-ket-cau-thep-cong-trinh-01.jpg",
  ]),
  businessVanChuyenHangNang: gallery("Vận chuyển hàng nặng", []),
};

// =====================================================================
// 1. ẢNH CHUNG
// IMG: mỗi khối lấy ảnh đầu tiên của GALLERY (để code cũ dùng IMG.xxx vẫn chạy)
// =====================================================================
export const IMG = Object.fromEntries(
  Object.entries(GALLERY).map(([key, list]) => [key, cover(list)])
) as Record<keyof typeof GALLERY, string>;

export const images: Images = {
  hero: IMG.hero,
  about: IMG.about,
  contact: IMG.contact,
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
    image: IMG.serviceChoThueXeCau,
    images: GALLERY.serviceChoThueXeCau,
    capacity: "5 – 100 tấn",
    points: [
      "Thuê linh hoạt theo giờ, ca, ngày, tháng",
      "Tư vấn đúng tải trọng cần thuê",
      "Báo giá rõ ràng trước khi triển khai",
    ],
    intro:
      "Thuê xe cẩu linh hoạt theo giờ, ca, ngày hoặc tháng, tải trọng từ 5 đến 100 tấn. Chúng tôi tư vấn đúng loại xe để bạn không thuê thiếu tải hay thừa tải.",
    layout: "toc",
    topics: [
      {
        id: "hinh-thuc-thue",
        title: "Các hình thức thuê",
        blocks: [
          { type: "paragraph", text: "Tùy khối lượng công việc, bạn chọn hình thức thuê phù hợp để tối ưu chi phí." },
          {
            type: "list",
            items: [
              "Theo giờ: việc nhỏ, cẩu nhanh một vài cấu kiện hoặc thiết bị.",
              "Theo ca: nửa ngày hoặc một ca làm việc cho công việc vừa.",
              "Theo ngày: công trình cần cẩu liên tục trong ngày.",
              "Theo tháng: dự án dài ngày, cần xe cẩu thường xuyên tại công trường.",
            ],
          },
          { type: "gallery", images: GALLERY.choThueXeCauHinhThuc, caption: "Xe cẩu làm việc tại công trình" },
        ],
      },
      {
        id: "chon-tai-trong",
        title: "Chọn tải trọng phù hợp",
        blocks: [
          { type: "paragraph", text: "Chọn thiếu tải gây nguy hiểm, chọn thừa tải gây tốn kém. Dưới đây là cách phân nhóm thường dùng." },
          {
            type: "list",
            items: [
              "5 – 25 tấn: linh hoạt cho việc nhỏ và vừa, từ máy móc nhỏ, vật tư, biển quảng cáo, hạ cây đến lắp kết cấu thép nhà xưởng.",
              "30 – 50 tấn: cho cấu kiện bê tông, cột điện và thiết bị nặng ở công trình, nhà máy.",
              "60 – 100 tấn: cho dự án lớn, nhà máy và máy móc siêu trọng cần sức nâng, tầm với lớn.",
            ],
          },
          { type: "note", text: "Sức nâng của xe giảm dần khi tầm với xa ra. Hãy báo cho chúng tôi cả trọng lượng hàng lẫn khoảng cách cần cẩu để chọn đúng xe." },
        ],
      },
      {
        id: "bao-gia",
        title: "Báo giá được tính thế nào",
        blocks: [
          { type: "paragraph", text: "Giá thuê phụ thuộc vào loại xe, thời gian thi công thực tế và quãng đường di chuyển. Chúng tôi báo giá rõ ràng trước khi triển khai. Khi gọi, bạn chỉ cần chuẩn bị:" },
          {
            type: "list",
            items: [
              "Trọng lượng và kích thước hàng cần cẩu",
              "Khoảng cách từ vị trí đặt xe đến chỗ đặt hàng",
              "Thời gian thi công dự kiến",
              "Địa điểm công trình",
            ],
          },
        ],
      },
      {
        id: "quyen-loi",
        title: "Khi thuê, bạn nhận được",
        blocks: [
          {
            type: "list",
            items: [
              "Tư vấn chọn tải trọng và tầm với phù hợp",
              "Người vận hành có kinh nghiệm",
              "Báo giá rõ ràng trước khi triển khai",
              "Hỗ trợ khảo sát vị trí đặt xe khi cần",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "cau-lap-may-moc",
    title: "Cẩu lắp máy móc",
    desc: "Hạ và lắp đặt máy móc, thiết bị nhà xưởng chính xác, an toàn.",
    image: IMG.serviceCauLapMayMoc,
    images: GALLERY.serviceCauLapMayMoc,
    points: [
      "Khảo sát lối vào và mặt bằng trước khi cẩu",
      "Chọn đúng xe và điểm móc theo từng loại máy",
      "Đặt máy đúng vị trí, hạn chế va chạm",
      "Phù hợp cả mặt bằng chật hẹp",
    ],
    intro:
      "Nâng, hạ và đặt máy móc, thiết bị vào đúng vị trí trong nhà xưởng bằng xe cẩu, kể cả mặt bằng chật hẹp, cửa nhỏ hay nhà xưởng đã lợp mái. Chúng tôi khảo sát trước, chọn đúng xe và cách nâng để máy không bị va đập, hư hại.",
    layout: "steps",
    topics: [
      {
        id: "tiep-nhan",
        title: "Tiếp nhận thông tin",
        blocks: [
          {
            type: "paragraph",
            text: "Mỗi máy có hình dạng, trọng lượng và trọng tâm khác nhau, nên việc đầu tiên là nắm rõ máy cần cẩu. Chỉ cần vài thông tin cơ bản là chúng tôi đã có thể tư vấn sơ bộ về loại xe và cách làm.",
          },
          {
            type: "list",
            items: [
              "Loại máy, kích thước (dài, rộng, cao) và trọng lượng",
              "Vị trí máy đang đứng và vị trí cần đặt",
              "Bản vẽ hoặc sơ đồ mặt bằng xưởng nếu có",
              "Thời gian bạn muốn thực hiện",
            ],
          },
          {
            type: "paragraph",
            text: "Nếu chưa nắm rõ trọng lượng, bạn gửi tên model hoặc ảnh nhãn máy, thông số thường có trên nhãn hoặc trong tài liệu của nhà sản xuất.",
          },
        ],
      },
      {
        id: "khao-sat",
        title: "Khảo sát hiện trường",
        blocks: [
          {
            type: "paragraph",
            text: "Với máy móc, khó khăn thường nằm ở chỗ đưa máy vào xưởng chứ không phải ở việc nâng. Vì vậy chúng tôi đến xem trực tiếp những điểm sau trước khi chốt phương án.",
          },
          {
            type: "list",
            items: [
              "Lối vào: cửa xưởng, cổng, độ cao mái che và khoảng trống mà xe cần đi qua",
              "Nền đất: độ chắc và độ phẳng ở chỗ đặt chân chống xe cẩu",
              "Trên cao: đường dây điện, dầm cầu trục, mái, đường ống",
              "Vị trí đặt máy: bệ máy, bu lông neo và khoảng trống xung quanh",
            ],
          },
          {
            type: "note",
            text: "Với mặt bằng chật hẹp, khảo sát là bước quyết định việc có cẩu được hay không và cẩu bằng cách nào.",
          },
        ],
      },
      {
        id: "phuong-an",
        title: "Lên phương án cẩu",
        blocks: [
          {
            type: "paragraph",
            text: "Từ thông tin và kết quả khảo sát, chúng tôi chọn xe cẩu và cách nâng sao cho máy đi đúng đường, không chạm vào tường, dầm hay thiết bị khác.",
          },
          {
            type: "list",
            items: [
              "Chọn xe: dựa trên trọng lượng máy, tầm với và độ cao cần nâng, không chọn thừa tải gây tốn kém",
              "Điểm móc: nâng ở các vị trí nhà sản xuất cho phép, không móc vào chi tiết dễ biến dạng",
              "Cáp và phụ kiện: chọn cáp, dây cẩu, khóa phù hợp tải, có đệm bảo vệ ở góc cạnh của máy",
              "Hướng đi: tính trước đường nâng, xoay và hạ để máy luôn có khoảng cách an toàn",
            ],
          },
          {
            type: "paragraph",
            text: "Với máy dài hoặc lệch tâm, có thể dùng dầm cân bằng hoặc móc nhiều điểm để máy được nâng lên thăng bằng.",
          },
          {
            type: "note",
            text: "Nếu cửa xưởng quá nhỏ hoặc nhà đã lợp mái, tùy trường hợp có thể phải cẩu qua khoảng hở khác của xưởng hoặc tháo tạm một phần vách, mái để đưa máy vào.",
          },
        ],
      },
      {
        id: "chuan-bi",
        title: "Chuẩn bị hiện trường",
        blocks: [
          {
            type: "paragraph",
            text: "Trước ngày cẩu, hiện trường cần sẵn sàng để việc nâng diễn ra liên tục và an toàn. Phần lớn việc này chúng tôi hướng dẫn và cùng thực hiện với bạn.",
          },
          {
            type: "list",
            items: [
              "Dọn lối đi và khu vực đặt xe, di dời vật cản",
              "Trải tấm lót dưới chân chống nếu nền đất yếu",
              "Rào khu vực cẩu, không để người đứng dưới tải",
              "Chuẩn bị sẵn bệ máy, bu lông neo hoặc vị trí đặt máy",
            ],
          },
          {
            type: "note",
            text: "Gió lớn hoặc mưa to có thể phải hoãn việc cẩu để bảo đảm an toàn cho người và máy.",
          },
        ],
      },
      {
        id: "cau-dat",
        title: "Cẩu và đặt máy",
        blocks: [
          {
            type: "paragraph",
            text: "Máy được nâng từ từ, kiểm tra thăng bằng ở độ cao thấp trước khi nâng hẳn. Trong suốt quá trình cẩu chỉ có một người ra hiệu, phối hợp trực tiếp với người vận hành xe cẩu để tránh hiểu nhầm tín hiệu.",
          },
          {
            type: "list",
            items: [
              "Nâng thử: nâng cách mặt đất một đoạn ngắn để kiểm tra cáp, móc và độ thăng bằng",
              "Di chuyển: nâng, xoay và hạ chậm, giữ máy cách xa vật cản",
              "Hạ máy: hạ lên bệ hoặc tấm kê, canh theo vị trí đã đánh dấu",
              "Căn chỉnh: khi cần, dùng con lăn hoặc kích để đẩy máy vào đúng vị trí cuối",
            ],
          },
          {
            type: "paragraph",
            text: "Các loại thiết bị thường cẩu gồm máy ép, máy dập, máy CNC, máy phát điện, máy nén khí, bồn bể, tủ điện và các thiết bị trong dây chuyền sản xuất.",
          },
        ],
      },
      {
        id: "ban-giao",
        title: "Kiểm tra, bàn giao",
        blocks: [
          {
            type: "paragraph",
            text: "Sau khi hạ máy, chúng tôi cùng bạn kiểm tra vị trí và tình trạng bên ngoài của máy rồi mới thu dọn hiện trường.",
          },
          {
            type: "list",
            items: [
              "Máy nằm đúng vị trí đã đánh dấu",
              "Bề mặt máy không bị trầy xước hay móp méo do quá trình cẩu",
              "Chân chống và tấm lót được thu dọn",
              "Mặt bằng sạch, lối đi thông thoáng như ban đầu",
            ],
          },
          {
            type: "note",
            text: "Việc cân chỉnh chính xác, đấu điện và chạy thử máy thường do kỹ thuật của nhà sản xuất hoặc nhà máy của bạn thực hiện. Chúng tôi lo phần nâng và đặt máy vào đúng vị trí.",
          },
        ],
      },
    ],
  },
  {
    slug: "cau-ket-cau-thep",
    title: "Cẩu kết cấu thép",
    desc: "Dựng khung thép, cột điện, trạm biến áp, cấu kiện bê tông.",
    image: IMG.serviceCauKetCauThep,
    images: GALLERY.serviceCauKetCauThep,
    points: [
      "Dựng khung thép, cột điện, trạm biến áp",
      "Cẩu cấu kiện bê tông đúc sẵn",
      "Thi công theo quy tắc an toàn lao động",
    ],
    intro:
      "Cẩu và lắp dựng khung thép nhà xưởng, cột điện, trạm biến áp và cấu kiện bê tông đúc sẵn cho công trình, nhà máy. Cấu kiện dài, nặng và cồng kềnh nên chúng tôi tính trước xe, điểm móc và trình tự nâng để cấu kiện vào đúng vị trí, an toàn cho người và công trình.",
    layout: "grid",
    topics: [
      {
        id: "hang-muc",
        title: "Các hạng mục cẩu",
        blocks: [
          {
            type: "paragraph",
            text: "Chúng tôi nhận cẩu những cấu kiện nặng và dài mà sức người hoặc xe tải thông thường không đưa lên cao hay vào đúng vị trí được. Thường gặp nhất là bốn nhóm sau.",
          },
          {
            type: "list",
            items: [
              "Khung thép nhà xưởng: cẩu cột, kèo, dầm thép cho nhà xưởng, nhà tiền chế, kho bãi",
              "Cột điện: dựng mới hoặc thay cột điện bê tông, cột thép",
              "Trạm biến áp: đưa máy biến áp, tủ điện và thiết bị trạm vào bệ",
              "Bê tông đúc sẵn: cẩu dầm, cọc, tấm panel từ xe xuống vị trí lắp",
            ],
          },
        ],
      },
      {
        id: "phuong-an",
        title: "Chọn xe và cách nâng",
        blocks: [
          {
            type: "paragraph",
            text: "Xe cẩu được chọn theo cấu kiện nặng nhất ở tầm với xa nhất, vì sức nâng của xe giảm khi tầm với tăng. Cách móc cáp cũng quyết định cấu kiện có được nâng thăng bằng, không bị cong hay hư hại hay không.",
          },
          {
            type: "list",
            items: [
              "Cấu kiện dài: móc từ hai điểm trở lên, có thể dùng dầm cân bằng để nâng ngang thăng bằng",
              "Cột thép, cột điện: lật từ nằm sang đứng rồi mới nâng vào chân cột",
              "Cáp và phụ kiện: chọn cáp, khóa phù hợp tải, có đệm ở góc cạnh để không làm hỏng lớp sơn hoặc mạ",
              "Chân chống: đặt trên nền chắc, trải tấm lót khi nền đất yếu",
            ],
          },
          {
            type: "note",
            text: "Để chọn đúng xe, bạn cho chúng tôi biết trọng lượng cấu kiện nặng nhất, chiều dài, độ cao cần lắp và khoảng cách từ chỗ đặt xe đến chỗ lắp. Có bản vẽ hoặc trình tự lắp dựng thì gửi kèm.",
          },
        ],
      },
      {
        id: "trinh-tu",
        title: "Trình tự lắp dựng",
        blocks: [
          {
            type: "paragraph",
            text: "Khung thép được dựng theo thứ tự để kết cấu luôn ổn định ở từng giai đoạn. Chúng tôi cẩu theo trình tự này, phối hợp với đội lắp dựng của bạn.",
          },
          {
            type: "list",
            items: [
              "Cột trước: nâng cột vào chân cột, giữ thẳng đứng đến khi cố định",
              "Dầm và kèo: nâng lên, đặt vào liên kết và giữ cho đến khi đội lắp dựng cố định",
              "Giằng, xà gồ: cẩu theo từng bó nhỏ để thợ lắp dễ thao tác trên cao",
              "Nhả cáp: chỉ tháo cáp khi cấu kiện đã được cố định chắc chắn",
            ],
          },
          {
            type: "note",
            text: "Chúng tôi lo phần cẩu và đưa cấu kiện vào vị trí. Việc bắt bu lông, hàn và hoàn thiện kết cấu do đội thi công của bạn thực hiện.",
          },
        ],
      },
      {
        id: "an-toan",
        title: "An toàn lao động",
        blocks: [
          {
            type: "paragraph",
            text: "Mọi hạng mục đều làm theo quy tắc an toàn khi cẩu hàng nặng, đặc biệt cẩn thận với cột điện và trạm biến áp nằm sát đường dây.",
          },
          {
            type: "list",
            items: [
              "Kiểm tra trước ca: kiểm tra cáp, móc, khóa và chân chống trước mỗi ca làm việc",
              "Rào khu vực: rào và cấm người đứng hay đi lại dưới tải, trong tầm xoay của cần",
              "Đúng tải: cẩu đúng tải trọng và tầm với, chỉ một người ra hiệu cho người vận hành",
              "Gần dây điện: khảo sát đường dây trước, giữ khoảng cách an toàn, phối hợp cắt điện khi cần",
            ],
          },
          {
            type: "note",
            text: "Công trình sát đường dây mà không giữ được khoảng cách an toàn thì phải cắt điện trước khi cẩu. Gió lớn, mưa to hoặc tầm nhìn kém có thể phải tạm dừng cẩu.",
          },
        ],
      },
    ],
  },
  {
    slug: "van-chuyen-kem-cau",
    title: "Vận chuyển kèm cẩu",
    desc: "Chở và cẩu hàng nặng trọn gói, không cần thuê nhiều đơn vị.",
    image: IMG.serviceVanChuyenKemCau,
    images: GALLERY.serviceVanChuyenKemCau,
    points: [
      "Một đầu mối cho cả vận chuyển và cẩu",
      "Tiết kiệm thời gian phối hợp",
      "Giao hàng thẳng đến vị trí thi công",
    ],
    intro:
      "Chở hàng nặng đến công trình và cẩu hạ đúng vị trí chỉ với một đơn vị. Bạn không phải liên hệ riêng xe chở và xe cẩu, không phải tự phối hợp giờ giấc, hàng được giao thẳng đến chỗ cần đặt thay vì dừng ở cổng hay ngoài đường.",
    layout: "showcase",
    topics: [
      {
        id: "tron-goi",
        title: "Dịch vụ trọn gói",
        blocks: [
          {
            type: "paragraph",
            text: "Với hàng nặng, việc chở đến nơi mới làm được một nửa, nửa còn lại là đưa hàng xuống và đặt đúng chỗ. Chúng tôi lo cả hai khâu, bố trí xe chở và xe cẩu phù hợp với hàng của bạn.",
          },
          {
            type: "list",
            items: [
              "Một đầu mối: chỉ làm việc với một đơn vị cho cả vận chuyển và cẩu",
              "Tiết kiệm thời gian: xe chở và xe cẩu được phối hợp, không phải chờ nhau",
              "Giao tận nơi: hàng được hạ thẳng đến vị trí thi công",
              "Báo giá trọn gói: một báo giá cho cả chở và cẩu, rõ ràng trước khi làm",
            ],
          },
        ],
      },
      {
        id: "hang-hoa",
        title: "Hàng nhận chở và cẩu",
        blocks: [
          {
            type: "paragraph",
            text: "Dịch vụ phù hợp với những loại hàng nặng, cồng kềnh mà bốc xếp thủ công hoặc xe tải thông thường không xử lý được. Thường gặp nhất là bốn nhóm sau.",
          },
          {
            type: "list",
            items: [
              "Máy móc, thiết bị: máy ép, máy dập, máy phát điện, bồn bể, tủ điện",
              "Kết cấu thép: cột, kèo, dầm thép, khung thép chế tạo sẵn",
              "Cấu kiện bê tông: dầm, cọc, tấm panel bê tông đúc sẵn",
              "Vật tư nặng: vật tư, thiết bị cồng kềnh cho công trình, nhà máy",
            ],
          },
          {
            type: "note",
            text: "Hàng quá khổ hoặc quá tải có thể cần giấy phép lưu hành và tuyến đường riêng. Bạn báo trước kích thước, trọng lượng để chúng tôi tư vấn từ đầu.",
          },
        ],
      },
      {
        id: "quy-trinh",
        title: "Quy trình thực hiện",
        blocks: [
          {
            type: "paragraph",
            text: "Công việc đi theo một mạch từ lúc nhận yêu cầu đến lúc hàng nằm đúng chỗ, để bạn không phải theo dõi từng khâu.",
          },
          {
            type: "list",
            items: [
              "Nhận yêu cầu: bạn cho biết loại hàng, trọng lượng, nơi lấy hàng và nơi giao",
              "Chốt phương án: chọn xe chở, xe cẩu và báo giá trọn gói trước khi làm",
              "Chở hàng: vận chuyển hàng đến công trình đúng thời gian đã hẹn",
              "Cẩu hạ: cẩu hàng xuống và đặt đúng vị trí cần lắp hoặc để hàng",
            ],
          },
          {
            type: "note",
            text: "Điểm giao hàng cần đường vào đủ rộng cho xe chở và chỗ đặt chân chống phẳng, chắc cho xe cẩu. Nếu chưa chắc, chúng tôi khảo sát giúp trước khi chở.",
          },
        ],
      },
      {
        id: "so-sanh",
        title: "So với thuê riêng",
        blocks: [
          {
            type: "paragraph",
            text: "Nếu thuê xe chở và xe cẩu ở hai đơn vị khác nhau, bạn thường phải tự xử lý những việc sau.",
          },
          {
            type: "list",
            tone: "bad",
            items: [
              "Làm việc với hai đơn vị, hai đầu mối, hai báo giá",
              "Tự phối hợp giờ giấc giữa xe chở và xe cẩu",
              "Dễ phải chờ nhau, phát sinh thêm thời gian và chi phí",
              "Nếu có sự cố, khó xác định đơn vị nào chịu trách nhiệm",
            ],
          },
          {
            type: "note",
            text: "Làm trọn gói với một đơn vị giúp các việc trên được phối hợp sẵn, bạn chỉ cần theo dõi một đầu mối.",
          },
        ],
      },
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

export const DEFAULT_AUTHOR = "Quản trị viên";
export const news: NewsItem[] = [
  {
    id: 1,
    title: "Cách chọn xe cẩu đúng tải trọng cho công trình",
    excerpt: "Chọn thiếu tải gây nguy hiểm, chọn thừa tải gây tốn kém. Đây là cách tính nhanh.",
    date: "01/10/2026",
    image: IMG.news1,
    images: GALLERY.news1,
    href: "/tin-tuc/cach-chon-xe-cau-dung-tai-trong",
    tag: "Kinh nghiệm",
    readTime: "4 phút đọc",
    featured: true,
  },
  {
    id: 2,
    title: "Cần chuẩn bị gì trước khi xe cẩu đến công trình",
    excerpt: "Mặt bằng, nền đất, đường vào và những lưu ý để buổi cẩu diễn ra suôn sẻ.",
    date: "25/09/2026",
    image: IMG.news2,
    images: GALLERY.news2,
    href: "/tin-tuc/chuan-bi-truoc-khi-xe-cau-den-cong-trinh",
    tag: "Cẩm nang",
    readTime: "3 phút đọc",
  },
  {
    id: 3,
    title: "Quy tắc an toàn khi cẩu hàng nặng",
    excerpt: "Những nguyên tắc bắt buộc để bảo vệ người, hàng hóa và thiết bị.",
    date: "15/09/2026",
    image: IMG.news3,
    images: GALLERY.news3,
    href: "/tin-tuc/quy-tac-an-toan-khi-cau-hang-nang",
    tag: "An toàn",
    readTime: "3 phút đọc",
    featured: true,
  },
  {
    id: 4,
    title: "Quy tắc an toàn khi cẩu hàng nặng",
    excerpt: "Những nguyên tắc bắt buộc để bảo vệ người, hàng hóa và thiết bị.",
    date: "15/09/2026",
    image: IMG.news4,
    images: GALLERY.news4,
    href: "/tin-tuc/quy-tac-an-toan-khi-cau-hang-nang-2",
    tag: "An toàn",
  },
  {
    id: 5,
    title: "Quy tắc an toàn khi cẩu hàng nặng",
    excerpt: "Những nguyên tắc bắt buộc để bảo vệ người, hàng hóa và thiết bị.",
    date: "15/09/2026",
    image: IMG.news5,
    images: GALLERY.news5,
    href: "/tin-tuc/quy-tac-an-toan-khi-cau-hang-nang-3",
    tag: "An toàn",
  },
  {
    id: 6,
    title: "Bảng giá thuê xe cẩu theo tải trọng và thời gian",
    excerpt: "Cách tính giá theo giờ, theo ca và theo chuyến để bạn dự trù chi phí chính xác.",
    date: "10/09/2026",
    image: IMG.news6,
    images: GALLERY.news6,
    href: "/tin-tuc/bang-gia-thue-xe-cau",
    tag: "Báo giá",
    readTime: "4 phút đọc",
  },
  {
    id: 7,
    title: "Khi nào nên thuê xe cẩu thay vì mua?",
    excerpt: "So sánh chi phí thuê và sở hữu xe cẩu cho từng quy mô công trình.",
    date: "05/09/2026",
    image: IMG.news7,
    images: GALLERY.news7,
    href: "/tin-tuc/nen-thue-xe-cau-hay-mua",
    tag: "Kinh nghiệm",
    readTime: "5 phút đọc",
  },
  {
    id: 8,
    title: "Những sai lầm thường gặp khi thuê xe cẩu",
    excerpt: "Tổng hợp các lỗi hay gặp và cách tránh để không phát sinh chi phí.",
    date: "01/09/2026",
    image: IMG.news8,
    images: GALLERY.news8,
    href: "/tin-tuc/sai-lam-thuong-gap-khi-thue-xe-cau",
    tag: "Cẩm nang",
    readTime: "4 phút đọc",
  },
  {
    id: 9,
    title: "Bảo dưỡng xe cẩu định kỳ: cần kiểm tra những gì?",
    excerpt: "Danh sách kiểm tra giúp xe cẩu vận hành ổn định và an toàn.",
    date: "28/08/2026",
    image: IMG.news9,
    images: GALLERY.news9,
    href: "/tin-tuc/bao-duong-xe-cau-dinh-ky",
    tag: "An toàn",
    readTime: "3 phút đọc",
  },
];

// Nội dung chi tiết bài viết (DỮ LIỆU GIẢ, thay bằng nội dung thật hoặc API sau).
// Mỗi phần tử trong mảng là một đoạn văn.
const safetyRulesContent = [
  "Cẩu hàng nặng luôn tiềm ẩn rủi ro, vì vậy mọi buổi cẩu đều phải tuân thủ những nguyên tắc an toàn bắt buộc để bảo vệ người, hàng hóa và thiết bị. Chỉ cần bỏ qua một bước nhỏ cũng có thể dẫn đến sự cố nghiêm trọng, nên các quy tắc dưới đây cần được áp dụng cho mọi công trình, dù lớn hay nhỏ.",
  "Thứ nhất, kiểm tra trước mỗi ca làm việc. Người vận hành cần xem xét tình trạng cáp, móc, khóa, chân chống và các thiết bị an toàn trên xe. Cáp có dấu hiệu đứt sợi, móc bị biến dạng hoặc chân chống rò rỉ dầu đều là lý do để dừng lại và xử lý trước khi cẩu.",
  "Thứ hai, rào khu vực cẩu. Không ai được đứng hoặc đi lại bên dưới hàng đang treo, cũng như trong tầm xoay của cần. Nên căng dây cảnh báo và cử người canh ở các lối ra vào của khu vực, nhất là công trình đang có nhiều nhóm thợ cùng làm việc.",
  "Thứ ba, cẩu đúng tải trọng và tầm với. Mỗi xe có biểu đồ tải riêng, và sức nâng giảm dần khi tầm với xa ra. Tuyệt đối không cẩu vượt tải, không kéo xiên hàng hay kéo lê hàng trên mặt đất, vì lực tác động lên cần lúc đó khác hoàn toàn so với tính toán.",
  "Thứ tư, chỉ một người ra hiệu. Trong suốt buổi cẩu, người chỉ huy duy nhất phối hợp trực tiếp với người vận hành bằng tín hiệu tay hoặc bộ đàm đã thống nhất từ trước. Nhiều người cùng ra hiệu rất dễ gây hiểu nhầm, và hiểu nhầm khi đang treo hàng nặng là điều không thể chấp nhận.",
  "Thứ năm, chú ý nền đất và vật cản trên cao. Chân chống phải đặt trên nền chắc, phẳng, nếu nền yếu thì trải tấm lót để tránh lún. Đường dây điện, mái che, dầm hay cây cối đều phải được khảo sát trước và giữ khoảng cách an toàn khi nâng, xoay hàng.",
  "Thứ sáu, dừng cẩu khi điều kiện không cho phép. Gió lớn làm hàng đung đưa khó kiểm soát, mưa to và tầm nhìn kém làm người chỉ huy không quan sát được hàng và người xung quanh. Trong các trường hợp này, tạm dừng và chờ điều kiện tốt hơn luôn là lựa chọn đúng.",
  "Cuối cùng, an toàn là trách nhiệm của tất cả mọi người có mặt tại hiện trường, không chỉ của người vận hành. Chủ công trình, đội thi công và đơn vị cho thuê xe cần thống nhất quy tắc ngay từ đầu để mỗi buổi cẩu kết thúc an toàn và đúng tiến độ.",
];

const newsContent: Record<number, string[]> = {
  1: [
    "Chọn xe cẩu đúng tải trọng là bước đầu tiên và quan trọng nhất của mỗi buổi cẩu. Xe thiếu tải gây nguy hiểm cho người và công trình, còn xe thừa tải thì tốn chi phí không cần thiết. Bài viết này giúp bạn tính nhanh để chọn đúng ngay từ lần liên hệ đầu tiên.",
    "Bước 1: xác định trọng lượng thực tế của vật cần cẩu. Đây là con số quan trọng nhất, nhưng cũng hay bị ước chừng sai. Hãy tìm thông số trên nhãn máy, trong tài liệu kỹ thuật hoặc bản vẽ. Nếu là cấu kiện thép hay bê tông, có thể tính từ kích thước và khối lượng riêng của vật liệu.",
    "Bước 2: cộng thêm trọng lượng phụ kiện. Cáp, móc, khóa và dầm cân bằng (nếu dùng) cũng nằm trong tải mà xe phải nâng. Với vật nhẹ thì phần này không đáng kể, nhưng với vật nặng và cần nhiều phụ kiện thì nên tính thêm để có biên an toàn.",
    "Bước 3: xác định tầm với. Đây là khoảng cách ngang từ tâm xoay của xe đến vị trí đặt hàng. Sức nâng của xe giảm dần khi tầm với tăng, nên cùng một chiếc xe có thể nâng được nhiều tấn ở gần nhưng chỉ nâng được rất ít khi hàng ở xa.",
    "Bước 4: đối chiếu với biểu đồ tải. Mỗi xe có biểu đồ cho biết sức nâng cho phép theo từng tầm với và chiều dài cần. Trọng lượng vật cộng phụ kiện phải nhỏ hơn sức nâng ở đúng tầm với và chiều dài cần mà bạn sẽ dùng, chứ không phải sức nâng tối đa ghi trên tên xe.",
    "Về cách phân nhóm, xe 5 đến 25 tấn linh hoạt cho việc nhỏ và vừa như máy móc nhỏ, vật tư, biển quảng cáo hay kết cấu thép nhà xưởng. Xe 30 đến 50 tấn phù hợp cấu kiện bê tông, cột điện và thiết bị nặng. Xe 60 đến 100 tấn dành cho dự án lớn, nhà máy và máy móc siêu trọng.",
    "Ngoài tải trọng, đừng quên các yếu tố mặt bằng: đường vào có đủ rộng cho xe không, nền đất có chịu được chân chống không, có dây điện hay mái che trên cao không. Đôi khi xe nhỏ hơn nhưng vào được sát vị trí lại là lựa chọn tốt hơn xe lớn phải đứng xa.",
    "Cách đơn giản nhất là liên hệ và cho biết trọng lượng vật, khoảng cách từ xe đến vị trí đặt, độ cao cần nâng và địa điểm công trình. Đội kỹ thuật sẽ tính toán và tư vấn loại xe phù hợp, giúp bạn không thuê thiếu tải cũng không tốn kém thừa.",
  ],
  2: [
    "Một buổi cẩu suôn sẻ bắt đầu từ việc chuẩn bị hiện trường trước khi xe đến. Phần lớn việc chuẩn bị đều đơn giản, nhưng nếu bỏ sót thì có thể làm chậm tiến độ, phát sinh chi phí, thậm chí phải hoãn buổi cẩu. Dưới đây là những việc bạn nên làm trước ngày xe có mặt.",
    "Thứ nhất, chuẩn bị chỗ đặt xe. Xe cẩu cần một vị trí bằng phẳng và đủ chắc để đặt chân chống, vì toàn bộ sức nặng của xe và hàng dồn xuống các điểm này. Nếu nền là đất yếu, đất mới đắp hay sát hố móng, hãy báo trước để chuẩn bị tấm lót hoặc chọn vị trí khác.",
    "Thứ hai, kiểm tra đường vào. Xe cẩu có kích thước lớn nên cần đường đủ rộng, đủ chắc và không bị cản bởi cổng, cành cây, biển hiệu hay dây điện thấp. Nên đo trước chiều rộng cổng và đi thử tuyến đường vào nếu công trình nằm trong hẻm nhỏ.",
    "Thứ ba, xem xét vật cản trên cao. Đường dây điện, mái che, dầm cầu trục hay đường ống đều ảnh hưởng đến việc nâng và xoay hàng. Nếu có dây điện gần khu vực cẩu, hãy báo cho đơn vị cho thuê để tính phương án giữ khoảng cách an toàn hoặc phối hợp cắt điện khi cần.",
    "Thứ tư, dọn dẹp mặt bằng. Khu vực đặt xe và khu vực đặt hàng cần được dọn sạch vật liệu, thiết bị và những thứ không liên quan. Mặt bằng gọn gàng giúp người vận hành quan sát tốt hơn và giảm nguy cơ va chạm trong lúc xoay cần.",
    "Thứ năm, chuẩn bị người và khu vực cảnh báo. Cần có người chỉ huy phối hợp với người vận hành xe, đồng thời rào hoặc căng dây khu vực cẩu để người không phận sự không đi vào. Thông báo cho các nhóm thợ khác trong công trình biết giờ cẩu để họ tránh khu vực này.",
    "Thứ sáu, chuẩn bị sẵn vị trí đặt hàng. Với máy móc hoặc cấu kiện, bệ đặt, bu lông neo hay vị trí lắp cần sẵn sàng trước khi hàng được nâng lên. Nếu phải chờ ở bước này, xe cẩu sẽ đứng không và bạn vẫn phải trả chi phí theo thời gian.",
    "Cuối cùng, hãy liên hệ sớm và cung cấp đầy đủ thông tin về trọng lượng hàng, địa điểm và thời gian. Với công trình phức tạp hoặc mặt bằng chật, nên để đơn vị cho thuê khảo sát trước. Chuẩn bị kỹ ngay từ đầu giúp buổi cẩu diễn ra nhanh, an toàn và đúng chi phí đã thống nhất.",
  ],
  3: safetyRulesContent,
  4: safetyRulesContent,
  5: safetyRulesContent,
  6: [
    "Giá thuê xe cẩu phụ thuộc vào nhiều yếu tố nên không có một mức giá chung cho mọi công việc. Hiểu cách tính giá giúp bạn dự trù chi phí chính xác hơn và so sánh báo giá giữa các đơn vị một cách công bằng. Bài viết này giải thích các yếu tố chính ảnh hưởng đến giá.",
    "Yếu tố đầu tiên là loại xe và tải trọng. Xe có sức nâng và tầm với lớn hơn cần chi phí đầu tư, vận hành và bảo dưỡng cao hơn, nên giá thuê cũng cao hơn. Vì vậy chọn đúng tải trọng ngay từ đầu vừa an toàn vừa tiết kiệm.",
    "Yếu tố thứ hai là hình thức thuê. Thuê theo giờ phù hợp việc nhỏ, cẩu nhanh một vài cấu kiện. Thuê theo ca hoặc theo ngày phù hợp công trình cần cẩu liên tục. Thuê theo tháng dành cho dự án dài ngày, thường có đơn giá hợp lý hơn nếu tính trên mỗi giờ làm việc.",
    "Yếu tố thứ ba là thời gian thi công thực tế. Thời gian không chỉ gồm lúc cẩu mà còn gồm lúc chờ đợi, căn chỉnh và chuẩn bị tại hiện trường. Hiện trường chuẩn bị tốt thì thời gian ngắn lại, chi phí cũng giảm theo.",
    "Yếu tố thứ tư là quãng đường di chuyển. Xe cẩu cần di chuyển từ bãi đến công trình và quay về, nên công trình càng xa thì chi phí di chuyển càng tăng. Với công trình ở xa hoặc cần xe chuyên chở kèm, nên hỏi rõ cách tính để tránh nhầm lẫn khi nhận báo giá.",
    "Ngoài ra, một số công việc đặc thù như cẩu trong mặt bằng chật, cẩu ban đêm, ngày lễ hoặc cần phụ kiện riêng có thể phát sinh thêm chi phí. Điều quan trọng là các khoản này phải được nói rõ ngay trong báo giá, không để phát sinh sau khi đã thi công.",
    "Để nhận báo giá cụ thể, bạn chỉ cần cung cấp trọng lượng hàng, địa điểm, thời gian dự kiến và điều kiện mặt bằng. Chúng tôi báo giá rõ ràng trước khi triển khai, giúp bạn chủ động trong kế hoạch chi phí của công trình.",
  ],
  7: [
    "Nhiều chủ công trình và doanh nghiệp phân vân giữa việc thuê và việc mua xe cẩu. Câu trả lời không giống nhau cho mọi trường hợp, mà phụ thuộc vào tần suất sử dụng, quy mô công việc và khả năng quản lý thiết bị của bạn. Dưới đây là những điểm cần cân nhắc.",
    "Trước hết là vốn đầu tư. Một chiếc xe cẩu có giá trị rất lớn, và số tiền này sẽ bị đóng băng vào thiết bị thay vì dùng cho hoạt động chính của bạn. Thuê giúp bạn giữ vốn linh hoạt và chỉ trả tiền khi thực sự cần cẩu.",
    "Tiếp theo là chi phí vận hành đi kèm. Sở hữu xe nghĩa là phải lo bảo dưỡng định kỳ, sửa chữa, kiểm định, bảo hiểm, nhiên liệu và bãi đỗ. Đây là những khoản đều đặn, dù tháng đó xe có làm việc nhiều hay ít.",
    "Một yếu tố dễ bị bỏ qua là người vận hành. Xe cẩu cần người có tay nghề và chứng chỉ phù hợp. Nếu mua xe, bạn phải tuyển, đào tạo và trả lương cho người vận hành ổn định, kể cả những lúc không có việc để cẩu.",
    "Tính linh hoạt về tải trọng cũng là lợi thế của việc thuê. Công trình hôm nay cần xe 10 tấn, tháng sau có thể cần xe 50 tấn. Nếu mua một chiếc xe cố định, bạn sẽ bị giới hạn, còn khi thuê thì chọn đúng xe cho từng công việc.",
    "Vậy khi nào nên mua? Khi bạn cần cẩu liên tục quanh năm, khối lượng công việc đủ lớn để xe luôn có việc, và bạn đã có đội ngũ quản lý, bảo dưỡng thiết bị. Lúc này chi phí tính trên mỗi giờ làm việc của xe sở hữu có thể thấp hơn thuê.",
    "Với đa số công trình, nhà xưởng và doanh nghiệp chỉ cần cẩu theo từng dự án hoặc theo đợt, thuê vẫn là lựa chọn linh hoạt và tiết kiệm hơn. Bạn không phải lo bảo dưỡng, không bị ràng buộc vốn và luôn được dùng xe đã kiểm định kèm người vận hành có kinh nghiệm.",
    "Nếu đang phân vân, hãy liệt kê số ngày cần cẩu trong một năm và so sánh tổng chi phí thuê với tổng chi phí sở hữu. Bạn cũng có thể liên hệ để được tư vấn dựa trên khối lượng công việc thực tế của mình.",
  ],
  8: [
    "Khi thuê xe cẩu, một vài sai lầm nhỏ có thể dẫn đến chậm tiến độ, phát sinh chi phí, thậm chí mất an toàn. Dưới đây là những sai lầm thường gặp nhất mà nhiều chủ công trình đã từng mắc phải, cùng cách tránh chúng.",
    "Sai lầm 1: báo thiếu hoặc sai thông tin hàng. Nhiều người chỉ ước chừng trọng lượng, hoặc quên nói về tầm với và độ cao cần nâng. Hậu quả là xe được chọn không phù hợp, đến nơi phải đổi xe hoặc không cẩu được. Hãy kiểm tra thông số thực tế và cung cấp đầy đủ ngay từ đầu.",
    "Sai lầm 2: chỉ chọn theo giá rẻ nhất. Báo giá thấp bất thường có thể đi kèm xe cũ, thiếu bảo dưỡng, người vận hành thiếu kinh nghiệm hoặc phát sinh nhiều khoản sau đó. Nên so sánh cả chất lượng xe, tay nghề người vận hành và mức độ rõ ràng của báo giá.",
    "Sai lầm 3: không chuẩn bị mặt bằng. Nền đất yếu, đường vào quá hẹp hay dây điện thấp là những vấn đề thường chỉ bị phát hiện khi xe đã đến nơi. Lúc đó xe phải chờ hoặc quay về, và bạn vẫn mất chi phí. Hãy khảo sát hoặc nhờ đơn vị cho thuê khảo sát trước.",
    "Sai lầm 4: không hỏi về giấy tờ và kiểm định. Xe cẩu cần có kiểm định còn hiệu lực và người vận hành cần chứng chỉ phù hợp. Nếu không hỏi trước, bạn có thể gặp rủi ro về an toàn và pháp lý khi xảy ra sự cố tại công trình.",
    "Sai lầm 5: không thống nhất báo giá bằng văn bản hoặc tin nhắn. Khi chỉ trao đổi miệng, rất dễ có hiểu nhầm về thời gian tính phí, chi phí di chuyển hay các khoản phụ. Hãy xác nhận rõ giá, cách tính thời gian và các khoản đi kèm trước khi thi công.",
    "Sai lầm 6: đặt xe quá sát giờ. Xe cần được sắp xếp, di chuyển và người vận hành cần chuẩn bị. Với việc không gấp, nên liên hệ sớm để có xe đúng loại và đúng giờ. Với việc gấp, hãy gọi trực tiếp để được hỗ trợ nhanh nhất có thể.",
    "Để tránh những sai lầm trên, cách tốt nhất là làm việc với đơn vị chịu khảo sát, tư vấn rõ ràng và báo giá minh bạch ngay từ đầu. Một cuộc gọi tư vấn trước khi thuê thường giúp bạn tiết kiệm nhiều thời gian và chi phí hơn so với việc xử lý sự cố về sau.",
  ],
  9: [
    "Xe cẩu được bảo dưỡng định kỳ sẽ vận hành ổn định hơn, bền hơn và giảm nguy cơ sự cố khi đang làm việc. Với thiết bị nâng hàng nặng, bảo dưỡng không chỉ là chuyện tiết kiệm chi phí sửa chữa mà còn là điều kiện cơ bản để bảo đảm an toàn lao động.",
    "Hệ thống thủy lực là bộ phận cần chú ý đầu tiên. Cần kiểm tra mức dầu, chất lượng dầu, các đường ống và xi lanh xem có rò rỉ hay không. Thủy lực yếu hoặc rò rỉ làm cần hạ chậm, mất lực nâng và có thể dẫn đến sự cố khi đang treo hàng.",
    "Tiếp đến là cần và chân chống. Cần phải được kiểm tra các mối hàn, khớp nối, độ cong vênh và hoạt động của từng đoạn cần khi vươn ra, thu vào. Chân chống phải bung ra, thu vào trơn tru, giữ được vị trí và không bị chảy xệ khi chịu tải.",
    "Cáp và móc cẩu là những chi tiết chịu lực trực tiếp nên cần kiểm tra thường xuyên. Cáp có sợi đứt, bị dập, xoắn hay gỉ sét nặng cần được thay thế. Móc cần có chốt an toàn hoạt động tốt, không bị nứt, mòn hay biến dạng.",
    "Hệ thống phanh, lốp và động cơ cũng quan trọng không kém. Phanh phải ăn đều, lốp đủ áp suất và không bị mòn bất thường, động cơ được thay dầu, lọc dầu và lọc gió theo đúng chu kỳ. Xe di chuyển đến công trình an toàn thì buổi cẩu mới có thể bắt đầu đúng giờ.",
    "Các thiết bị an toàn trên xe như bộ giới hạn tải, báo tải, còi, đèn cảnh báo và thiết bị chỉ báo độ nghiêng cần luôn hoạt động tốt. Đây là lớp bảo vệ cuối cùng giúp người vận hành phát hiện nguy cơ quá tải hay mất cân bằng trước khi xảy ra sự cố.",
    "Ngoài bảo dưỡng định kỳ theo lịch, xe còn cần được kiểm tra nhanh trước mỗi ca làm việc. Người vận hành xem qua cáp, móc, chân chống, mức dầu và các chỉ báo trên xe để phát hiện sớm những bất thường, thay vì chờ đến kỳ bảo dưỡng tiếp theo.",
    "Việc ghi chép lại lịch bảo dưỡng, các hạng mục đã thay và kết quả kiểm định giúp theo dõi tình trạng xe theo thời gian. Khi thuê xe cẩu, bạn có thể hỏi đơn vị cho thuê về lịch bảo dưỡng và kiểm định để yên tâm xe được chăm sóc đúng cách.",
  ],
};

// Tiêu đề cho từng đoạn sau đoạn mở đầu (đoạn đầu tiên của mỗi bài là phần intro).
const safetyHeadings = [
  "Kiểm tra trước mỗi ca làm việc",
  "Rào khu vực cẩu",
  "Cẩu đúng tải trọng và tầm với",
  "Chỉ một người ra hiệu",
  "Chú ý nền đất và vật cản trên cao",
  "Dừng cẩu khi điều kiện không cho phép",
  "Kết luận",
];

const newsHeadings: Record<number, string[]> = {
  1: [
    "Bước 1: Xác định trọng lượng thực tế",
    "Bước 2: Cộng thêm trọng lượng phụ kiện",
    "Bước 3: Xác định tầm với",
    "Bước 4: Đối chiếu với biểu đồ tải",
    "Phân nhóm xe theo tải trọng",
    "Đừng quên yếu tố mặt bằng",
    "Kết luận",
  ],
  2: [
    "Chuẩn bị chỗ đặt xe",
    "Kiểm tra đường vào",
    "Xem xét vật cản trên cao",
    "Dọn dẹp mặt bằng",
    "Chuẩn bị người và khu vực cảnh báo",
    "Chuẩn bị vị trí đặt hàng",
    "Kết luận",
  ],
  3: safetyHeadings,
  4: safetyHeadings,
  5: safetyHeadings,
  6: [
    "Loại xe và tải trọng",
    "Hình thức thuê",
    "Thời gian thi công thực tế",
    "Quãng đường di chuyển",
    "Các chi phí đặc thù",
    "Cách nhận báo giá",
  ],
  7: [
    "Vốn đầu tư",
    "Chi phí vận hành đi kèm",
    "Người vận hành",
    "Tính linh hoạt về tải trọng",
    "Khi nào nên mua xe?",
    "Khi nào nên thuê xe?",
    "Kết luận",
  ],
  8: [
    "Sai lầm 1: Báo thiếu hoặc sai thông tin hàng",
    "Sai lầm 2: Chỉ chọn theo giá rẻ nhất",
    "Sai lầm 3: Không chuẩn bị mặt bằng",
    "Sai lầm 4: Không hỏi về giấy tờ và kiểm định",
    "Sai lầm 5: Không thống nhất báo giá rõ ràng",
    "Sai lầm 6: Đặt xe quá sát giờ",
    "Cách tránh những sai lầm này",
  ],
  9: [
    "Hệ thống thủy lực",
    "Cần và chân chống",
    "Cáp và móc cẩu",
    "Phanh, lốp và động cơ",
    "Thiết bị an toàn trên xe",
    "Kiểm tra nhanh trước mỗi ca",
    "Ghi chép lịch bảo dưỡng",
  ],
};

export const newsDetails: NewsDetail[] = news.map((item) => {
  const [intro = "", ...rest] = newsContent[item.id] ?? [];
  const headings = newsHeadings[item.id] ?? [];

  return {
    ...item,
    intro,
    sections: rest.map((text, i) => ({
      id: `muc-${i + 1}`,
      heading: headings[i] ?? `Mục ${i + 1}`,
      paragraphs: [text],
    })),
  };
});

export const guides: GuideItem[] = [
  {
    id: 1,
    tag: "Chuẩn bị",
    readTime: "2 phút đọc",
    title: "Checklist trước giờ cẩu",
    summary: "Năm việc cần kiểm tra để buổi cẩu diễn ra suôn sẻ.",
    points: [
      "Xác nhận trọng lượng thực tế của vật cần cẩu.",
      "Kiểm tra nền đất tại vị trí đặt xe, nơi chân chống tiếp đất.",
      "Dọn dẹp mặt bằng và đường vào cho xe.",
      "Báo trước các vật cản trên cao như dây điện, mái che.",
      "Chuẩn bị người chỉ huy và khu vực cảnh báo xung quanh.",
    ],
    note: "Nên liên hệ trước ít nhất một ngày để bên cho thuê khảo sát nếu địa hình phức tạp.",
  },
  {
    id: 2,
    tag: "Kỹ thuật",
    readTime: "2 phút đọc",
    title: "Đọc biểu đồ tải của xe cẩu",
    summary: "Vì sao cùng một xe nhưng tầm với xa thì cẩu được ít hơn.",
    points: [
      "Tải nâng tối đa chỉ áp dụng khi vật ở gần thân xe.",
      "Tầm với càng xa, tải cho phép càng giảm.",
      "Chiều dài cần càng lớn, tải cho phép càng giảm.",
      "Luôn đối chiếu trọng lượng vật với biểu đồ tải ở đúng tầm với.",
    ],
    note: "Khi cho biết nhu cầu, hãy báo cả khoảng cách từ xe đến điểm đặt hàng.",
  },
  {
    id: 3,
    tag: "Lựa chọn",
    readTime: "1 phút đọc",
    title: "Chọn đơn vị cho thuê uy tín",
    summary: "Những điểm nên hỏi trước khi chốt thuê.",
    points: [
      "Xe có giấy kiểm định còn hiệu lực không.",
      "Người vận hành có chứng chỉ phù hợp không.",
      "Báo giá đã gồm những khoản nào, có phát sinh không.",
      "Có bảo hiểm cho hàng hóa và công trình không.",
    ],
  },
  {
    id: 4,
    tag: "An toàn",
    readTime: "1 phút đọc",
    title: "Những việc không được làm khi cẩu",
    summary: "Các hành vi gây mất an toàn cần tránh tuyệt đối.",
    points: [
      "Đứng hoặc đi lại bên dưới hàng đang treo.",
      "Cẩu quá tải hoặc kéo xiên hàng.",
      "Cẩu khi gió mạnh hoặc tầm nhìn kém.",
      "Tự ý ra hiệu khi không phải người chỉ huy.",
    ],
    note: "Mọi tín hiệu nên do một người chỉ huy duy nhất đưa ra.",
  },
];

// Thông tin liên hệ hiển thị ở phần Liên hệ của trang chủ
export const contactInfo: ContactItem[] = [
  { label: "Địa chỉ", value: "Số 417 Quốc lộ 22B, Phường Hòa Thành, Tỉnh Tây Ninh, Việt Nam." },
  { label: "Khu vực", value: "Tây Ninh, TP.HCM, Bình Dương, Long An và các tỉnh lân cận." },
];

// =====================================================================
// 4. TRANG GIỚI THIỆU (/gioi-thieu)
// =====================================================================

// Section 2: Giới thiệu công ty
export const aboutCompany: AboutCompany = {
  image: IMG.aboutCompany, // Ảnh bên trái của section
  images: GALLERY.aboutCompany,
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
  { title: "Cho thuê xe cẩu", desc: "Thuê theo giờ, ca, ngày hoặc tháng với tải trọng từ 5 đến 100 tấn.", image: IMG.businessChoThueXeCau, images: GALLERY.businessChoThueXeCau },
  { title: "Cẩu lắp máy móc", desc: "Hạ và lắp đặt máy móc, thiết bị nhà xưởng chính xác, an toàn.", image: IMG.businessCauLapMayMoc, images: GALLERY.businessCauLapMayMoc },
  { title: "Cẩu kết cấu thép", desc: "Dựng khung thép, cột điện, trạm biến áp, cấu kiện bê tông.", image: IMG.businessCauKetCauThep, images: GALLERY.businessCauKetCauThep },
  { title: "Vận chuyển hàng nặng", desc: "Chở và cẩu hàng nặng trọn gói, không cần thuê nhiều đơn vị.", image: IMG.businessVanChuyenHangNang, images: GALLERY.businessVanChuyenHangNang },
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

// Section 7: Câu hỏi thường gặp (FAQ)
export const faqs: FaqItem[] = [
  {
    id: 1,
    question: "Làm sao biết nên thuê xe cẩu bao nhiêu tấn?",
    answer:
      "Bạn cho chúng tôi biết trọng lượng, kích thước hàng và khoảng cách từ xe đến vị trí cần đặt. Đội kỹ thuật sẽ tính tải trọng và tầm với phù hợp để không thiếu tải, cũng không tốn kém thừa.",
  },
  {
    id: 2,
    question: "Báo giá thuê xe cẩu được tính như thế nào?",
    answer:
      "Giá phụ thuộc vào loại xe, trọng lượng và tầm với, thời gian thi công thực tế và quãng đường di chuyển. Bạn liên hệ để được báo giá cụ thể cho từng công việc.",
  },
  {
    id: 3,
    question: "Có cần khảo sát công trình trước khi cẩu không?",
    answer:
      "Nên có, nhất là với công việc nặng hoặc mặt bằng chật. Khảo sát giúp xác định vị trí đặt xe, đường vào, nền đất và đường dây điện trên cao để buổi cẩu an toàn.",
  },
  {
    id: 4,
    question: "Mặt bằng cần chuẩn bị gì trước khi xe đến?",
    answer:
      "Cần chỗ đặt chân chống phẳng và đủ chắc, đường vào đủ rộng cho xe. Nếu nền đất yếu, chúng tôi sẽ trải thêm tấm lót để tránh lún.",
  },
  {
    id: 5,
    question: "Đặt xe trước bao lâu thì được điều xe?",
    answer:
      "Bạn nên liên hệ sớm để chúng tôi sắp xếp xe và người vận hành. Với việc gấp, hãy gọi trực tiếp để được hỗ trợ nhanh nhất có thể.",
  },
  {
    id: 6,
    question: "Đội ngũ vận hành và an toàn lao động ra sao?",
    answer:
      "Xe do người vận hành có kinh nghiệm điều khiển, tuân thủ quy trình an toàn khi cẩu hàng nặng. Xe được kiểm tra thường xuyên trước mỗi ca làm việc.",
  },
];

// =====================================================================
// 5. TRANG LIÊN HỆ (/lien-he)
// =====================================================================

// Thẻ vàng liên hệ (phần đầu của trang)
export const contactIntro: ContactIntro = {
  eyebrow: "Liên hệ",
  title: "Cần thuê xe cẩu? Gọi ngay để nhận báo giá",
  desc: "Cho chúng tôi biết tải trọng, địa điểm và thời gian, chúng tôi phản hồi nhanh nhất có thể.",
  areas: "Tây Ninh, TP.HCM, Bình Dương, Long An và các tỉnh lân cận.",
};

// Lưới thông tin liên hệ. Ô nào để value rỗng "" thì tự ẩn.
// icon: "phone" | "chat" | "mail" | "map" | "clock"
export const contactDetails: ContactDetail[] = [
  {
    icon: "phone",
    label: "Hotline",
    value: site.phoneDisplay,
    href: `tel:${site.phone}`,
    hint: "Bấm để gọi ngay",
  },
  {
    icon: "chat",
    label: "Zalo",
    value: site.phoneDisplay,
    href: `https://zalo.me/${site.zalo}`,
    hint: "Nhắn tin, gửi hình công trình",
  },
  {
    icon: "mail",
    label: "Email",
    value: "", // TODO: điền email, ví dụ "lienhe@xecauphuocloc.com"
    href: "", // ví dụ "mailto:lienhe@xecauphuocloc.com"
    hint: "Gửi yêu cầu báo giá",
  },
  {
    icon: "map",
    label: "Địa chỉ",
    value: site.address,
  },
  {
    icon: "clock",
    label: "Giờ làm việc",
    value: site.hours,
    hint: "Kể cả ngày lễ",
  },
];

// Tiêu đề phần bản đồ
export const contactMapTitle = "Địa chỉ của chúng tôi";