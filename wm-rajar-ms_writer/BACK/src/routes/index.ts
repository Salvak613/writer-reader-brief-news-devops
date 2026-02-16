import { Router } from "express";
import articleRoutes from "../routes/article.route.js";

const router = Router();

router.use("/", articleRoutes);

export default router;
