import { describe, it, expect } from "vitest";
import { articleService } from "./article.service.js";

describe("ArticleService - createArticle (validation)", () => {
  it("devrait lancer une erreur si le titre est vide", async () => {
    await expect(
      articleService.createArticle({
        title: "",
        subtitle: "Un sous-titre",
        subhead: "Un chapeau",
        body: "Un contenu",
        categoryId: 1,
      }),
    ).rejects.toThrow("Le titre est requis");
  });

  it("devrait lancer une erreur si le titre dépasse 300 caractères", async () => {
    await expect(
      articleService.createArticle({
        title: "a".repeat(301),
        subtitle: "Un sous-titre",
        subhead: "Un chapeau",
        body: "Un contenu",
        categoryId: 1,
      }),
    ).rejects.toThrow("Le titre ne peut pas dépasser 300 caractères");
  });

  it("devrait lancer une erreur si le contenu est vide", async () => {
    await expect(
      articleService.createArticle({
        title: "Un titre",
        subtitle: "Un sous-titre",
        subhead: "Un chapeau",
        body: "",
        categoryId: 1,
      }),
    ).rejects.toThrow("Le contenu est requis");
  });
});
