import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { articleService } from "../services/article.service";
import type { Article } from "../types/article.types";
import ArticleForm from "../components/ArticleForm/ArticleForm";
import styles from "./EditArticle.module.css";

export default function EditArticle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    subhead: "",
    body: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) {
        setError("ID d'article manquant");
        setLoadingArticle(false);
        return;
      }

      try {
        const response = await articleService.getArticleById(Number(id));
        const article = response.data;
        setFormData({
          title: article.title,
          subtitle: article.subtitle,
          subhead: article.subhead,
          body: article.body,
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Erreur lors du chargement de l'article"
        );
      } finally {
        setLoadingArticle(false);
      }
    };

    loadArticle();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!id) {
      setError("ID d'article manquant");
      return;
    }

    const hasChanges = Object.values(formData).some(
      (value) => value.trim() !== ""
    );
    if (!hasChanges) {
      setError("Veuillez modifier au moins un champ");
      return;
    }

    const updateData: Partial<Article> = {};
    if (formData.title.trim()) updateData.title = formData.title.trim();
    if (formData.subtitle.trim())
      updateData.subtitle = formData.subtitle.trim();
    if (formData.subhead.trim()) updateData.subhead = formData.subhead.trim();
    if (formData.body.trim()) updateData.body = formData.body.trim();

    setLoading(true);

    try {
      const response = await articleService.updateArticle(
        Number(id),
        updateData
      );
      setSuccess(true);
      console.log("Article mis à jour:", response.data);

      setTimeout(() => {
        navigate("/articles");
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de la mise à jour"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/articles");
  };

  if (loadingArticle) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <p>Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Éditer l'article #{id}</h1>

        <ArticleForm
          formData={formData}
          onFormDataChange={setFormData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
          submitLabel="Mettre à jour"
          error={error}
          success={success}
        />
      </div>
    </div>
  );
}
