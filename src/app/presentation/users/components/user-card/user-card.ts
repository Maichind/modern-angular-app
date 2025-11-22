import { Component, Input } from '@angular/core';
import { User } from '../../services/users.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  template: `
    <div class="card">
      <img [src]="'https://robohash.org/' + user.id + '?set=set2&size=100x100'" alt="avatar" />
      <h3>{{ user.name }}</h3>
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Company:</strong> {{ user.company?.name }}</p>
      <p><strong>City:</strong> {{ user.address?.city }}</p>
      <a [href]="'http://' + user.website" target="_blank">🌐 Website</a>
    </div>
  `,
  styleUrl: './user-card.scss'
})
export class UserCard {
  @Input() user!: User;
}
