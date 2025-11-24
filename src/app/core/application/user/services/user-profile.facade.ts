import { inject, Injectable, signal } from '@angular/core';
import { User } from '@core/domain/user/models/user.model';
import { FeedFacade } from '@core/application/feed/services/feed.facade';
import { AuthFacade } from '@core/application/auth/services/auth.facade';
import { UserProfileService } from '@core/infrastructure/user/repositories/user-profile.repository';
import { Post } from '@core/domain/feed/models/feed.model';

@Injectable({ providedIn: 'root' })
export class UserProfileFacade {
  posts = signal<Post[]>([]);
  user = signal<User | null>(null);
  feedFacade = inject(FeedFacade);
  authFacade = inject(AuthFacade);
  profileService = inject(UserProfileService);

  loadProfile(username: string) {
    const user = this.profileService.getUserByUsername(username);
    this.user.set(user || null);
    this.posts.set(
      this.feedFacade.posts().filter(p => p.author === user?.name)
    );
  }

  updateProfile(data: Partial<User>, redirect = true) {
    const current = this.user();
    if (!current) return;

    const updated = { ...current, ...data };
    this.profileService.updateUserProfile(updated, redirect);
    this.user.set(updated);
  }

  isCurrentUser(): boolean {
    return this.authFacade.user()?.id === this.user()?.id;
  }

  followUser(targetId: number) {
    const users = this.profileService.getAllUsers();
    let current = this.user();
    if (!current) return;

    const target = users.find(u => u.id === targetId);
    if (!target) return;

    if (!current.following?.includes(targetId)) {
      current = {
        ...current,
        following: [...(current.following || []), targetId]
      }
      target.followers?.push(current.id);
    }

    this.updateProfile(current, false);
    this.updateProfile(target, false);
  }
  
  unfollowUser(targetId: number) {
    const users = this.profileService.getAllUsers();
    let current = this.user();
    if (!current) return;

    const target = users.find(u => u.id === targetId);
    if (!target) return;
    current = {
      ...current,
      following: current.following?.filter((id: number) => id !== targetId)
    }
    target.followers = target.followers?.filter(id => id !== current.id);

    this.updateProfile(current, false);
    this.updateProfile(target, false);
  }
  
  isFollowing(targetId: number): boolean {
    const current = this.user();
    return current?.following?.includes(targetId) ?? false;
  }
}
