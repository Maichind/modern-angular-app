import { App } from './app/app';
import { Store } from '@ngrx/store';
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';
import { AuthActions } from './app/presentation/auth/store/auth.actions';

bootstrapApplication(App, appConfig)
  .then((ref) => {
    const store = ref.injector.get(Store);
    const data = localStorage.getItem('auth');
    if (data) {
      try {
        const session = JSON.parse(data);
        store.dispatch(
          AuthActions.loadSession({ user: session.user, token: session.token })
        );
      } catch (err) {
        console.warn('Error al leer sesión:', err);
      }
    }
  })
  .catch((err) => console.error(err));
