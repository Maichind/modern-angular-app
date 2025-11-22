export class PasswordVO {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PasswordVO): boolean {
    return this.value === other.value;
  }
}
