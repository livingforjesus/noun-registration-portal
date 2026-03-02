"use client";

import { AppStoreIcon, PlayStoreIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { type ComponentType, type FC, useState } from "react";
import { CirclePlay } from "lucide-react";

import { Card, CardContent } from "@nexus/ui/card";
import {
  admissionToggleIcon,
  homeMenu,
  type HomeMenuItem,
} from "@/app/_components/_utils/menu-items";
import { Routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const hasSubitems = (
  item: HomeMenuItem
): item is Extract<HomeMenuItem, { subitems: unknown[] }> => "subitems" in item;

interface MenuItemCardProps {
  icon: ComponentType<{ className?: string }>;
  text: string;
  trailing?: React.ReactNode;
  isSub?: boolean;
}

const MenuItemCard: FC<MenuItemCardProps> = ({
  icon: Icon,
  text,
  trailing,
  isSub = false,
}) => (
  <Card
    className={cn(
      "border-border bg-card",
      isSub && "rounded-md shadow-[0_2px_5px_rgba(0,0,0,0.14)]"
    )}
  >
    <CardContent className="flex h-[66px] items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Icon className="h-7 w-7 text-primary" />
        <span className="text-[18px] font-normal leading-none text-foreground">
          {text}
        </span>
      </div>
      {trailing}
    </CardContent>
  </Card>
);

interface MenuItemProps {
  item: HomeMenuItem;
  trailing?: React.ReactNode;
}

const MenuItem: FC<MenuItemProps> = ({ item, trailing }) => {
  if (hasSubitems(item)) {
    return <ExpandableMenuItem item={item} />;
  }

  return (
    <Link href={item.url} className="block">
      <MenuItemCard icon={item.icon} text={item.text} trailing={trailing} />
    </Link>
  );
};

interface ExpandableMenuItemProps {
  item: HomeMenuItem;
}

const ExpandableMenuItem: FC<ExpandableMenuItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = admissionToggleIcon;

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="block w-full text-left"
      >
        <MenuItemCard
          icon={item.icon}
          text={item.text}
          trailing={
            <Icon
              className={cn(
                "h-6 w-6 text-primary-muted transition-transform duration-200",
                isOpen ? "rotate-180" : "rotate-0"
              )}
            />
          }
        />
      </button>

      {isOpen && (
        <div className="mt-2 ml-4 border-l-2 border-primary-muted bg-muted rounded-r-md py-2 pl-3 pr-2 space-y-2">
          {item.subitems?.map((subitem) => (
            <Link key={subitem.text} href={subitem.url} className="block">
              <MenuItemCard icon={subitem.icon} text={subitem.text} isSub />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const HomeMenu: FC = () => (
  <main className="min-h-screen bg-surface px-5 pb-14 pt-8">
    <section className="mx-auto w-full max-w-[420px] text-center">
      <Image
        src="/noun-logo.svg"
        alt="National Open University of Nigeria"
        width={168}
        height={196}
        className="mx-auto h-auto w-[110px] md:w-[130px]"
        priority
      />

      <h1 className="mt-3 text-[26px] leading-[1.24] text-primary font-extrabold tracking-[-0.2px]">
        National Open University of Nigeria
      </h1>
      <p className="mt-2 text-[16px] font-normal leading-tight text-foreground">
        Application and Student Management System
      </p>

      <div className="mt-4 space-y-3 text-left">
        {homeMenu.map((item, index) => (
          <MenuItem
            key={item.text}
            item={item}
            trailing={
              index === 0 && !hasSubitems(item) ? (
                <CirclePlay className="h-8 w-8 text-accent" />
              ) : undefined
            }
          />
        ))}
      </div>

      <p className="mt-5 text-[16px] text-foreground">NOUN eLink</p>

      <div className="mt-3 flex items-center justify-center gap-3">
        <Link
          href={Routes.ELINK_ANDROID}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 shadow-sm transition-colors hover:bg-muted"
          aria-label="Get it on Google Play"
        >
          <HugeiconsIcon icon={PlayStoreIcon} size={32} className="h-8 w-8" />
          <span className="text-sm font-medium text-foreground">
            Google Play
          </span>
        </Link>
        <Link
          href={Routes.ELINK_IOS}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 shadow-sm transition-colors hover:bg-muted"
          aria-label="Download on the App Store"
        >
          <HugeiconsIcon icon={AppStoreIcon} size={32} className="h-8 w-8" />
          <span className="text-sm font-medium text-foreground">App Store</span>
        </Link>
      </div>
    </section>
  </main>
);

export { HomeMenu };
