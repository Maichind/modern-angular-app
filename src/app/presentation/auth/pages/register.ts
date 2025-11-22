import { Component } from '@angular/core';
import { RegisterForm } from '../components/register-form/register-form';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterForm],
  template: `
    <section class="min-h-screen flex items-center justify-center bg-gray-100">
      <app-register-form class="w-full"/>
    </section>
  `
})
export class Register {}
