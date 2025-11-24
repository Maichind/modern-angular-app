import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Post } from '@core/domain/feed/models/feed.model';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { Component, HostListener, inject, Input } from '@angular/core';
import { FeedFacade } from '@core/application/feed/services/feed.facade';
import { AuthFacade } from '@core/application/auth/services/auth.facade';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, FormsModule, TimeAgoPipe, LucideAngularModule],
  template: `
    <article class="bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-5 shadow-sm border  
        border-gray-100/50 dark:border-gray-800/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 animate-fadeInUp">
        <div class="flex items-center gap-3 mb-3">
            <div class="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-400 
                flex items-center justify-center text-white font-bold text-lg shadow-sm overflow-hidden">
                @if (post.avatarUrl) {
                    <img [src]="post.avatarUrl" alt="avatar" class="w-full h-full object-cover" />
                } @else {
                    {{ post.author[0] }}
                }
            </div>
            <div class="flex flex-col">
                <button 
                    (click)="goProfile()" 
                    class="font-semibold text-gray-800 dark:text-gray-100 cursor-pointer hover:text-blue-500"
                >
                    {{ post.author }}
                </button>
                <span class="text-xs text-gray-400">{{ post.createdAt | timeAgo }}</span>
            </div>
        </div>

        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 whitespace-pre-line">{{ post.content }}</p>

        <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div class="flex items-center gap-6">
                <div 
                    class="relative group" 
                    (mouseenter)="openReactions()" 
                    (mouseleave)="closeReactions()"
                >
                    <button 
                        title="Reaccionar"
                        (click)="likePost(post)" 
                        class="flex items-center gap-1 transition-colors cursor-pointer 
                            hover:text-red-500 active:scale-95 animate-pulseOnce"
                    >
                        @if (post.reactions && totalReactions(post) > 0) {
                            <div class="flex -space-x-1">
                                @for (emoji of topReactions(post); track $index) {
                                    <span class="text-lg">{{ emoji }}</span>
                                }
                            </div>
                        } @else {                            
                            <lucide-icon name="heart" class="w-4 h-4"></lucide-icon>
                        }
                        <span>{{ totalReactions(post) > 0 ? totalReactions(post) : "" }}</span>
                    </button>

                    <!-- Reacciones -->
                    @if(showReactions) {
                        <div class="reactions-menu absolute -top-12 left-1/2 -translate-x-1/2 bg-white/80 dark:bg-gray-800/70 
                            backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/40 rounded-full shadow-lg 
                            px-3 py-2 flex flex-col gap-3 animate-floatUp"
                        >
                            <div class="flex items-center gap-3 justify-center text-xl">
                                @for (r of reactions; track r) {
                                    <button                                    
                                        (click)="react(r)"
                                        [title]="reactionLabel(r)"
                                        [class.scale-110]="post.userReaction === r"
                                        class="transition-transform hover:scale-125 active:scale-95 cursor-pointer"
                                    >
                                        {{ r }}
                                    </button>
                                }
                            </div>
                            <!-- @if (post.userReaction) {
                                <p class="text-center text-sm mt-1 text-gray-500 dark:text-gray-400">
                                    {{ reactionLabel(post.userReaction) }}
                                </p>
                            } -->
                        </div>
                    }
                </div>
                <button 
                    (click)="toggleComments()"
                    class="flex items-center gap-1 hover:text-green-500 transition-colors active:scale-95 cursor-pointer"
                >
                    <lucide-icon name="message-circle" class="w-4 h-4"></lucide-icon> 
                    <span>{{ post.comments.length > 0 ? post.comments.length : "" }}</span>
                </button>                
                <button 
                    (click)="sharePost()" 
                    class="hover:text-purple-500 flex items-center gap-1 transition-colors active:scale-95 cursor-pointer"
                >
                    <lucide-icon name="repeat-2" class="w-4 h-4"></lucide-icon> 
                    <span>{{ post.shares > 0 ? post.shares : "" }}</span>
                </button>
            </div>
            @if (post.authorId === (authFacade.user()?.id || 0)){
                <button 
                    (click)="deletePost()" 
                    class="flex items-center hover:text-red-500 transition-colors active:scale-95 cursor-pointer"
                ><lucide-icon name="trash-2" class="w-4 h-4"></lucide-icon>
                </button>
            }
        </div>   

        <!-- comentarios -->
        @if (showComments){
            <div class="mt-4 border-t border-gray-200 dark:border-gray-700 pt-3 animate-expandFade origin-top">
                @for (comment of post.comments; track comment.id) {
                    <div class="flex items-start gap-2 group animate-fadeInUp">
                        <div
                            class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 
                                text-white flex items-center justify-center font-bold text-xs shadow-sm"
                        >
                            {{ comment.author[0] }}
                        </div>
                        <div
                            class="flex-1 bg-gray-50/80 dark:bg-gray-800/60 rounded-2xl p-2 border 
                            border-gray-100 dark:border-gray-700 shadow-sm relative transition-all duration-300"
                        >
                            <div class="flex justify-between items-start">
                                <div>
                                    <span class="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                                    {{ comment.author }}
                                    </span>
                                    <span class="text-xs text-gray-400 ml-1">{{ comment.createdAt | timeAgo }}</span>
                                </div>
                                <button
                                    (click)="deleteComment(comment.id)"
                                    class="text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                                    title="Eliminar comentario"
                                >
                                    <lucide-icon name="trash-2" class="w-3.5 h-3.5"></lucide-icon>
                                </button>
                            </div>
                            <p class="text-sm text-gray-700 dark:text-gray-200 leading-snug">{{ comment.text }}</p>
                        </div>
                    </div>
                }
                <div class="flex items-center gap-2 mt-2">
                    <input
                        [(ngModel)]="commentText"
                        placeholder="Escribe un comentario..."
                        class="flex-1 bg-gray-50/80 dark:bg-gray-800/60 rounded-xl px-3 py-2 
                            border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 
                            placeholder-gray-400 dark:placeholder-gray-500 
                            focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all duration-200"
                    />
                    <button
                        (click)="addComment()"
                        class="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-xl 
                            hover:bg-blue-600 active:scale-95 transition-all duration-150 shadow-sm cursor-pointer"
                    >
                        Comentar
                    </button>
                </div>
            </div>
        }
    </article>
  `,
  styleUrl: './post-card.scss'
})
export class PostCard {
  @Input() post!: Post;
  commentText = '';
  /* eslint-disable @typescript-eslint/no-explicit-any */
  hideTimeout: any;
  /* eslint-enable  @typescript-eslint/no-explicit-any */
  showComments = false;
  showReactions = false;
  public router = inject(Router);
  public authFacade = inject(AuthFacade);
  private feedFacade = inject(FeedFacade);
  reactions = ['👍', '❤️', '😆', '😮', '😢', '😡'];

