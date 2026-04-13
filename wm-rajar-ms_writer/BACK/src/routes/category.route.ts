import { Router } from "express";
import { getAllCategories } from "../controller/category-list.controller.js";
import { categoryController } from "../controller/category.controller.js";

const router = Router();

// Récupérer toutes les catégories
router.get("/", getAllCategories);

// Récupérer une catégorie
router.get("/:id", (req, res) =>
  categoryController.getCategory(req, res)
);

export default router;