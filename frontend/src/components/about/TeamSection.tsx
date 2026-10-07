import { HardHat, ShieldCheck, Headset } from "lucide-react";
import Section from "../common/Section";

const strengths = [
  {
    icon: HardHat,
    title: "Tài xế cẩu có tay nghề",
    desc: "Vận hành thành thạo nhiều dòng xe cẩu, xử lý tốt các vị trí chật hẹp và hàng tải trọng lớn.",
  },
  {
    icon: ShieldCheck,
    title: "Quy trình an toàn nghiêm ngặt",
    desc: "Kiểm tra xe, dây cáp và mặt bằng trước khi cẩu, tuân thủ quy tắc an toàn lao động trong suốt quá trình thi công.",
  },
  {
    icon: Headset,
    title: "Điều phối và hỗ trợ nhanh",
    desc: "Nhân viên nắm rõ lịch xe, tư vấn đúng tải trọng cần thuê và báo giá rõ ràng trước khi triển khai.",
  },
];

export default function TeamSection() {
  return (
    <Section>
      <div className="grid gap-10 rounded-3xl bg-foreground p-6 text-background sm:p-10 lg:grid-cols-5 lg:gap-14 lg:p-14">
        {/* Trái: tiêu đề */}
        <div className="lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Đội ngũ
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Đội ngũ vận hành chuyên nghiệp
          </h2>
          <p className="mt-4 text-background/70">
            Mỗi chuyến cẩu đều do tài xế và nhân sự có kinh nghiệm thực hiện,
            tuân thủ quy trình an toàn từ lúc khảo sát đến khi hoàn tất.
          </p>
        </div>

        {/* Phải: 3 điểm mạnh */}
        <ul className="divide-y divide-background/15 lg:col-span-3">
          {strengths.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold leading-snug">{s.title}</h3>
                  <p className="mt-1 text-sm text-background/70">{s.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}