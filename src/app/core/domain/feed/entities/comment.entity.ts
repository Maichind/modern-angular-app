export class Comment {
  constructor(
    public readonly id: number,
    public readonly authorId: number,
    public readonly text: string,
    public readonly createdAt: Date,
  ) {}
}
