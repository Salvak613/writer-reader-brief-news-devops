import { Router } from "express";
import { articleController } from "../controller/article.controller.js";
import { getAllArticles } from "../controller/article-list.controller.js";
import { searchArticles } from "../controller/article-search.controller.js";

const router = Router();

// Récupérer tous les articles
router.get("/articles", getAllArticles);

// Rechercher des articles
router.get("/articles/search", searchArticles);

// Récupérer un article par ID
router.get("/articles/:id", (req, res) =>
  articleController.getArticle(req, res)
);

// Mettre à jour un article
router.patch("/articles/:id", (req, res) =>
  articleController.updateArticle(req, res)
);

export default router;
