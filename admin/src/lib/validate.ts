const TEXT_ALLOWED = /^[\p{L}\p{N}\s.,:;!?()\-"'%/&+]+$/u;
const REPEATED = /(.)\1{4,}/u;
const CONSONANT_RUN = /[bcdfghjklmnpqrstvwxz]{5,}/i;

type Opts = { min?: number; max: number; required?: boolean; minWords?: number };

export function checkText(raw: string, label: string, opts: Opts): string | null {
  const value = raw.replace(/\s+/g, " ").trim();
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

  const plain = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d");
  if (CONSONANT_RUN.test(plain)) return `${label} chứa chuỗi ký tự vô nghĩa`;
  if ((value.match(/\p{L}/gu) ?? []).length < 2) return `${label} phải có chữ cái`;
  return null;
}

// Cho ô nhiều dòng (nội dung, kết luận): không bắt buộc, kiểm tra độ dài tối thiểu và ký tự vô nghĩa
export function checkLongText(raw: string, label: string, min: number, max: number): string | null {
  const value = raw.replace(/\s+/g, " ").trim();
  if (!value) return null;
  if (value.length < min) return `${label} tối thiểu ${min} ký tự`;
  if (value.length > max) return `${label} tối đa ${max} ký tự`;
  if (/<\s*\/?\s*(script|iframe|object|embed|style|img|svg|link|meta)\b/i.test(value)) {
    return `${label} không được chứa mã HTML/script`;
  }
  const plain = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d");
  if (CONSONANT_RUN.test(plain)) return `${label} chứa chuỗi ký tự vô nghĩa`;
  return null;
}