import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { User } from '../../services/users.service';
import * as UsersActions from '../../store/users.actions';
import * as UsersSelectors from '../../store/users.selectors';
import { UserList } from '../../components/user-list/user-list';
import { Component, signal, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, UserList],
  template: `
    <h2>Users</h2>
    @if (loading()) {
      <div class="spinner"></div>
    }
    <app-user-list [users]="(users$ | async) ?? []"></app-user-list>
  `,
  styleUrl: './users-page.scss'
})
export class UsersPage implements OnInit {
  private store = inject(Store);
  users$!: Observable<User[]>;
  loading = signal(false);

  ngOnInit() {
    this.users$ = this.store.select(UsersSelectors.selectAllUsers);
    this.store.select(UsersSelectors.selectUsersLoading).subscribe((val) => {
      this.loading.set(val);
    });
    this.store.dispatch(UsersActions.loadUsers());
  }
}
