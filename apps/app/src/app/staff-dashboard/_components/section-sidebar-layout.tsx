"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC } from "react";

import { cn } from "@/lib/utils";

interface SectionSidebarItem {
  text: string;
  href: string;
}

interface SectionSidebarLayoutProps {
  children: React.ReactNode;
  title: string;
  items: SectionSidebarItem[];
}

const SectionSidebarLayout: FC<SectionSidebarLayoutProps> = ({
  children,
  title,
  items,
}) => {
  const pathname = usePathname();

  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr]">
      <aside className="rounded-md border border-border bg-card p-4">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
          {title}
        </p>

        <nav className="space-y-2">
          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.text}
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm transition-colors",
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
      </aside>

      <section className="rounded-md border border-border bg-card p-6">
        {children}
      </section>
    </div>
  );
};

export { SectionSidebarLayout };
