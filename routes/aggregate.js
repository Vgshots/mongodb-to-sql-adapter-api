import { Hono } from "hono";
import DatabaseService from "../services/databaseService";
import { handleError, validateRequestBody } from "../utils/errorHandler";

const router = new Hono();

// Initialize database service with D1 client
const dbService = new DatabaseService(router.db);

// Handle `aggregate` endpoint
router.post("/aggregate", async (c) => {
  try {
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
