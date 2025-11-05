import { HttpError } from "./httpError";

const handleError = (c, error, customMessage) => {
  console.error("Error:", error);

  const errorMessage = customMessage || error.message || "An unexpected error occurred";
  const statusCode = error.statusCode || 500;

  return c.json(
    {
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined
    },
    statusCode
  );
};

// Validate required fields in the request body
const validateRequestBody = (c, requiredFields) => {
  const body = c.req.body;
  const missingFields = requiredFields.filter((field) => !body[field]);

  if (missingFields.length > 0) {
    throw new HttpError(400, `Missing required fields: ${missingFields.join(", ")}`);
  }
};

export { handleError, validateRequestBody };
