export class EmailVO {
  private readonly value: string;

  constructor(value: string) {
    if (!value || !this.isValidEmail(value)) {
      throw new Error('Invalid email format');
    }
    this.value = value.trim().toLowerCase();
  }

  private isValidEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: EmailVO): boolean {
    return this.value === other.value;
  }
}
