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