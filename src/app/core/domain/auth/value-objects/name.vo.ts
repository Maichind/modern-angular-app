export class NameVO {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length < 3) {
      throw new Error('Name must be at least 3 characters long');
    }
    this.value = this.capitalize(value.trim());
  }

  private capitalize(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: NameVO): boolean {
    return this.value === other.value;
  }
}
