import { Hono } from "hono";
import DatabaseService from "../services/databaseService";
import { handleError, validateRequestBody } from "../utils/errorHandler";

const router = new Hono();

// Initialize database service with D1 client
const dbService = new DatabaseService(router.db);

// Handle `updateOne` endpoint
router.post("/updateOne", async (c) => {
  try {
    const body = await c.req.json();
    c.req.body = body; // Attach parsed body to request object

    // Validate required fields
    validateRequestBody(c, ["database", "collection", "filter", "update"]);

    const { collection, filter, update } = body;
    const updatedDocument = await dbService.updateOne(collection, filter, update);
    return c.json({ matchedCount: 1, modifiedCount: 1, updatedDocument });
  } catch (err) {
    return handleError(c, err, "Failed to update document");
  }
});

// Handle `updateMany` endpoint
router.post("/updateMany", async (c) => {
  try {
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
