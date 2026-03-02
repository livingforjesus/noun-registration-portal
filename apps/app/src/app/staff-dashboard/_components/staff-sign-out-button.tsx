"use client";

import { signOut } from "next-auth/react";
import { type FC } from "react";

import { Routes } from "@/lib/routes";

const StaffSignOutButton: FC = () => {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: Routes.STAFF })}
      className="rounded-md border border-red-600 bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
    >
      Sign out
    </button>
  );
};

export { StaffSignOutButton };
