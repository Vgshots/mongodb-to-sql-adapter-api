import { handleError } from "../utils/errorHandler";

// API key authentication middleware
export const apiKeyAuth = (c, next) => {
  const apiKey = c.req.header("api-key");
  if (!apiKey || apiKey !== c.env.API_KEY) {
    return handleError(c, null, "Unauthorized", 401);
  }
  return next();
};
