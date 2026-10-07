export type Site = {
  name: string;
  slogan: string;
  phone: string;
  phoneDisplay: string;
  zalo: string;
  address: string;
  hours: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export const site: Site = {
  name: "Xe Cẩu Phước Lộc",
  slogan: "Cho thuê xe cẩu Tây Ninh 5 – 100 tấn",
  phone: "0900000000",
  phoneDisplay: "0900 000 000",
  zalo: "0900000000",
  address: "Tây Ninh (cập nhật địa chỉ thật)",
  hours: "Phục vụ 24/7",
};

export const nav: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];