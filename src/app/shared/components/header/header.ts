import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeFacade } from '@core/application/theme/theme.facade';
import { AuthFacade } from '@core/application/auth/services/auth.facade';
import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <header class="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/70 
      dark:border-gray-800/70 shadow-sm transition-colors">
      <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        <!-- Logo -->
        <a 
          (click)="goHome()" 
          class="text-xl font-bold text-gray-800 dark:text-gray-100 cursor-pointer"
        >
          <span class="text-blue-600 dark:text-blue-400">Social</span> App
        </a>

        <!-- Right section -->
        <div class="flex items-center gap-4">
          <!-- Theme switch -->
          <button
            (click)="themeFacade.cycle()"
            [attr.title]="themeFacade.themeLabel()"
            class="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-transform 
              hover:scale-110 cursor-pointer"
          >
            @if(themeFacade.themeIcon() === '☀️') {
              <lucide-icon name="sun" class="w-5 h-5"></lucide-icon>
            } @else if (themeFacade.themeIcon() === '🌑') {
              <lucide-icon name="moon" class="w-5 h-5"></lucide-icon>
            } @else {
              <lucide-icon name="monitor-cog" class="w-5 h-5"></lucide-icon>
            }            
          </button>

          <!-- Usuario -->
          @if (user()) {
            <div class="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 dark:bg-gray-800/60 
              shadow-sm border border-gray-100 dark:border-gray-700">
              <div class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
                {{ user().name[0] }}
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-200">{{ user().name }}</span>
            </div>
          }

          <!-- Burger Menu -->
          <button
            class="md:hidden w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300"
            (click)="toggleMenu()"
            aria-label="Abrir menú"
          >
            @if (!isOpen()) { 
              <lucide-icon name="menu"></lucide-icon>              
            } @else {
              <lucide-icon name="x"></lucide-icon>              
            }
          </button>
        </div>
      </div>

      <!-- Mobile nav -->
      <nav
        class="md:hidden flex flex-col px-6 gap-4 bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl font-medium text-gray-700 
          dark:text-gray-200 border-t border-gray-200/60 dark:border-gray-800/60 transition-all duration-300 overflow-hidden"
        [class.max-h-60]="isOpen()"
        [class.opacity-100]="isOpen()"
        [class.py-3]="isOpen()"
        [class.max-h-0]="!isOpen()"
        [class.opacity-0]="!isOpen()"
        [class.py-0]="!isOpen()"
      >
        <a
          routerLink="/feed"
          routerLinkActive="text-blue-600 font-semibold"
          (click)="goHome()"
          class="hover:text-blue-500 transition-colors duration-300"
        >Inicio</a>

        <a
          routerLink="/profile"
          routerLinkActive="text-blue-600 font-semibold"
          (click)="goProfile()"
          class="hover:text-blue-500 transition-colors duration-300"
        >Perfil</a>

        @if (user()) {
          <button
            (click)="logout()"
            class="text-left text-red-500 hover:text-red-600 transition-colors duration-300"
          >
            Cerrar sesión
          </button>
        }
      </nav>
    </header>
  `
})
export class Header {
  isOpen = signal(false);
  private router = inject(Router);
  private authFacade = inject(AuthFacade);
  private elementRef = inject(ElementRef);
  public themeFacade = inject(ThemeFacade);
  public user = this.authFacade.user;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.isOpen() && !this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  ngOnInit() {
    this.themeFacade.initialize();
  }

  goHome () {
    this.closeMenu();
    this.router.navigate(['/feed']);
  }
  
  goProfile () {
    this.closeMenu();
    this.router.navigate(['/profile', this.user()?.username]);
  }

  toggleMenu() {
    this.isOpen.set(!this.isOpen());
  }

  closeMenu() {
    this.isOpen.set(false);
  }

  logout() {
    this.authFacade.logout();
  }
}
