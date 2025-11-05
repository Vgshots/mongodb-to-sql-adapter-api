import { Hono } from "hono";
import DatabaseService from "../services/databaseService";
import { handleError, validateRequestBody } from "../utils/errorHandler";

const router = new Hono();

// Handle `insertMany` endpoint
router.post("/insertMany", async (c) => {
  try {
    const config = c.get("config");
    const dbService = c.get("dbService") || new DatabaseService(config, c.env.DB);
    const body = await c.req.json();
    c.req.body = body; // Attach parsed body to request object

    // Validate required fields
    validateRequestBody(c, ["database", "collection", "documents"]);

    const { collection, documents } = body;
    const insertedDocuments = await dbService.insertMany(collection, documents);
    return c.json({ insertedIds: insertedDocuments.map((doc) => doc.id) });
  } catch (err) {
    return handleError(c, err, "Failed to insert documents");
  }
});

export default router;
