"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Field, FieldSet } from "@nexus/ui/field";
import { Input } from "@nexus/ui/input";
import { Routes } from "@/lib/routes";

interface StaffLoginFormProps {
  defaultStaffId?: string;
}

const staffLoginSchema = z.object({
  staffId: z.string().min(1, "Staff ID is required"),
  password: z.string().min(1, "Password is required"),
  showPassword: z.boolean(),
});

type StaffLoginFormValues = z.infer<typeof staffLoginSchema>;

const StaffLoginForm: FC<StaffLoginFormProps> = ({ defaultStaffId }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StaffLoginFormValues>({
    resolver: zodResolver(staffLoginSchema),
    defaultValues: {
      staffId: defaultStaffId ?? "",
      password: "",
      showPassword: false,
    },
  });

  const showPassword = watch("showPassword");

  const onSubmit = async (values: StaffLoginFormValues) => {
    const result = await signIn("credentials", {
      staffId: values.staffId,
      password: values.password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Invalid staff ID or password");
      return;
    }

    router.push(Routes.STAFF_DASHBOARD);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-4 w-full max-w-[480px] space-y-4 rounded-md bg-card p-6 shadow-sm"
    >
      <FieldSet>
        <Field
          label="User name (Staff ID)"
          htmlFor="staffId"
          error={errors.staffId?.message}
        >
          <Input
            id="staffId"
            type="text"
            {...register("staffId")}
            className="h-12"
          />
        </Field>

        <Field>
          <label
            htmlFor="showPassword"
            className="flex items-center gap-2 text-sm text-foreground"
          >
            <Input
              type="checkbox"
              {...register("showPassword")}
              className="h-4 w-4 rounded border-border p-0"
            />
            Show Password
          </label>
        </Field>

        <Field
          label="Password"
          htmlFor="password"
          error={errors.password?.message}
        >
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="h-12"
          />
        </Field>
      </FieldSet>

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-md bg-primary font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      <Link
        href={Routes.STAFF_RESET_PASSWORD}
        className="block text-center text-sm text-foreground underline"
      >
        Reset password
      </Link>

      <Link
        href={Routes.STAFF_SIGN_UP}
        className="block h-11 rounded-md bg-primary px-4 py-2 text-center font-semibold text-white transition-opacity hover:opacity-90"
      >
        Sign-up
      </Link>

      <Link
        href={Routes.HOME}
        className="block h-11 rounded-md bg-primary px-4 py-2 text-center font-semibold text-white transition-opacity hover:opacity-90"
      >
        Home
      </Link>
    </form>
  );
};

export { StaffLoginForm };
