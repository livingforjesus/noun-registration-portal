"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC } from "react";
import type { StaffRole } from "@nexus/api-types/routes/auth";

import { cn } from "@/lib/utils";

import { StaffSignOutButton } from "./staff-sign-out-button";

interface StaffDashboardShellTopNavItem {
  text: string;
  href: string;
  roles: StaffRole[];
}

interface StaffDashboardShellProps {
  children: React.ReactNode;
  fullName: string;
  staffId: string;
  topNavItems: StaffDashboardShellTopNavItem[];
}

const StaffDashboardShell: FC<StaffDashboardShellProps> = ({
  children,
  fullName,
  staffId,
  topNavItems,
}) => {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-surface">
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              National Open University of Nigeria
            </h1>
            <p className="text-sm text-accent">
              Learn at any place, at your pace...
            </p>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm text-foreground">
              {fullName} [{staffId}]
            </p>
            <StaffSignOutButton />
          </div>
        </div>
      </header>

      <div className="border-b border-border bg-card">
        <nav className="mx-auto flex w-full max-w-[1200px] items-center gap-2 px-6 py-3">
          {topNavItems.map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.text}
                href={item.href}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-primary-muted"
                )}
              >
                {item.text}
              </Link>
            );
          })}
        </nav>
      </div>

      <section className="mx-auto w-full max-w-[1200px] px-6 py-6">
        {children}
      </section>
    </main>
  );
};

export { StaffDashboardShell };
