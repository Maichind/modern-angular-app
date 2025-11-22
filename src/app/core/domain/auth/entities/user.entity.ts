import { EmailVO } from '../value-objects/email.vo';
import { NameVO } from '../value-objects/name.vo';

export class User {
  constructor(
    public readonly id: number,
    public readonly name: NameVO,
    public readonly email: EmailVO,
  ) {}
}
