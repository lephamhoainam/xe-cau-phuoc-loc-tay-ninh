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
      <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-lg lg:grid-cols-[2fr_3fr]">
        {/* Trái: khối màu chính chứa tiêu đề */}
        <div className="relative flex flex-col justify-center overflow-hidden bg-primary p-6 text-primary-foreground sm:p-10">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-black/5"
          />
          <div className="relative">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest">
              <span
                aria-hidden="true"
                className="h-0.5 w-8 rounded-full bg-current"
              />
              Đội ngũ
            </p>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight md:text-3xl">
              Đội ngũ vận hành chuyên nghiệp
            </h2>
            <p className="mt-4 opacity-90">
              Mỗi chuyến cẩu đều do tài xế và nhân sự có kinh nghiệm thực hiện,
              tuân thủ quy trình an toàn từ lúc khảo sát đến khi hoàn tất.
            </p>
          </div>
        </div>

        {/* Phải: 3 điểm mạnh */}
        <ul className="divide-y divide-border p-6 sm:p-10">
          {strengths.map((s, i) => {
            const Icon = s.icon;
            return (
              <li
                key={s.title}
                className="relative flex gap-4 py-5 first:pt-0 last:pb-0"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <div className="pr-10">
                  <h3 className="text-lg font-bold leading-snug">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-5 text-2xl font-extrabold text-primary/20 first:top-0"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}