import { Hono } from "hono";
import DatabaseService from "../services/databaseService";
import { handleError, validateRequestBody } from "../utils/errorHandler";

const router = new Hono();

// Initialize database service with D1 client
const dbService = new DatabaseService(router.db);

// Handle `insertOne` endpoint
router.post("/insertOne", async (c) => {
  try {
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

// Handle `insertMany` endpoint
router.post("/insertMany", async (c) => {
  try {
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
