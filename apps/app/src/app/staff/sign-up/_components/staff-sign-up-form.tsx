"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import type {
  AuthActivateAccountBody,
  AuthActivateAccountResponse,
} from "@nexus/api-types/routes/auth";
import { Field, FieldSet } from "@nexus/ui/field";
import { Input } from "@nexus/ui/input";
import { activateStaffAccount, getApiErrorMessage } from "@/lib/api";
import { Routes } from "@/lib/routes";

const staffSignUpSchema = z
  .object({
    staffId: z.string().min(1, "Staff ID is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
    showPassword: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

type StaffSignUpFormValues = z.infer<typeof staffSignUpSchema>;

const StaffSignUpForm: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StaffSignUpFormValues>({
    resolver: zodResolver(staffSignUpSchema),
    defaultValues: {
      staffId: "00001",
      password: "",
      confirmPassword: "",
      showPassword: false,
    },
  });

  const activateAccountMutation = useMutation<
    AuthActivateAccountResponse,
    AxiosError,
    AuthActivateAccountBody
  >({
    mutationFn: activateStaffAccount,
    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "Unable to activate staff account.")
      );
    },
  });

  const showPassword = watch("showPassword");

  const onSubmit = async (values: StaffSignUpFormValues) => {
    activateAccountMutation.mutate({
      id: values.staffId,
      password: values.password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-4 w-full max-w-[800px] rounded-md bg-card p-6 shadow-sm"
    >
      <h2 className="rounded-sm bg-primary-muted px-4 py-2 text-center text-lg font-semibold text-primary">
        Staff sign up
      </h2>

      <FieldSet className="mt-5">
        <Field
          label="Staff ID (User name)"
          htmlFor="staff-id"
          error={errors.staffId?.message}
        >
          <Input id="staff-id" {...register("staffId")} />
        </Field>
      </FieldSet>

      <div className="mt-6 rounded-md border border-[#e8b645] bg-[#f4eed6] p-4 text-sm leading-7 text-foreground">
        <p>Please ensure the picture:</p>
        <ol className="ml-5 list-decimal">
          <li>is of a passport size</li>
          <li>has a white or red background</li>
          <li>is not more than 3 months old</li>
          <li>
            captures the top of your head, both ears and just below your chin
          </li>
          <li>is sharp, clear and bright enough to recognize you</li>
        </ol>
      </div>

      <FieldSet className="mt-6">
        <Field>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <Input
              type="checkbox"
              {...register("showPassword")}
              className="h-4 w-4 rounded border-border p-0"
            />
            Show password
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
          />
        </Field>

        <Field
          label="Confirm password"
          htmlFor="confirm-password"
          error={errors.confirmPassword?.message}
        >
          <Input
            id="confirm-password"
            type={showPassword ? "text" : "password"}
            {...register("confirmPassword")}
          />
        </Field>
      </FieldSet>

      {activateAccountMutation.isSuccess ? (
        <p className="mt-4 rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700">
          Staff account activated. You can now login.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={activateAccountMutation.isPending}
        className="mt-6 h-11 w-full rounded-md bg-primary font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {activateAccountMutation.isPending ? "Submitting..." : "Submit"}
      </button>

      <Link
        href={Routes.HOME}
        className="mt-3 block h-11 rounded-md bg-primary px-4 py-2 text-center font-semibold text-white transition-opacity hover:opacity-90"
      >
        Home
      </Link>
    </form>
  );
};

export { StaffSignUpForm };
