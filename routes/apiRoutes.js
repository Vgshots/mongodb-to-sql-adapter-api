import { Hono } from "hono";
import aggregateRoutes from "./aggregate";
import deleteRoutes from "./delete";
import findRoutes from "./find";
import insertRoutes from "./insert";
import updateRoutes from "./update";

const router = new Hono();

// Mount all routes
router.route("/", findRoutes);
router.route("/", insertRoutes);
router.route("/", updateRoutes);
router.route("/", deleteRoutes);
router.route("/", aggregateRoutes);

export default router;
