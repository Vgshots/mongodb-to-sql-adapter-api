import { Hono } from "hono";
import DatabaseService from "../services/databaseService";
import { handleError, validateRequestBody } from "../utils/errorHandler";

const router = new Hono();

// Handle `insertOne` endpoint
router.post("/insertOne", async (c) => {
  try {
    const config = c.get("config");
    const dbService = c.get("dbService") || new DatabaseService(config, c.env.DB);
    const body = await c.req.json();
    c.req.body = body; // Attach parsed body to request object

    // Validate required fields
    validateRequestBody(c, ["database", "collection", "document"]);

    const { collection, document } = body;
    const insertedDocument = await dbService.insertOne(collection, document);
    return c.json({ insertedId: insertedDocument.id });
  } catch (err) {
    return handleError(c, err, "Failed to insert document");
  }
});

export default router;
