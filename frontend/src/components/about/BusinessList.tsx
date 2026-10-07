import {
  PhoneCall,
  ClipboardCheck,
  Truck,
  BadgeCheck,
  CheckCircle2,
} from "lucide-react";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";

const steps = [
  {
    icon: PhoneCall,
    title: "Tiếp nhận yêu cầu",
    desc: "Bạn cho biết tải trọng, địa điểm và thời gian thi công. Chúng tôi ghi nhận và tư vấn loại xe cẩu phù hợp.",
    note: "Gọi hoặc nhắn Zalo",
  },
  {
    icon: ClipboardCheck,
    title: "Khảo sát & báo giá",
    desc: "Xem xét mặt bằng, đường vào và vị trí đặt xe, sau đó gửi báo giá rõ ràng trước khi triển khai.",
    note: "Báo giá rõ ràng",
  },
  {
    icon: Truck,
    title: "Điều xe & thi công",
    desc: "Điều xe cẩu và tài xế đúng thời gian đã hẹn, thực hiện cẩu hàng theo quy tắc an toàn.",
    note: "Đảm bảo an toàn",
  },
  {
    icon: BadgeCheck,
    title: "Nghiệm thu & thanh toán",
    desc: "Cùng kiểm tra khối lượng công việc hoàn thành, chốt chi phí và thanh toán theo thỏa thuận.",
    note: "Thanh toán theo thỏa thuận",
  },
];

export default function ProcessSection() {
  return (
    <Section>
      <SectionTitle
        eyebrow="Quy trình"
        title="Thuê xe cẩu chỉ với 4 bước"
        sub="Từ lúc liên hệ đến khi hoàn tất công việc, mọi bước đều rõ ràng và minh bạch."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition duration-200 hover:-translate-y-1 hover:border-primary"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-lg font-bold leading-snug">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {s.desc}
              </p>

              {/* Gạch ngang phía trên dòng chữ xanh */}
              <div className="mt-5 border-t border-border pt-4">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-success">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {s.note}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}