import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { User } from '@core/domain/user/models/user.model';
import { AuthFacade } from '@core/application/auth/services/auth.facade';
import { FeedFacade } from '@core/application/feed/services/feed.facade';
import { UserRepository } from '@core/domain/user/repositories/user.repository';

@Injectable({ providedIn: 'root' })
export class UserProfileService extends UserRepository {
  router = inject(Router);
  authFacade = inject(AuthFacade);
  feedFacade = inject(FeedFacade);
  private readonly key = 'fakeUsers';

  getAllUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  getUserByUsername(username: string): User | undefined {
    return this.getAllUsers().find(u => u.username === username);
  }

  updateUserProfile(updatedUser: User, redirect = true): void {
    const users = this.getAllUsers();
    const posts = this.feedFacade.posts();
    const auth = this.authFacade.getSession();

    const isTaken = users.some(
      u => u.username === updatedUser.username && u.id !== updatedUser.id
    );

    if (isTaken && redirect) {
      console.log('El nombre de usuario ya está en uso.');
      return;
    }

    const idx = users.findIndex(u => u.id === updatedUser.id);
    if (idx > -1) {
      users[idx] = { ...users[idx], ...updatedUser };
      localStorage.setItem(this.key, JSON.stringify(users));
    }
  
    if(redirect) {
      const updatedPosts = posts.map(post => 
        post.authorId === updatedUser.id 
          ? { ...post, author: updatedUser.name, username: updatedUser.username, avatarUrl: updatedUser.avatarUrl }
          : post
        );
      this.feedFacade.savePosts(updatedPosts);      
    }

    if (auth?.user?.id === updatedUser.id) {
      const newAuth = { ...auth, user: updatedUser };
      localStorage.setItem('auth', JSON.stringify(newAuth));
    }

    if (redirect){
      this.router.navigate(['/profile', updatedUser?.username]);
    }
  }
}
