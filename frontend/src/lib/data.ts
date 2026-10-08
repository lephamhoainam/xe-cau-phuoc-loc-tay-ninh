// =====================================================================
// DỮ LIỆU MẪU (MOCK DATA) CỦA WEBSITE
// ---------------------------------------------------------------------
// - Mọi nội dung chữ và link ảnh đều nằm trong file này.
// - Kiểu dữ liệu (type) khai báo ở ./types.ts.
// - Sau này có backend (be) thì thay bằng dữ liệu gọi từ API,
//   giữ nguyên kiểu để các trang không phải sửa.
// =====================================================================

import { Truck, Factory, Building2 } from "lucide-react";

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
  FaqItem,
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
          { type: "image", src: "", alt: "Xe cẩu làm việc tại công trình", caption: "Xe cẩu làm việc tại công trình" },
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
    image: "",
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
    image: "",
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
    image: "",
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
  { label: "Địa chỉ", value: "Số 417 Quốc lộ 22B, Phường Hòa Thành, Tỉnh Tây Ninh, Việt Nam." },
  { label: "Khu vực", value: "Tây Ninh, TP.HCM, Bình Dương, Long An và các tỉnh lân cận." },
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