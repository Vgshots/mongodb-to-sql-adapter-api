import { Hono } from "hono";
import { config } from "./config/config";
import { instructions } from "./instructions"; // Import the instructions
import { apiKeyAuth } from "./middleware/auth";
import apiRoutes from "./routes/apiRoutes";
import { handleError } from "./utils/errorHandler";

const app = new Hono();

app.use("*", (c, next) => {
  c.set("config", config);
  return next();
});

// Middleware for JSON parsing
app.use("*", async (c, next) => {
  if (c.req.method === "POST") {
    try {
      c.req.body = await c.req.json();
    } catch (err) {
      return handleError(c, err, "Invalid JSON body");
    }
  }
  await next();
});

// Root route to display instructions
app.get("/", async (c) => {
  return c.text(instructions, 200, { "Content-Type": "text/markdown" });
});

// Mount routes
app.route("/app/data-test/endpoint/data/v1/action", apiKeyAuth, apiRoutes);

// Error handling middleware
app.onError((err, c) => {
  return handleError(c, err);
});

export default app;
