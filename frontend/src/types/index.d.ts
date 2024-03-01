import { type LucideIcon } from "lucide-react";

export type SiteConfig = {
  name: string;
  description: string;
  url?: string;
  ogImage?: string;
  links?: {
    github: string;
  };
  author?: {
    name: string;
    url: string;
  };
};

export type NavConfig = {
  mainNav: NavItem[];
};

export type NavItem = {
  type: "link" | "dropdown";
  hideNavMenuLink?: boolean;
  title: string;
  href?: string;
  disabled?: boolean;
  description: string;
  dropdownItems?: NavItem[];
};