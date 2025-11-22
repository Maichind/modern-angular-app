import { UserCard } from './user-card';
import { User } from '../../services/users.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('UserCard', () => {
  let component: UserCard;
  let fixture: ComponentFixture<UserCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCard],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCard);
    component = fixture.componentInstance;

    component.user = {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
    } as User;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
