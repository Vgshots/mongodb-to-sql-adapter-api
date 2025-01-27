import { Hono } from "hono";
import { instructions } from "./instructions"; // Import the instructions
import aggregateRoutes from "./routes/aggregate";
import deleteRoutes from "./routes/delete";
import findRoutes from "./routes/find";
import insertRoutes from "./routes/insert";
import updateRoutes from "./routes/update";
import { handleError } from "./utils/errorHandler";

const app = new Hono();

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
app.route("/app/data-test/endpoint/data/v1/action", findRoutes);
app.route("/app/data-test/endpoint/data/v1/action", insertRoutes);
app.route("/app/data-test/endpoint/data/v1/action", updateRoutes);
app.route("/app/data-test/endpoint/data/v1/action", deleteRoutes);
app.route("/app/data-test/endpoint/data/v1/action", aggregateRoutes);

// Error handling middleware
app.onError((err, c) => {
  return handleError(c, err);
});

export default app;
