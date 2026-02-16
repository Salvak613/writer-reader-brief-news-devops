export interface Article {
  id: number;
  title: string;
  subtitle: string;
  subhead: string;
  body: string;
  publish_date: string; // ISO string depuis l'API
}
