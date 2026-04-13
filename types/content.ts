export interface Content {
  id: string;
  title: string;
  body: string;
  type: 'blog' | 'news';
  createdAt: string;
  updatedAt: string;
}
