import { LucideIcon } from "lucide-react";

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

export type ServiceBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; tone?: "bad" }
  | { type: "note"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type ServiceTopic = {
  id: string;
  title: string;
  blocks: ServiceBlock[];
};

export type ServiceLayout = "toc" | "steps" | "grid" | "showcase";

export type Service = {
  slug: string;
  title: string;
  desc: string;
  image: string;
  capacity?: string;
  points: string[];
  intro: string;
  layout: ServiceLayout;
  topics: ServiceTopic[];
};

export type VehicleTier = {
  range: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  details: string[];
};

export type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  href: string;
  tag?: string;
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

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};