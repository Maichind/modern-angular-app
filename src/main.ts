import { App } from './app/app';
import { Store } from '@ngrx/store';
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';
import { AuthActions } from './app/presentation/auth/store/auth.actions';
import { PORTFOLIO_SESSION } from '@core/infrastructure/mocks/portfolio-session.mock';

bootstrapApplication(App, appConfig)
  .then((ref) => {
    const store = ref.injector.get(Store);

    // 👉 SOLO PARA PORTFOLIO
    if (PORTFOLIO_SESSION) {
      if (!localStorage.getItem('auth')) {
        localStorage.setItem('auth', JSON.stringify(PORTFOLIO_SESSION.auth));
        localStorage.setItem('fakeUsers', JSON.stringify(PORTFOLIO_SESSION.fakeUsers));
        localStorage.setItem('posts', JSON.stringify(PORTFOLIO_SESSION.posts));
        localStorage.setItem('theme', PORTFOLIO_SESSION.theme);
      }
    }

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
