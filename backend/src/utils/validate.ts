const TEXT_ALLOWED = /^[\p{L}\p{N}\s.,:;!?()\-"'%/&+]+$/u;
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u202A-\u202E\uFEFF]/g;
const REPEATED = /(.)\1{4,}/u;
const CONSONANT_RUN = /[bcdfghjklmnpqrstvwxz]{5,}/i;

type Opts = { min?: number; max: number; required?: boolean; minWords?: number };

function stripMarks(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d");
}

// Làm sạch ô một dòng: bỏ ký tự ẩn, gộp khoảng trắng
export function cleanText(value: unknown): string {
  return String(value ?? "")
    .replace(CONTROL_CHARS, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Làm sạch ô nhiều dòng: giữ xuống dòng, bỏ ký tự ẩn
export function cleanMultiline(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(CONTROL_CHARS, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

// Kiểm tra ô một dòng
export function checkText(value: string, label: string, opts: Opts): string | null {
  const { min = 1, max, required = true } = opts;

  if (!value) return required ? `Vui lòng nhập ${label}` : null;
  if (value.length < min) return `${label} tối thiểu ${min} ký tự`;
  if (value.length > max) return `${label} tối đa ${max} ký tự`;
  if (/<[^>]*>/.test(value)) return `${label} không được chứa thẻ HTML`;
  if (!TEXT_ALLOWED.test(value)) return `${label} chứa ký tự không hợp lệ`;
  if (REPEATED.test(value)) return `${label} có ký tự lặp bất thường`;

  const words = value.split(" ").filter(Boolean);
  if (opts.minWords && words.length < opts.minWords) {
    return `${label} cần ít nhất ${opts.minWords} từ`;
  }
  if (words.some((w) => w.length > 20)) return `${label} có từ quá dài, không hợp lệ`;
  if (CONSONANT_RUN.test(stripMarks(value))) return `${label} chứa chuỗi ký tự vô nghĩa`;
  if ((value.match(/\p{L}/gu) ?? []).length < 2) return `${label} phải có chữ cái`;
  return null;
}

// Kiểm tra ô nhiều dòng (nội dung, kết luận)
export function checkMultiline(
  value: string,
  label: string,
  opts: { min?: number; max: number; required?: boolean }
): string | null {
  const { min = 1, max, required = true } = opts;

  if (!value) return required ? `Vui lòng nhập ${label}` : null;
  if (value.length < min) return `${label} tối thiểu ${min} ký tự`;
  if (value.length > max) return `${label} tối đa ${max} ký tự`;
  if (/<\s*\/?\s*(script|iframe|object|embed|style|img|svg|link|meta)\b/i.test(value)) {
    return `${label} không được chứa mã HTML/script`;
  }
  if (/javascript:/i.test(value)) return `${label} chứa nội dung không hợp lệ`;
  if (REPEATED.test(value.replace(/\s/g, ""))) return `${label} có ký tự lặp bất thường`;
  if (CONSONANT_RUN.test(stripMarks(value))) return `${label} chứa chuỗi ký tự vô nghĩa`;
  return null;
}

// Số điện thoại Việt Nam: 0xxxxxxxxx hoặc +84xxxxxxxxx
export function checkPhone(value: string): string | null {
  const p = value.replace(/[\s.\-]/g, "");
  return /^(0|\+84)\d{9,10}$/.test(p) ? null : "Số điện thoại không hợp lệ";
}