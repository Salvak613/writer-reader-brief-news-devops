import { describe, it, expect } from "vitest";

const CommentsService = (await import("./comments.js")).default;
const commentsService = new CommentsService();

describe("CommentsService - addCommentToArticle (validation)", () => {
  it("devrait lancer une erreur si le contenu est vide", async () => {
    await expect(
      commentsService.addCommentToArticle(1, { content: "" }),
    ).rejects.toThrow("Contenu obligatoire");
  });

  it("devrait lancer une erreur si le contenu dépasse 1000 caractères", async () => {
    await expect(
      commentsService.addCommentToArticle(1, { content: "a".repeat(1001) }),
    ).rejects.toThrow("Contenu trop long (max 1000 caractères)");
  });

  it("devrait lancer une erreur si le contenu est manquant", async () => {
    await expect(commentsService.addCommentToArticle(1, {})).rejects.toThrow(
      "Contenu obligatoire",
    );
  });
});
