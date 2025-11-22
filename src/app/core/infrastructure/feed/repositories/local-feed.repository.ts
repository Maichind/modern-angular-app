import { inject, Injectable, signal } from '@angular/core';
import { Post } from '@core/domain/feed/models/feed.model';
import { AuthFacade } from '@core/application/auth/services/auth.facade';
import { FeedRepository } from '@core/domain/feed/repositories/feed.repository';

@Injectable({ providedIn: 'root' })
export class LocalFeedRepository extends FeedRepository {
  posts = signal<Post[]>([]);
  private auth = inject(AuthFacade);

  constructor() {
    super();
    const saved = localStorage.getItem('posts');
    if (saved) this.posts.set(JSON.parse(saved));

    window.addEventListener('storage', (e) => {
      if (e.key === 'posts') {
        this.posts.set(e.newValue ? JSON.parse(e.newValue) : []);
      }
    });
  }

  getAll(): Post[] {
    return this.posts();
  }

  save(posts: Post[]): void {
    this.posts.set(posts);
    localStorage.setItem('posts', JSON.stringify(posts));
  }

  addPost(content: string): void {
    const currentUser = this.auth.user();
    const newPost: Post = {
      id: Date.now(),
      author: currentUser?.name ?? 'Tú',
      authorId: currentUser?.id ?? 0,
      avatarUrl: '',
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      liked: false,
      comments: [],
      shares: 0,
    };
    this.save([newPost, ...this.posts()]);
  }

  toggleLike(id: number): void {
    this.save(
      this.posts().map(post =>
        post.id === id
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  }

  setReaction(id: number, emoji: string): void {
    this.save(
      this.posts().map(post => {
        if (post.id !== id) return post;

        const reactions = { ...post.reactions };
        if (post.userReaction) {
          const prev = post.userReaction;
          reactions[prev] = Math.max((reactions[prev] || 1) - 1, 0);
        }

        let newUserReaction: string | undefined;
        if (post.userReaction !== emoji) {
          reactions[emoji] = (reactions[emoji] || 0) + 1;
          newUserReaction = emoji;
        }

        return { ...post, reactions, userReaction: newUserReaction };
      })
    );
  }

  addComment(postId: number, text: string): void {
    this.save(
      this.posts().map(post =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(),
                  author: 'Tú',
                  text,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : post
      )
    );
  }

  deleteComment(postId: number, commentId: number) {
    this.save(
      this.posts().map(post => 
        post.id === postId
          ? {
              ...post,
              comments: post.comments.filter(comment => comment.id !== commentId),
            }
          : post
      )
    );
  }

  sharePost(id: number): void {
    this.save(
      this.posts().map(post =>
        post.id === id ? { ...post, shares: post.shares + 1 } : post
      )
    );
  }

  deletePost(id: number): void {
    this.save(this.posts().filter(post => post.id !== id));
  }
}
