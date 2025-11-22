import { Comment } from './comment.entity';

export class Post {
  constructor(
    public readonly id: number,
    public readonly authorId: number,
    public readonly content: string,
    public readonly createdAt: Date,
    public readonly likes: number = 0,
    public readonly shares: number = 0,
    public readonly reactions: Record<string, number> = {},
    public readonly comments: Comment[] = []
  ) {}
}
