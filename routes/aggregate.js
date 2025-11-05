import { Hono } from "hono";
import DatabaseService from "../services/databaseService";
import { handleError, validateRequestBody } from "../utils/errorHandler";

const router = new Hono();

// Handle `aggregate` endpoint
router.post("/aggregate", async (c) => {
  try {
    const config = c.get("config");
    const dbService = c.get("dbService") || new DatabaseService(config, c.env.DB);
    const body = await c.req.json();
    c.req.body = body; // Attach parsed body to request object

    // Validate required fields
    validateRequestBody(c, ["database", "collection", "pipeline"]);

    const { collection, pipeline } = body;
    const documents = await dbService.aggregate(collection, pipeline);
    return c.json({ documents });
  } catch (err) {
    return handleError(c, err, "Failed to perform aggregation");
  }
});

export default router;
