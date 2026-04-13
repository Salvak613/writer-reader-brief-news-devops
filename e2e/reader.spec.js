import { test, expect } from '@playwright/test';

// Ces tests nécessitent que l'app tourne (docker compose up)

test.describe('Reader Frontend', () => {

  test('devrait afficher la page d\'accueil avec les articles', async ({ page }) => {
    // Le robot va sur la page du Reader
    await page.goto('http://localhost:5173');

    // On vérifie que la page ne montre pas une erreur
    await expect(page.locator('body')).not.toHaveText(/Cannot GET/);

    // On vérifie qu'il y a au moins un article affiché
    const articles = page.locator('article, [class*="article"], [class*="card"]');
    await expect(articles.first()).toBeVisible({ timeout: 10000 });
  });

  test('devrait pouvoir ajouter un article en favori', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // On attend qu'un bouton favori apparaisse
    const favoriteButton = page.locator('button[aria-label*="favori"], button[class*="favorite"], button[class*="Favorite"]').first();
    await expect(favoriteButton).toBeVisible({ timeout: 10000 });

    // On clique sur le bouton favori
    await favoriteButton.click();

    // On attend un court instant pour que l'action se traite
    await page.waitForTimeout(1000);
  });

  test('devrait pouvoir ajouter un commentaire sur un article', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // On clique sur le premier article pour voir le détail
    const firstArticle = page.locator('a.article-card-link, a[class*="article-card"]').first();
    await expect(firstArticle).toBeVisible({ timeout: 10000 });
    await firstArticle.click();

    // On attend que la page de détail charge
    await page.waitForURL(/\/\d+/, { timeout: 10000 });

    // On cherche le champ de commentaire et on écrit dedans
    const commentInput = page.locator('textarea.comments__textarea, textarea[placeholder*="commentaire" i]').first();
    await expect(commentInput).toBeVisible({ timeout: 10000 });
    await commentInput.fill('Ceci est un commentaire de test E2E');

    // On soumet le commentaire
    const submitButton = page.locator('button[type="submit"], button:has-text("Envoyer"), button:has-text("Publier"), button:has-text("Commenter")').first();
    await submitButton.click();

    // On vérifie que le commentaire apparaît
    await expect(page.getByText('Ceci est un commentaire de test E2E').first()).toBeVisible({ timeout: 5000 });
  });

});
