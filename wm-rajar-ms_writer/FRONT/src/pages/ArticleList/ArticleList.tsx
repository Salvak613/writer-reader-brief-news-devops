import { useEffect, useState } from "react";
import ArticleCard from "../../components/ArticleList/ArticleCard";
import type { ArticleType } from "../../components/ArticleList/ArticleCard";
import SearchBar from "../../components/ArticleList/SearchBar";
import { fetchArticles } from "../../services/articleListService";
import { searchArticles } from "../../services/searchBarService";
import "./ArticleList.css";
import EditButton from "../../components/ArticleList/Button";

export default function ArticleList() {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles()
      .then(data => setArticles(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement des articles...</p>;
  if (error) return <p>Erreur: {error}</p>;

  const handleSearch = () => {
    setLoading(true);

    const action = query.trim()
      ? searchArticles(query)
      : fetchArticles();

    action
      .then(data => setArticles(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="article-list-page">
      <h1>Liste des articles</h1>
      <SearchBar
        searchBar={{ query }}
        onQueryChange={setQuery}
        onSearch={handleSearch}
      />
    <div className="articles-container">
      {articles.map(article => (
        <div key={article.id} className="article-row">
          <ArticleCard article={article} />
          <EditButton articleId={article.id} />
        </div>
      ))}
    </div>
    </div>

  );
}
