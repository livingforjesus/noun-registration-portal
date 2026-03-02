import axios from "axios";

import type {
  AuthActivateAccountBody,
  AuthActivateAccountResponse,
  AuthLoginBody,
  AuthLoginResponse,
  AuthRequestPasswordResetBody,
  AuthRequestPasswordResetResponse,
  AuthResetPasswordBody,
  AuthResetPasswordResponse,
} from "@nexus/api-types/routes/auth";

export const getPublicApiBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

const apiClient = axios.create({
  baseURL: getPublicApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginStaff = async (
  body: AuthLoginBody
): Promise<AuthLoginResponse> => {
  const response = await apiClient.post<AuthLoginResponse>("/auth/login", body);
  return response.data;
};

export const activateStaffAccount = async (
  body: AuthActivateAccountBody
): Promise<AuthActivateAccountResponse> => {
  const response = await apiClient.post<AuthActivateAccountResponse>(
    "/auth/activate-account",
    body
  );

  return response.data;
};

export const requestStaffPasswordReset = async (
  body: AuthRequestPasswordResetBody
): Promise<AuthRequestPasswordResetResponse> => {
  const response = await apiClient.post<AuthRequestPasswordResetResponse>(
    "/auth/password-reset/request",
    body
  );

  return response.data;
};

export const resetStaffPassword = async (
  body: AuthResetPasswordBody
): Promise<AuthResetPasswordResponse> => {
  const response = await apiClient.post<AuthResetPasswordResponse>(
    "/auth/password-reset/confirm",
    body
  );

  return response.data;
};

export const getApiErrorMessage = (
  error: unknown,
  fallbackMessage: string
): string => {
  if (axios.isAxiosError(error)) {
    const apiMessage = (
      error.response?.data as { message?: string } | undefined
    )?.message;

    return apiMessage ?? fallbackMessage;
  }

  return fallbackMessage;
};
