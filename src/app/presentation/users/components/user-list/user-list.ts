import { Component, Input } from '@angular/core';
import { User } from '../../services/users.service';
import { UserCard } from '../user-card/user-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserCard],
  template: `
    <div class="user-list">
      @for (user of users; track $index) {
        <app-user-card [user]="user"></app-user-card>
      }
    </div>
  `,
  styleUrl: './user-list.scss'
})
export class UserList {
  @Input() users: User[] = [];
}
