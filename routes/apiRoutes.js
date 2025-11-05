import { Hono } from "hono";
import aggregateRoutes from "./aggregate";
import deleteManyRoutes from "./deleteMany";
import deleteOneRoutes from "./deleteOne";
import findRoutes from "./find";
import findOneRoutes from "./findOne";
import insertManyRoutes from "./insertMany";
import insertOneRoutes from "./insertOne";
import updateManyRoutes from "./updateMany";
import updateOneRoutes from "./updateOne";

const router = new Hono();

// Mount all routes
router.route("/", findRoutes);
router.route("/", findOneRoutes);
router.route("/", insertOneRoutes);
router.route("/", insertManyRoutes);
router.route("/", updateOneRoutes);
router.route("/", updateManyRoutes);
router.route("/", deleteOneRoutes);
router.route("/", deleteManyRoutes);
router.route("/", aggregateRoutes);

export default router;
