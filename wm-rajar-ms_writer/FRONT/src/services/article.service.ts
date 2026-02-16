import { api } from "../api/api";
import type { Article } from "../types/article.types";

export const articleService = {
  getArticleById: async (id: number): Promise<{ data: Article }> => {
    return api.get<{ data: Article }>(`/articles/${id}`);
  },

  updateArticle: async (
    id: number,
    data: Partial<Article>
  ): Promise<{ message: string; data: Article }> => {
    return api.patch<{ message: string; data: Article }>(
      `/articles/${id}`,
      data
    );
  },
};
