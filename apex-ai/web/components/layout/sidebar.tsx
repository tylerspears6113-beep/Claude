"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Plug,
  GitBranch,
  CheckCircle,
  ScrollText,
  Settings,
  CreditCard,
  HelpCircle,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Home" },
  { href: "/integrations", icon: Plug, label: "Integrations" },
  { href: "/workflows", icon: GitBranch, label: "Workflows" },
  { href: "/approvals", icon: CheckCircle, label: "Approvals", badge: 3 },
  { href: "/logs", icon: ScrollText, label: "Logs" },
];

const bottomItems = [
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/billing", icon: CreditCard, label: "Billing" },
  { href: "/help", icon: HelpCircle, label: "Help" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-bg-surface border-r border-border flex flex-col z-10">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
            <Zap size={15} className="text-white" />
          </div>
          <span className="font-semibold text-text-primary tracking-tight">Apex AI</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors relative",
                active
                  ? "bg-accent/15 text-accent"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
              )}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-accent text-white text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <div className="px-2 py-4 border-t border-border space-y-0.5">
        {bottomItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                active
                  ? "bg-accent/15 text-accent"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
              )}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* User */}
        <div className="mt-2 px-3 py-2 flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-accent/30 flex items-center justify-center text-xs font-semibold text-accent">
            T
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-text-primary truncate">Tyler</p>
            <p className="text-xs text-text-secondary truncate">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
