import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PostCard } from '../components/post-card';
import { CreatePost } from '../components/create-post';
import { FeedFacade } from '@core/application/feed/services/feed.facade';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, CreatePost, PostCard],
  template: `
    <div class="max-w-4xl mx-auto flex flex-col gap-6">
      <app-create-post></app-create-post>

      <div class="flex flex-col gap-4 mt-4">
        @for (post of feedFacade.posts(); track post.createdAt) {
          <app-post-card [post]="post"></app-post-card>
        }
      </div>
    </div>
  `
})
export class Feed {
  feedFacade = inject(FeedFacade);
}
