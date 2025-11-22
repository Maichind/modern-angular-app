import { 
  isDevMode,
  ApplicationConfig, 
  provideZoneChangeDetection, 
  provideBrowserGlobalErrorListeners, 
  importProvidersFrom
} from '@angular/core';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { reducers } from './state/app.state';
import { provideEffects } from '@ngrx/effects';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from '@core/infrastructure/auth/interceptors/auth.interceptor';
import { LucideAngularModule, Heart, MessageCircle, Repeat2, Share2, Trash2, Camera, LogIn, 
  UserPlus, Sun, Moon, MonitorCog, Menu, X, Image, Smile, Link2 } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideRouter(routes),
    provideStore(reducers),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    importProvidersFrom(
      LucideAngularModule.pick({ Heart, MessageCircle, Repeat2, Share2, 
        Trash2, Camera, LogIn, UserPlus, Sun, Moon, MonitorCog, Menu, X, Image, Smile, Link2 })
    )
  ]
};
