import type { Request, Response } from "express";
import { categoryService } from "../services/category.service.js";

class CategoryController {

  async getCategory(req: Request, res: Response): Promise<void> {
    try {
      if (!req.params.id) {
        res.status(400).json({
          error: "ID de la catégorie manquant",
        });
        return;
      }

      const categoryId = parseInt(req.params.id, 10);

      if (isNaN(categoryId) || categoryId <= 0) {
        res.status(400).json({
          error: "ID catégorie  invalide",
        });
        return;
      }

      const category = await categoryService.getCategoryById(categoryId);

      if (!category) {
        res.status(404).json({
          error: "Catégorie non trouvé",
        });
        return;
      }

      res.status(200).json({
        data: category,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération de la catégorie:", error);

      res.status(500).json({
        error: "Erreur interne du serveur",
      });
    }
  }

}

export const categoryController = new CategoryController();
