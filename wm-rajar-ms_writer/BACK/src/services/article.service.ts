import { articleRepository } from "../repository/article.repository.js";
import { Article } from "../models/article.model.js";
import type { UpdateArticleDTO } from "../types/article.types.js";

class ArticleService {
  async getArticleById(id: number): Promise<Article | null> {
    return await articleRepository.findById(id);
  }

  async updateArticle(
    id: number,
    data: UpdateArticleDTO
  ): Promise<Article | null> {
    const existingArticle = await articleRepository.findById(id);
    if (!existingArticle) {
      return null;
    }

    const fields = Object.keys(data).filter(
      (key) => data[key as keyof UpdateArticleDTO] !== undefined
    );
    if (fields.length === 0) {
      throw new Error("Au moins un champ doit être fourni pour la mise à jour");
    }

    if (data.title !== undefined) {
      if (data.title.length === 0) {
        throw new Error("Le titre ne peut pas être vide");
      }
      if (data.title.length > 300) {
        throw new Error("Le titre ne peut pas dépasser 300 caractères");
      }
    }

    if (data.subtitle !== undefined) {
      if (data.subtitle.length === 0) {
        throw new Error("Le sous-titre ne peut pas être vide");
      }
      if (data.subtitle.length > 300) {
        throw new Error("Le sous-titre ne peut pas dépasser 300 caractères");
      }
    }

    if (data.subhead !== undefined) {
      if (data.subhead.length === 0) {
        throw new Error("Le chapeau ne peut pas être vide");
      }
      if (data.subhead.length > 1000) {
        throw new Error("Le chapeau ne peut pas dépasser 1000 caractères");
      }
    }

    if (data.body !== undefined && data.body.length === 0) {
      throw new Error("Le contenu ne peut pas être vide");
    }

    const sanitizedData: Partial<Article> = {};
    if (data.title !== undefined) sanitizedData.title = data.title.trim();
    if (data.subtitle !== undefined)
      sanitizedData.subtitle = data.subtitle.trim();
    if (data.subhead !== undefined) sanitizedData.subhead = data.subhead.trim();
    if (data.body !== undefined) sanitizedData.body = data.body.trim();

    return await articleRepository.update(id, sanitizedData);
  }
}

export const articleService = new ArticleService();
