import { Injectable } from '@angular/core';
import { User } from '@core/domain/user/models/user.model';
import { UserRepository } from '@core/domain/user/repositories/user.repository';

@Injectable({ providedIn: 'root' })
export class GetUserByUsernameUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(username: string): User | undefined {
    return this.userRepository.getUserByUsername(username);
  }
}
