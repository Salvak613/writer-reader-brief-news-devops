import { AppDataSource } from "../config/database.js";
import { Article } from "../models/article.model.js";
import { Repository } from "typeorm";

class ArticleRepository {
  private repository: Repository<Article>;

  constructor() {
    this.repository = AppDataSource.getRepository(Article);
  }

  async findById(id: number): Promise<Article | null> {
    return await this.repository.findOneBy({ id });
  }

  async update(id: number, data: Partial<Article>): Promise<Article | null> {
    await this.repository.update(id, data);
    return await this.findById(id);
  }
}

export const articleRepository = new ArticleRepository();
