import { Injectable } from '@angular/core';
import { User } from '@core/domain/user/models/user.model';
import { UserRepository } from '@core/domain/user/repositories/user.repository';

@Injectable({ providedIn: 'root' })
export class GetUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(): User[] {
    return this.userRepository.getAllUsers();
  }
}
