import { Injectable, signal } from '@angular/core';
import { Theme } from '@core/domain/auth/value-objects/theme.vo';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = signal<Theme>('system');
  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  initializeTheme() {
    const saved = localStorage.getItem('theme') as Theme | null;
    this.theme.set(saved ?? 'system');
    this.applyTheme(this.getEffectiveTheme());
  }

  listenSystemThemeChange() {
    this.mediaQuery.addEventListener('change', (e) => {
      if (this.theme() === 'system') {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  private applyTheme(theme: Theme) {
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && this.mediaQuery.matches);

    document.documentElement.classList.toggle('dark', isDark);
  }

  cycleTheme() {
    const nextTheme: Theme =
      this.theme() === 'light'
        ? 'dark'
        : this.theme() === 'dark'
        ? 'system'
        : 'light';

    this.theme.set(nextTheme);
    localStorage.setItem('theme', nextTheme);
    this.applyTheme(this.getEffectiveTheme());
  }

  private getEffectiveTheme(): Theme {
    return this.theme() === 'system'
      ? this.mediaQuery.matches
        ? 'dark'
        : 'light'
      : this.theme();
  }

  themeIcon(): string {
    switch (this.theme()) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌑';
      default:
        return '💠';
    }
  }

  themeLabel(): string {
    switch (this.theme()) {
      case 'light':
        return 'Modo claro';
      case 'dark':
        return 'Modo oscuro';
      default:
        return 'Tema del sistema';
    }
  }
}
