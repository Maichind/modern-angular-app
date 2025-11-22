import { User } from '../models/user.model';

export abstract class UserRepository {
  abstract getAllUsers(): User[];
  abstract updateUserProfile(updatedUser: User): void;
  abstract getUserByUsername(username: string): User | undefined;
}
