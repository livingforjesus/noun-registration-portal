import type { AuthMeResponse } from "@nexus/api-types/routes/auth";

import { ApiError } from "../../errors/api-error";
import type { TypedRequestHandler } from "../../types/request-handler";

export const me: TypedRequestHandler<AuthMeResponse> = (req, res) => {
  if (!req.auth) {
    throw new ApiError(401, "Not authenticated");
  }

  res.json({
    staff: req.auth,
  });
};
