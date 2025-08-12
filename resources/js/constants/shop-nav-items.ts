import { NavItemWithAuth } from "@/types";
import { logoutCleanUp } from "@/utils/auth";
import { KeyRound, LogOut, UserRoundPlus, AudioLines, LayoutDashboard } from 'lucide-react';

export const navItems: NavItemWithAuth[] = [
  { title: 'Dashboard', href: 'dashboard', auth: 'auth', variant: 'secondary', icon: LayoutDashboard },
  { title: 'VibeShop', href: 'shop', variant: 'secondary', icon: AudioLines },
  { title: 'Login', href: 'login', auth: 'guest', variant: 'primary', align: 'right', icon: KeyRound },
  { title: 'Register', href: 'register', auth: 'guest', variant: 'primary', align: 'right', icon: UserRoundPlus },
  { title: 'Logout', href: 'logout', method: 'post', auth: 'auth', variant: 'primary', align: 'right', icon: LogOut, onClick: (cleanup) => logoutCleanUp(cleanup) },
];
