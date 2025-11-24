import { inject, Injectable } from '@angular/core';
import { User } from '@core/domain/user/models/user.model';
import { UserRepository } from '@core/domain/user/repositories/user.repository';

@Injectable({ providedIn: 'root' })
export class UpdateUserUseCase {
  private userRepository = inject(UserRepository);

  execute(updatedUser: User): void {
    return this.userRepository.updateUserProfile(updatedUser);
  }
}
