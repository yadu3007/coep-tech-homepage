export interface Announcement {
  id: number;
  text: string;
  tag?: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
  image?: string;
  gradient?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  isNew?: boolean;
}

export interface Notice {
  id: number;
  title: string;
  date: string;
  description: string;
  category: string;
  link?: string;
}

export interface ResearchPaper {
  id: number;
  title: string;
  department: string;
  author: string;
  abstract: string;
  link?: string;
  gradient?: string;
}

export interface Stat {
  value: string;
  label: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}
