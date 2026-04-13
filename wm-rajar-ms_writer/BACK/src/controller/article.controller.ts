import type { Request, Response } from "express";
import { articleService } from "../services/article.service.js";
import type { CreateArticleDTO, UpdateArticleDTO } from "../types/article.types.js";

class ArticleController {
  async createArticle(req: Request, res: Response): Promise<void> {
    try {
      const { title, subtitle, subhead, body, categoryId } = req.body as CreateArticleDTO;

      if (!title || !subtitle || !subhead || !body || !categoryId) {
        res.status(400).json({
          error: "Tous les champs sont requis (title, subtitle, subhead, body, categoryId)",
        });
        return;
      }

      const newArticle = await articleService.createArticle({
        title,
        subtitle,
        subhead,
        body,
        categoryId
      });

      res.status(201).json({
        message: "Article créé avec succès",
        data: newArticle,
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'article:", error);

      if (error instanceof Error) {
        res.status(400).json({
          error: error.message,
        });
        return;
      }

      res.status(500).json({
        error: "Erreur interne du serveur",
      });
    }
  }

  async getArticle(req: Request, res: Response): Promise<void> {
    try {
      if (!req.params.id) {
        res.status(400).json({
          error: "ID d'article manquant",
        });
        return;
      }

      const articleId = parseInt(req.params.id, 10);

      if (isNaN(articleId) || articleId <= 0) {
        res.status(400).json({
          error: "ID d'article invalide",
        });
        return;
      }

      const article = await articleService.getArticleById(articleId);

      if (!article) {
        res.status(404).json({
          error: "Article non trouvé",
        });
        return;
      }

      res.status(200).json({
        data: article,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération de l'article:", error);

      res.status(500).json({
        error: "Erreur interne du serveur",
      });
    }
  }

  async updateArticle(req: Request, res: Response): Promise<void> {
    try {
      if (!req.params.id) {
        res.status(400).json({
          error: "ID d'article manquant",
        });
        return;
      }

      const articleId = parseInt(req.params.id, 10);

      if (isNaN(articleId) || articleId <= 0) {
        res.status(400).json({
          error: "ID d'article invalide",
        });
        return;
      }

      const updatedArticle = await articleService.updateArticle(
        articleId,
        req.body as UpdateArticleDTO
      );

      if (!updatedArticle) {
        res.status(404).json({
          error: "Article non trouvé",
        });
        return;
      }

      res.status(200).json({
        message: "Article mis à jour avec succès",
        data: updatedArticle,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'article:", error);

      if (error instanceof Error) {
        res.status(400).json({
          error: error.message,
        });
        return;
      }

      res.status(500).json({
        error: "Erreur interne du serveur",
      });
    }
  }

  async softDeleteArticle(req: Request, res: Response): Promise<void>{
    try{
        if (!req.params.id) {
        res.status(400).json({
          error: "ID d'article manquant",
        });
        return;
      }

      const articleId = parseInt(req.params.id, 10);

      if (isNaN(articleId) || articleId <= 0) {
        res.status(400).json({
          error: "ID d'article invalide",
        });
        return;
      }

      const deleteArticle = await articleService.softDeleteArticle(
        articleId,
      );

      if (!deleteArticle) {
        res.status(404).json({
          error: "Article non trouvé",
        });
        return;
      }

      res.status(200).json({
        message: "Article supprimé avec succès",
        data: deleteArticle,
      });
      
    }catch(error){
      console.error("Erreur lors de la mise à jour de l'article:", error);

      if (error instanceof Error) {
        res.status(400).json({
          error: error.message,
        });
        return;
      }

      res.status(500).json({
        error: "Erreur interne du serveur",
      });
    }
  }

  async restoreArticle(req: Request, res: Response): Promise<void>{
    try{
      if (!req.params.id) {
        res.status(400).json({
          error: "ID d'article manquant",
        });
        return;
      }

      const articleId = parseInt(req.params.id, 10);

      if (isNaN(articleId) || articleId <= 0) {
        res.status(400).json({
          error: "ID d'article invalide",
        });
        return;
      }

      const restoreArticle = await articleService.restoreArticle(
        articleId,
      );
      
      if (!restoreArticle) {
        res.status(404).json({
          error: "Article non trouvé",
        });
        return;
      }
      
      res.status(200).json({
        message: "Article restoré avec succès",
        data: restoreArticle,
      });
    }catch(error){
      console.error("Erreur lors de la mise à jour de l'article:", error);

      if (error instanceof Error) {
        res.status(400).json({
          error: error.message,
        });
        return;
      }

      res.status(500).json({
        error: "Erreur interne du serveur",
      });
    }
  }
}

export const articleController = new ArticleController();
