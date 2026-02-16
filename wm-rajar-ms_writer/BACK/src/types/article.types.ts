export interface CreateArticleDTO {
  title: string;
  subtitle: string;
  subhead: string;
  body: string;
}

export interface UpdateArticleDTO {
  title?: string;
  subtitle?: string;
  subhead?: string;
  body?: string;
}
