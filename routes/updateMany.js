import { Hono } from "hono";
import DatabaseService from "../services/databaseService";
import { handleError, validateRequestBody } from "../utils/errorHandler";

const router = new Hono();

// Handle `updateMany` endpoint
router.post("/updateMany", async (c) => {
  try {
    const config = c.get("config");
    const dbService = c.get("dbService") || new DatabaseService(config, c.env.DB);
    const body = await c.req.json();
    c.req.body = body; // Attach parsed body to request object

    // Validate required fields
    validateRequestBody(c, ["database", "collection", "filter", "update"]);

    const { collection, filter, update } = body;
    const updatedDocuments = await dbService.updateMany(collection, filter, update);
    return c.json({ matchedCount: updatedDocuments.length, modifiedCount: updatedDocuments.length });
  } catch (err) {
    return handleError(c, err, "Failed to update documents");
  }
});

export default router;
