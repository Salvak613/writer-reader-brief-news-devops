import "./ArticleCard.css";

export type ArticleType = {
  id: number;
  title: string;
  subtitle: string;
  subhead: string;
  publish_date: string;
};

type ArticleCardProps = {
  article: ArticleType;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="article-card">
      <h2 className="article-title">{article.title}</h2>
      <h3 className="article-subtitle">{article.subtitle}</h3>
      <p className="article-date">
        Publié le {new Date(article.publish_date).toLocaleDateString("fr-FR")}
      </p>
    </article>
  );
}
