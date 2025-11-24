import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy, inject } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true,
  pure: false,
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
  private timer?: ReturnType<typeof setTimeout>;
  private lastDate?: string;
  private lastValue?: string;

  private cdr = inject(ChangeDetectorRef);

  transform(dateString: string): string {
    if (!dateString) return '';

    const past = new Date(dateString);
    const now = new Date();

    if (past > now) return 'En el futuro';

    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    let interval = 60; // segundos (actualiza cada minuto)
    let result = '';

    if (seconds < 60) {
      result = 'Justo ahora';
      interval = 10;
    } else if (seconds < 3600) {
      const m = Math.floor(seconds / 60);
      result = `hace ${m} min`;
    } else if (seconds < 86400) {
      const h = Math.floor(seconds / 3600);
      result = `hace ${h} h`;
    } else if (seconds < 172800) {
      result = 'ayer';
    } else if (seconds < 604800) {
      const d = Math.floor(seconds / 86400);
      result = `hace ${d} días`;
    } else if (seconds < 2419200) {
      const w = Math.floor(seconds / 604800);
      result = `hace ${w} sem`;
    } else if (seconds < 31536000) {
      const m = Math.floor(seconds / 2592000);
      result = `hace ${m} mes${m > 1 ? 'es' : ''}`;
    } else {
      const y = Math.floor(seconds / 31536000);
      result = `hace ${y} año${y > 1 ? 's' : ''}`;
    }

    this.clearTimer();
    this.timer = setTimeout(() => this.cdr.markForCheck(), interval * 1000);

    this.lastDate = dateString;
    this.lastValue = result;

    return result;
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private clearTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }
}
