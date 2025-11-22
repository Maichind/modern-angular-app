import { inject, Injectable } from '@angular/core';
import { Post } from '@core/domain/feed/models/feed.model';
import { LocalFeedRepository } from '@core/infrastructure/feed/repositories/local-feed.repository';

@Injectable({ providedIn: 'root' })
export class FeedFacade {
  private repo = inject(LocalFeedRepository);
  posts = this.repo.posts;

  addPost(content: string) {
    this.repo.addPost(content);
  }

  savePosts(posts: Post[]) {
    this.repo.save(posts);
  }

  toggleLike(id: number) {
    this.repo.toggleLike(id);
  }

  setReaction(id: number, emoji: string) {
    this.repo.setReaction(id, emoji);
  }

  addComment(postId: number, text: string) {
    this.repo.addComment(postId, text);
  }

  deleteComment(postId: number, commentId: number) {
    this.repo.deleteComment(postId, commentId);
  }

  sharePost(id: number) {
    this.repo.sharePost(id);
  }

  deletePost(id: number) {
    this.repo.deletePost(id);
  }
}
