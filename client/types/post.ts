// export interface PostMetadata {
//   title: string;
//   description: string;
//   images?: string[];
//   createdAt: string;
// }

// export interface PostwithSingleMetadata {
//   title: string;
//   description: string;
//   image?: string;
//   tags?: string[];
// }
export interface PostwithSingleMetadata {
  title: string;
  description: string;
  image?: string; // Keep this as image (singular)
  tags?: string[];
}

export interface PostMetadata {
  title: string;
  description: string;
  images?: string[];
  tags?: string[];
}
export interface Post {
  id: number;
  author: string;
  contentId: string;
  timeStamp: number;
  likes: number;
}
