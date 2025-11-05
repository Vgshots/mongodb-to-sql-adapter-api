import { describe, it, expect, vi } from "vitest";
import { Hono } from "hono";
import findRoutes from "../routes/find";
import DatabaseService from "../services/databaseService";

vi.mock("../services/databaseService");

describe("Find Routes", () => {
  it("should return documents for a valid find request", async () => {
    const app = new Hono();
    const mockDbService = new DatabaseService();
    mockDbService.find.mockResolvedValue([]);
    app.use("*", (c, next) => {
      c.set("dbService", mockDbService);
      return next();
    });
    app.route("/", findRoutes);

    const res = await app.request("/find", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        database: "test",
        collection: "test",
        filter: {},
      }),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("documents");
  });
});
