import { Router } from "express";

import { withAuth } from "../../middleware/with-auth";
import { withAsyncHandler } from "../../utils/with-async-handler";
import { activateAccount } from "./activate-account";
import { login } from "./login";
import { me } from "./me";
import { requestPasswordReset } from "./request-password-reset";
import { resetPassword } from "./reset-password";

export const getAuthRoutes = () => {
  const router = Router();

  router.post("/login", withAsyncHandler(login));
  router.post("/activate-account", withAsyncHandler(activateAccount));
  router.post(
    "/password-reset/request",
    withAsyncHandler(requestPasswordReset)
  );
  router.post("/password-reset/confirm", withAsyncHandler(resetPassword));

  router.get("/me", withAuth(), withAsyncHandler(me));

  return router;
};
