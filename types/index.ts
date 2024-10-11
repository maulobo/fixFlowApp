import { Icons } from '@/components/icons';

// export interface NavItem {
//   title: string;
//   href?: string;
//   disabled?: boolean;
//   external?: boolean;
//   icon?: keyof typeof Icons;
//   label?: string;
//   description?: string;
//   badge?: number;
// }

export type NavItem = {
  title: string;
  href: string;
  icon: string;
  label: string;
  badge?: number; // Optional, should be a number or undefined
  external?: boolean;
  disabled?: boolean;
  description?: string;
};

export type Producto = {
  _id: string;
  name: string;
  category: string;
  description: string;
};

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
