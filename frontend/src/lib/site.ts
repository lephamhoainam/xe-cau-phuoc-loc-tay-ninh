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
  name: "CÔNG TY TNHH MTV PHƯỚC LỘC TÂY NINH",
  slogan: "Cho thuê xe cẩu Tây Ninh 5 – 100 tấn",
  phone: "0918812084",
  phoneDisplay: "0918 812 084 (A.Phương)",
  zalo: "0918812084",
  address: "Số 417 Quốc lộ 22B, Phường Hòa Thành, Tỉnh Tây Ninh, Việt Nam.",
  hours: "Phục vụ 24/7",
};

export const nav: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];