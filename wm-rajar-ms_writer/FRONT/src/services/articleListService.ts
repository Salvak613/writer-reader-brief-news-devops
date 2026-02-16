import type { ArticleType } from "../components/ArticleList/ArticleCard";

const API_BASE = import.meta.env.VITE_API_URL;

export const fetchArticles = async (): Promise<ArticleType[]> => {
  const res = await fetch(`${API_BASE}/articles`);
  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des articles");
  }
  return res.json();
};
