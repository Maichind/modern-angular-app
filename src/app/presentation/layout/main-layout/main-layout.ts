import { Router, RouterOutlet } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import { Header } from "../../../shared/components/header/header";
import { Footer } from "../../../shared/components/footer/footer";
import { AuthFacade } from '@core/application/auth/services/auth.facade';
import { UserProfileFacade } from '@core/application/user/services/user-profile.facade';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  template: `
    <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 
      dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      <app-header class="sticky top-0 left-0 z-20"></app-header>

      <main class="flex-1 py-8 px-4 sm:px-6">
        <div class="grid grid-cols-7 max-w-7xl mx-auto gap-6">

          <!-- left -->
          <aside class="hidden sm:block sm:col-span-3 lg:col-span-2 bg-white/60 dark:bg-gray-800/60 
            backdrop-blur-md rounded-2xl shadow-sm border border-gray-200/70 dark:border-gray-700/70 
            p-4 sticky top-20 h-fit transition-all duration-300">
            <nav class="flex flex-col space-y-2 text-gray-700 dark:text-gray-200">
              <button 
                (click)="goHome()" 
                class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50 
                dark:hover:bg-blue-950/40 transition cursor-pointer">
                🏠 <span>Inicio</span>
              </button>
              <button 
                (click)="goProfile()" 
                class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50 
                dark:hover:bg-blue-950/40 transition cursor-pointer">
                👤 <span>Perfil</span>
              </button>
              <hr class="border-gray-200 dark:border-gray-700 my-2">
              <button 
                (click)="logout()" 
                class="flex items-center gap-3 px-3 py-2 rounded-xl text-red-500 
                hover:bg-red-50 dark:hover:bg-red-950/30 transition cursor-pointer">
                🚪 <span>Cerrar sesión</span>
              </button>
            </nav>
          </aside>

          <!-- Feed -->
          <section class="col-span-7 sm:col-span-4 lg:col-span-3">
            <div class="max-w-2xl mx-auto flex flex-col">
              <router-outlet></router-outlet>              
            </div>
          </section>

          <!-- Right -->
          <aside class="hidden lg:block lg:col-span-2 space-y-4">
            @if (showInfoProfile()) {
              <div
                class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl shadow border border-gray-200/70 
                dark:border-gray-700/70 p-5 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 "
              >
                <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-3">Tu perfil</h3>
                
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-400 
                    text-white flex items-center justify-center font-bold text-lg shadow overflow-hidden">
                    @if (userData?.avatarUrl) {
                      <img [src]="userData?.avatarUrl" alt="avatar" class="w-full h-full object-cover" />
                    } @else {
                      {{ userData?.name[0] }}
                    }
                  </div>
                  <div>
                    <p class="font-medium">{{ userData?.name }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ '@' + userData?.username }}</p>
                  </div>
                </div>
  
                <button 
                  (click)="goProfile()"
                  class="w-full py-2 mt-1 text-sm font-medium text-blue-600 dark:text-blue-400
                  bg-blue-50/70 dark:bg-blue-950/30 rounded-lg hover:bg-blue-100/80 
                  dark:hover:bg-blue-900/50 cursor-pointer transition-colors"
                >
                  Ver perfil
                </button>
              </div>            
            }

            <section class="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border 
              border-gray-200/70 dark:border-gray-700/70">
              <h3 class="font-semibold mb-3">A quién seguir</h3>

              <div class="flex flex-col gap-3">
                @for (user of users; track user.id) {
                  <div
                    class="flex items-center justify-between bg-white/60 dark:bg-gray-800/60 rounded-xl px-3 py-2 
                    hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 animate-fadeInUp"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center 
                        justify-center text-white font-bold text-sm shadow"
                      >
                        {{ user.name[0] }}
                      </div>
                      <span class="font-medium">{{ user?.name }}</span>
                    </div>
                    <button 
                      class="bg-blue-50 dark:bg-blue-950/30 px-2 py-1 rounded-lg hover:bg-blue-100 
                      dark:hover:bg-blue-900/50 text-blue-500 font-medium text-sm transition-colors cursor-pointer"
                      (click)="!isFollowing(user.id) ? follow(user.id) : unfollow(user.id)"
                    >
                      {{ !isFollowing(user.id) ? 'Seguir' : 'Siguiendo'}}
                    </button>
                  </div>
                }
              </div>
            </section>
          </aside>     
               
        </div>
      </main>

      <app-footer></app-footer>
    </div>
  `
})
export class MainLayout {
  router = inject(Router);
  showInfoProfile = signal(true);
  authFacade = inject(AuthFacade);
  userData = this.authFacade.user();
  profileFacade = inject(UserProfileFacade);
  users = this.authFacade.getUsers().filter(u => u.id !== this.userData?.id);

  goHome () {
    this.showInfoProfile.set(true);
    this.router.navigate(['/feed']);
  }

  goProfile () {
    this.showInfoProfile.set(false);
    this.router.navigate(['/profile', this.userData?.username]);
  }

  follow(id: number) {
    this.profileFacade.followUser(id);
  }
  
  unfollow(id: number) {
    this.profileFacade.unfollowUser(id);
  }

  isFollowing = (id: number): boolean => this.profileFacade.isFollowing(id);

  logout() {
    this.authFacade.logout();
  }
}
