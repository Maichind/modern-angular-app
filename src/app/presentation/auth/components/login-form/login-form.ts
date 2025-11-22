import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthActions } from '../../store/auth.actions';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, LucideAngularModule],
  templateUrl: './login-form.html'
})
export class LoginForm {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  email = signal('');
  password = signal('');

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor() {   
    this.form.valueChanges.subscribe(v => {
      this.email.set(v.email ?? "");
      this.password.set(v.password ?? "");
    });
  }

  onSubmit() {
    this.store.dispatch(AuthActions.loginStart({
      email: this.email(),
      password: this.password(),
    }));
  }
}
