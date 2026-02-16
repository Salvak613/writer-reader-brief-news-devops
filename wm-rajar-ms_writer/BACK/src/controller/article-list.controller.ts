import type { Request, Response} from "express";
import { AppDataSource } from "../config/database.js";
import { Article } from "../models/article.model.js";

export const getAllArticles = async (req: Request, res: Response) => {
    try {
        const articles = AppDataSource.getRepository(Article);
        const allArticles = await articles.find(
            { order: { publish_date: "DESC" } }
        );
        res.status(200).json(allArticles);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur lors de la récupération des articles." });
    }
};