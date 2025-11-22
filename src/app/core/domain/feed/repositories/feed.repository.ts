import { Post } from '../models/feed.model';

export abstract class FeedRepository {
  abstract getAll(): Post[];
  abstract save(posts: Post[]): void;
  abstract addPost(content: string): void;
  abstract toggleLike(id: number): void;
  abstract setReaction(id: number, emoji: string): void;
  abstract addComment(postId: number, text: string): void;
  abstract sharePost(id: number): void;
  abstract deletePost(id: number): void;
}
