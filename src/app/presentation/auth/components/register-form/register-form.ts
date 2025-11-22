import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthActions } from '../../store/auth.actions';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, LucideAngularModule],
  templateUrl: './register-form.html'
})
export class RegisterForm {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  name = signal('');
  email = signal('');
  password = signal('');

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {
    this.form.valueChanges.subscribe(v => {
      this.name.set(v.name ?? "");
      this.email.set(v.email ?? "");
      this.password.set(v.password ?? "");
    });
  }

  onSubmit() {
    this.store.dispatch(
      AuthActions.registerStart({
        name: this.name(),
        email: this.email(),
        password: this.password(),
      })
    );
  }
}
