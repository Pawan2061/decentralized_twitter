export interface PostMetadata {
  title: string;
  description: string;
  images?: string[];
  createdAt: string;
}

export interface Post {
  id: number;
  author: string;
  contentId: string;
  timeStamp: number;
  likes: number;
}
