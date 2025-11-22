export interface Comment {
  id: number;
  author: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: number;
  author: string;
  authorId: number;
  username?: string;
  avatarUrl?: string;
  content: string;
  createdAt: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
  shares: number;
  reactions?: Record<string, number>;
  userReaction?: string;
}
