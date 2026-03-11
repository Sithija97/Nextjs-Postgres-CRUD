import { type ReactNode, useState } from "react";
import { BarChart3, Menu, Settings, Users2, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserMenu } from "./user-menu";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigationItems = [
  { label: "Dashboard", icon: BarChart3, href: "/" },
  { label: "Customers", icon: Users2, href: "/customers" },
  { label: "Settings", icon: Settings, href: "/settings", disabled: true },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.06),_transparent_45%),radial-gradient(circle_at_30%_10%,_rgba(82,82,82,0.08),_transparent_35%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_45%),radial-gradient(circle_at_30%_10%,_rgba(115,115,115,0.06),_transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(115,115,115,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(115,115,115,0.06)_1px,transparent_1px)] bg-[size:28px_28px] opacity-20 dark:opacity-15" />
      </div>

      {sidebarOpen ? (
        <button
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-background/75 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-60 border-r border-border/70 bg-background/95 p-6 backdrop-blur transition-transform duration-300 md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              CRM Console
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              Customer Hub
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-10 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.href);

            if (item.disabled) {
              return (
                <button
                  key={item.label}
                  className={cn(
                    "flex w-full cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium opacity-50",
                  )}
                  disabled
                  type="button"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 rounded-2xl border border-border/60 bg-card/70 p-4">
          <p className="text-sm font-medium">Deployment-ready structure</p>
          <p className="mt-2 text-sm text-muted-foreground">
            UI mirrors a modern CRM dashboard and is ready for API wiring later.
          </p>
        </div>
      </aside>

      <div className="md:pl-60">
        <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-border/60 bg-background/80 px-4 backdrop-blur md:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-muted-foreground">Welcome back</p>
            <h2 className="truncate text-xl font-semibold tracking-tight">
              Customer management overview
            </h2>
          </div>
          <ThemeToggle />
          <UserMenu />
        </header>

        <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
