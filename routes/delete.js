import { Hono } from "hono";
import DatabaseService from "../services/databaseService";
import { handleError, validateRequestBody } from "../utils/errorHandler";

const router = new Hono();

// Initialize database service with D1 client
const dbService = new DatabaseService(router.db);

// Handle `deleteOne` endpoint
router.post("/deleteOne", async (c) => {
  try {
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

// Handle `deleteMany` endpoint
router.post("/deleteMany", async (c) => {
  try {
    const body = await c.req.json();
    c.req.body = body; // Attach parsed body to request object

    // Validate required fields
    validateRequestBody(c, ["database", "collection", "filter"]);

    const { collection, filter } = body;
    const deletedDocuments = await dbService.deleteMany(collection, filter);
    return c.json({ deletedCount: deletedDocuments.length });
  } catch (err) {
    return handleError(c, err, "Failed to delete documents");
  }
});

export default router;
