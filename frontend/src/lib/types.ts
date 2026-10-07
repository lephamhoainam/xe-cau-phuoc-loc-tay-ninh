export type Images = {
  hero: string;
  about: string;
  contact: string;
};

export type HeroCard = {
  label: string;
  value: string;
  note: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type About = {
  paragraphs: string[];
  stats: Stat[];
};

export type Service = {
  title: string;
  desc: string;
  image: string;
};

export type Vehicle = {
  range: string;
  use: string;
  image: string;
};

export type NewsItem = {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  href: string;
};

export type ContactItem = {
  label: string;
  value: string;
};

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type PageKey =
  | "gioiThieu"
  | "dichVu"
  | "tinTuc"
  | "lienHe"
  | "timKiem";

export type PageInfo = {
  title: string;
  subtitle: string;
  breadcrumb: BreadcrumbItem[];
};

export type AboutCompany = {
  image: string;
  paragraphs: string[];
  highlights: string[];
  stats: Stat[];
};

export type Business = {
  title: string;
  desc: string;
  image: string;
};

export type Reason = {
  title: string;
  desc: string;
};

export type Step = {
  title: string;
  desc: string;
};

export type Cta = {
  title: string;
  desc: string;
};