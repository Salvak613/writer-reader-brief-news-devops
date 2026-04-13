import { test, expect } from '@playwright/test';

// Ces tests nécessitent que l'app tourne (docker compose up)

test.describe('Writer Frontend', () => {

  test('devrait afficher la page d\'accueil avec les articles', async ({ page }) => {
    await page.goto('http://localhost:5174');

    // On vérifie que la page ne montre pas une erreur
    await expect(page.locator('body')).not.toHaveText(/Cannot GET/);

    // On vérifie qu'il y a du contenu (titre de page ou articles)
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('devrait pouvoir accéder au formulaire de création et remplir les champs', async ({ page }) => {
    const timestamp = Date.now();
    await page.goto('http://localhost:5174');

    // On cherche un lien ou bouton pour créer un article
    const createLink = page.locator('a:has-text("Nouvel article")').first();
    await expect(createLink).toBeVisible({ timeout: 10000 });
    await createLink.click();

    // On attend que le formulaire charge
    await page.waitForTimeout(2000);

    // On vérifie que les champs du formulaire sont présents
    const titleInput = page.locator('#title, input[placeholder*="Titre" i]').first();
    await expect(titleInput).toBeVisible({ timeout: 5000 });

    // On remplit le formulaire
    await titleInput.fill(`Article de test E2E ${timestamp}`);

    const subtitleInput = page.locator('#subtitle, input[placeholder*="Sous-titre" i]').first();
    await subtitleInput.fill(`Sous-titre de test ${timestamp}`);

    const subheadInput = page.locator('#subhead, textarea[placeholder*="Chapeau" i], textarea[placeholder*="introduction" i]').first();
    await subheadInput.fill(`Chapeau de test pour l'article E2E ${timestamp}`);

    const bodyInput = page.locator('#body, textarea[placeholder*="contenu" i], textarea[placeholder*="Rédigez" i]').first();
    await bodyInput.fill(`Ceci est le contenu complet de l'article de test E2E ${timestamp}. Il doit être suffisamment long pour passer la validation.`);

    // On sélectionne une catégorie
    const categorySelect = page.locator('#category, select').first();
    await categorySelect.waitFor({ state: 'visible', timeout: 5000 });
    await categorySelect.selectOption({ index: 1 });

    // On soumet le formulaire
    const submitButton = page.locator('button[type="submit"], button:has-text("Enregistrer")').first();
    await expect(submitButton).toBeVisible();
    await submitButton.click();

    // On ferme la modal de confirmation
    const modalButton = page.locator('button:has-text("Compris")');
    await expect(modalButton).toBeVisible({ timeout: 10000 });
    await modalButton.click();

    // On vérifie que l'article a bien été créé (redirection vers la liste)
    await page.waitForURL('http://localhost:5174/articles', { timeout: 10000 });
    await expect(page.getByText(`Article de test E2E ${timestamp}`).first()).toBeVisible({ timeout: 10000 });
  });

});
