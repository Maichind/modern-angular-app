import { Component } from '@angular/core';
import { LoginForm } from '../components/login-form/login-form';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginForm],
  template: `
    <section class="min-h-screen flex items-center justify-center bg-slate-50">
      <app-login-form class="w-full"/>
    </section>
  `
})
export class Login {}
