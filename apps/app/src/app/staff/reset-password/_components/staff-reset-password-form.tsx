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
  AuthRequestPasswordResetBody,
  AuthRequestPasswordResetResponse,
  AuthResetPasswordBody,
  AuthResetPasswordResponse,
} from "@nexus/api-types/routes/auth";
import { Field, FieldSet } from "@nexus/ui/field";
import { Input } from "@nexus/ui/input";
import {
  getApiErrorMessage,
  requestStaffPasswordReset,
  resetStaffPassword,
} from "@/lib/api";
import { Routes } from "@/lib/routes";

const staffResetPasswordSchema = z.object({
  staffId: z.string().min(1, "Staff ID is required"),
  token: z.string().min(1, "Token is required"),
  password: z.string().min(1, "New password is required"),
});

type StaffResetPasswordFormValues = z.infer<typeof staffResetPasswordSchema>;

const StaffResetPasswordForm: FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<StaffResetPasswordFormValues>({
    resolver: zodResolver(staffResetPasswordSchema),
    defaultValues: {
      staffId: "00001",
      token: "",
      password: "",
    },
  });

  const requestResetTokenMutation = useMutation<
    AuthRequestPasswordResetResponse,
    AxiosError,
    AuthRequestPasswordResetBody
  >({
    mutationFn: requestStaffPasswordReset,
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Unable to request token"));
    },
  });

  const resetPasswordMutation = useMutation<
    AuthResetPasswordResponse,
    AxiosError,
    AuthResetPasswordBody
  >({
    mutationFn: resetStaffPassword,
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Unable to reset password"));
    },
  });

  const requestResetToken = async () => {
    requestResetTokenMutation.mutate({ id: getValues("staffId") });
  };

  const onSubmit = async (values: StaffResetPasswordFormValues) => {
    resetPasswordMutation.mutate({
      id: values.staffId,
      token: values.token,
      password: values.password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-4 w-full max-w-[480px] space-y-4 rounded-md bg-card p-6 shadow-sm"
    >
      <FieldSet>
        <Field
          label="User name"
          htmlFor="staffId"
          error={errors.staffId?.message}
        >
          <Input id="staffId" className="h-12" {...register("staffId")} />
        </Field>
      </FieldSet>

      <p className="rounded-md border border-[#e8b645] bg-[#f4eed6] px-3 py-2 text-sm leading-7 text-foreground">
        A token has been sent to your official email address. Enter token below.
      </p>

      <FieldSet>
        <Field label="Token" htmlFor="token" error={errors.token?.message}>
          <Input
            id="token"
            placeholder="Enter token here..."
            className="h-12"
            {...register("token")}
          />
        </Field>

        <Field
          label="New password"
          htmlFor="password"
          error={errors.password?.message}
        >
          <Input
            id="password"
            type="password"
            className="h-12"
            {...register("password")}
          />
        </Field>
      </FieldSet>

      {requestResetTokenMutation.isSuccess ? (
        <p className="rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700">
          If staff account exists, a token has been sent to official email.
        </p>
      ) : null}

      {resetPasswordMutation.isSuccess ? (
        <p className="rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700">
          Password reset complete. You can now login.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={resetPasswordMutation.isPending}
        className="h-11 w-full rounded-md bg-primary font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {resetPasswordMutation.isPending ? "Submitting..." : "Submit"}
      </button>

      <button
        type="button"
        onClick={requestResetToken}
        disabled={requestResetTokenMutation.isPending}
        className="h-11 w-full rounded-md bg-primary font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {requestResetTokenMutation.isPending ? "Sending..." : "Resend token"}
      </button>

      <Link
        href={Routes.STAFF}
        className="block text-center text-sm text-foreground underline"
      >
        Back
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

export { StaffResetPasswordForm };
