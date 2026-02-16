import type { FormEvent } from "react";
import styles from "./ArticleForm.module.css";

interface ArticleFormProps {
  formData: {
    title: string;
    subtitle: string;
    subhead: string;
    body: string;
  };
  onFormDataChange: (data: {
    title: string;
    subtitle: string;
    subhead: string;
    body: string;
  }) => void;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
  loading?: boolean;
  submitLabel?: string;
  error?: string | null;
  success?: boolean;
}

export default function ArticleForm({
  formData,
  onFormDataChange,
  onSubmit,
  onCancel,
  loading = false,
  submitLabel = "Enregistrer",
  error,
  success,
}: ArticleFormProps) {
  return (
    <>
      {error && (
        <div className={styles.alert} data-type="error">
          {error}
        </div>
      )}

      {success && (
        <div className={styles.alert} data-type="success">
          ✓ Article enregistré avec succès ! Redirection...
        </div>
      )}

      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Titre <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) =>
              onFormDataChange({ ...formData, title: e.target.value })
            }
            className={styles.input}
            placeholder="Titre de l'article"
            maxLength={300}
            required
          />
          <span className={styles.hint}>Max 300 caractères</span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="subtitle" className={styles.label}>
            Sous-titre <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="subtitle"
            value={formData.subtitle}
            onChange={(e) =>
              onFormDataChange({ ...formData, subtitle: e.target.value })
            }
            className={styles.input}
            placeholder="Sous-titre de l'article"
            maxLength={300}
            required
          />
          <span className={styles.hint}>Max 300 caractères</span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="subhead" className={styles.label}>
            Chapeau <span className={styles.required}>*</span>
          </label>
          <textarea
            id="subhead"
            value={formData.subhead}
            onChange={(e) =>
              onFormDataChange({ ...formData, subhead: e.target.value })
            }
            className={styles.textarea}
            placeholder="Chapeau de l'article"
            rows={3}
            maxLength={1000}
            required
          />
          <span className={styles.hint}>Max 1000 caractères</span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="body" className={styles.label}>
            Contenu <span className={styles.required}>*</span>
          </label>
          <textarea
            id="body"
            value={formData.body}
            onChange={(e) =>
              onFormDataChange({ ...formData, body: e.target.value })
            }
            className={styles.textarea}
            placeholder="Contenu de l'article"
            rows={10}
            required
          />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.buttonSecondary}
            disabled={loading}
          >
            Annuler
          </button>
          <button
            type="submit"
            className={styles.buttonPrimary}
            disabled={loading}
          >
            {loading ? "Enregistrement..." : submitLabel}
          </button>
        </div>
      </form>
    </>
  );
}
