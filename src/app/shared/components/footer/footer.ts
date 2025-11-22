import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="mt-6 border-t border-gray-200/60 dark:border-gray-800/60 bg-white/60 
      dark:bg-gray-900/60 backdrop-blur-md py-6 text-center">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400 px-6">
        <p class="flex items-center gap-2">
          <span class="text-lg">🚀</span>
          <span>© 2025 <span class="font-bold text-blue-600 dark:text-blue-400">App</span> — Conectando ideas y personas</span>
        </p>
        <nav class="flex gap-4 text-gray-400 dark:text-gray-500 text-xs">
          <a href="#" class="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Términos</a>
          <a href="#" class="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Privacidad</a>
          <a href="#" class="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Contacto</a>
        </nav>
      </div>
    </footer>
  `
})
export class Footer {}