  goProfile() {
    this.router.navigate(['/profile', this.post?.username]);
  }

  likePost(post: Post) {
    this.react(post.userReaction ?? '❤️');
    clearTimeout(this.hideTimeout);
    this.showReactions = false;
  }

  openReactions() {
    this.hideTimeout = setTimeout(() => this.showReactions = true, 1300);
  }

  closeReactions() {
    clearTimeout(this.hideTimeout);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.reactions-menu')) {
      this.showReactions = false;
    }
  }

  react(emoji: string) {
    this.feedFacade.setReaction(this.post.id, emoji);
    this.showReactions = false;
  }

  reactionLabel(r: string): string {
    switch (r) {
      case '👍': return 'me gusta';
      case '❤️': return 'me encanta';
      case '😆': return 'me divierte';
      case '😮': return 'me asombra';
      case '😢': return 'me entristece';
      case '😡': return 'me enoja';
      default: return '';
    }
  }

  totalReactions(post: Post): number {
    return Object.values(post.reactions || {}).reduce((a, b) => a + b, 0);
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  topReactions(post: Post): string[] {
    const entries = Object.entries(post.reactions || {})
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([emoji]) => emoji);
    return entries;
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  toggleComments() {
    this.showComments = !this.showComments;
  }

  addComment() {
    if (!this.commentText.trim()) return;
    this.feedFacade.addComment(this.post.id, this.commentText.trim());
    this.commentText = '';
  }

  deleteComment(commentId: number) {
    this.feedFacade.deleteComment(this.post.id, commentId);
  }

  sharePost() {
    this.feedFacade.sharePost(this.post.id);
  }

  deletePost() {
    this.feedFacade.deletePost(this.post.id);
  }
}
