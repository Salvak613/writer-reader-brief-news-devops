import { describe, it, expect } from "vitest";
import request from "supertest";

const dotenv = await import("dotenv");
dotenv.config();
dotenv.config({ path: ".env.test", override: true }); //  les var teeest

const app = (await import("../index.js")).default;

describe("API Integration Tests - Reader (vraie BDD)", () => {
  it("GET /articles devrait retourner 200 avec une liste", async () => {
    const response = await request(app).get("/articles");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("articles");
    expect(response.body).toHaveProperty("pagination");
    expect(Array.isArray(response.body.articles)).toBe(true);
  });

  it("GET /articles devrait retourner des articles avec les bons champs", async () => {
    const response = await request(app).get("/articles");

    expect(response.status).toBe(200);
    if (response.body.articles.length > 0) {
      const article = response.body.articles[0];
      expect(article).toHaveProperty("title");
      expect(article).toHaveProperty("subtitle");
      expect(article).toHaveProperty("body");
    }
  });

  it("GET /articles/:id avec un ID inexistant devrait retourner 404", async () => {
    const response = await request(app).get("/articles/99999");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });

  it("GET /articles/:id avec un ID invalide devrait retourner 400", async () => {
    const response = await request(app).get("/articles/abc");

    expect(response.status).toBe(400);
  });

  it("GET /articles/favorites devrait retourner 200", async () => {
    const response = await request(app).get("/articles/favorites");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("POST /articles/:id/comments sans contenu devrait retourner 400", async () => {
    const response = await request(app).post("/articles/1/comments").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
