import { inject, Injectable, signal } from '@angular/core';
import { ThemeService } from '@core/infrastructure/theme/services/theme.service';

@Injectable({ providedIn: 'root' })
export class ThemeFacade {
  private themeService = inject(ThemeService);

  theme = this.themeService.theme;
  themeIcon = () => this.themeService.themeIcon();
  themeLabel = () => this.themeService.themeLabel();

  initialize() {
    this.themeService.initializeTheme();
    this.themeService.listenSystemThemeChange();
  }

  cycle() {
    this.themeService.cycleTheme();
  }
}
