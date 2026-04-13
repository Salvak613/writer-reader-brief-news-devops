import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: ".env.test", override: true }); // Pour use les variable de tst

import { connectDB, AppDataSource } from "../config/database.js";
import { app } from "../index.js";

describe("API Integration Tests - Articles (vraie BDD)", () => {
  //connexion  bddd
  beforeAll(async () => {
    await connectDB();
  }, 15000);

  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  it("GET /health devrait retourner un status 200", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "ok");
  });

  it("GET /api/articles devrait retourner un status 200 avec une liste", async () => {
    const response = await request(app).get("/api/articles");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("articles");
    expect(response.body).toHaveProperty("pagination");
    expect(Array.isArray(response.body.articles)).toBe(true);
  });

  it("GET /api/articles devrait retourner des articles avec les bons champs", async () => {
    const response = await request(app).get("/api/articles");

    expect(response.status).toBe(200);
    if (response.body.articles.length > 0) {
      const article = response.body.articles[0];
      expect(article).toHaveProperty("title");
      expect(article).toHaveProperty("subtitle");
      expect(article).toHaveProperty("body");
    }
  });

  it("GET /api/articles/:id avec un ID inexistant devrait retourner 404", async () => {
    const response = await request(app).get("/api/articles/99999");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });

  it("GET /api/articles/:id avec un ID invalide devrait retourner 400", async () => {
    const response = await request(app).get("/api/articles/abc");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("POST /api/articles sans body devrait retourner 400", async () => {
    const response = await request(app).post("/api/articles").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
