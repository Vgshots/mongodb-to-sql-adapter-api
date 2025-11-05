import { Hono } from "hono";
import DatabaseService from "../services/databaseService";
import { handleError, validateRequestBody } from "../utils/errorHandler";

const router = new Hono();

// Handle `deleteOne` endpoint
router.post("/deleteOne", async (c) => {
  try {
    const config = c.get("config");
    const dbService = c.get("dbService") || new DatabaseService(config, c.env.DB);
    const body = await c.req.json();
    c.req.body = body; // Attach parsed body to request object

    // Validate required fields
    validateRequestBody(c, ["database", "collection", "filter"]);

    const { collection, filter } = body;
    const deletedDocument = await dbService.deleteOne(collection, filter);
    return c.json({ deletedCount: 1, deletedDocument });
  } catch (err) {
    return handleError(c, err, "Failed to delete document");
  }
});

export default router;
