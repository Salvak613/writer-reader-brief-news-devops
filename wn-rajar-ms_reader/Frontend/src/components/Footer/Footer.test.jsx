import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import Comments from "../Comment/Comment";

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// --- FavoriteButton ---

describe("FavoriteButton", () => {
  it("devrait afficher \"Ajouter aux favoris\" quand l'article n'est pas favori", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<FavoriteButton articleId={1} />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /ajouter aux favoris/i }),
      ).toBeInTheDocument();
    });
  });

  it('devrait afficher "Retirer des favoris" quand l\'article est déjà favori', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ article_id: 1 }],
    });

    render(<FavoriteButton articleId={1} />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /retirer des favoris/i }),
      ).toBeInTheDocument();
    });
  });

  it("devrait basculer l'état favori au clic", async () => {
    fetch
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    render(<FavoriteButton articleId={1} />);

    const button = await screen.findByRole("button", {
      name: /ajouter aux favoris/i,
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /retirer des favoris/i }),
      ).toBeInTheDocument();
    });
  });
});

// --- Comments ---

describe("Comments", () => {
  it('devrait afficher "Aucun commentaire" quand la liste est vide', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<Comments articleId={1} />);

    await waitFor(() => {
      expect(screen.getByText(/aucun commentaire/i)).toBeInTheDocument();
    });
  });

  it("devrait afficher le formulaire de commentaire avec le bouton Publier", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<Comments articleId={1} />);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText(/écrire un commentaire/i),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /publier/i }),
      ).toBeInTheDocument();
    });
  });

  it("devrait afficher un commentaire existant", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, content: "Super article !", createdAt: "2025-01-01T10:00:00" },
      ],
    });

    render(<Comments articleId={1} />);

    await waitFor(() => {
      expect(screen.getByText("Super article !")).toBeInTheDocument();
    });
  });
});
