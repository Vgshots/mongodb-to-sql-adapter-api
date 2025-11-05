import { Hono } from "hono";
import DatabaseService from "../services/databaseService";
import { handleError, validateRequestBody } from "../utils/errorHandler";

const router = new Hono();

// Handle `findOne` endpoint
router.post("/findOne", async (c) => {
  try {
    const config = c.get("config");
    const dbService = c.get("dbService") || new DatabaseService(config, c.env.DB);
    const body = await c.req.json();
    c.req.body = body; // Attach parsed body to request object

    // Validate required fields
    validateRequestBody(c, ["database", "collection", "filter"]);

    const { collection, filter } = body;
    const document = await dbService.findOne(collection, filter);
    return c.json({ document });
  } catch (err) {
    return handleError(c, err, "Failed to fetch document");
  }
});

export default router;
