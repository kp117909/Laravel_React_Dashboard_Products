import { NavItemWithAuth } from "@/types";

export const navItems: NavItemWithAuth[] = [
  { title: 'Dashboard', href: 'dashboard', auth: 'auth', variant: 'secondary' },
  { title: 'Logout', href: 'logout', method: 'post', auth: 'auth', variant: 'primary' },
  { title: 'Login', href: 'login', auth: 'guest', variant: 'secondary' },
  { title: 'Register', href: 'register', auth: 'guest', variant: 'secondary' },
];
