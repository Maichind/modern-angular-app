import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FeedFacade } from '@core/application/feed/services/feed.facade';
import { AuthFacade } from '@core/application/auth/services/auth.facade';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="bg-white/90 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-sm
      transition-all duration-300 border border-gray-100/50 dark:border-gray-800/60 
      hover:shadow-md focus-within:shadow-md p-5">
        <div class="flex items-start gap-3">
          <div
            class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 
                  text-white flex items-center justify-center font-bold shadow-sm"
          >
            {{ authfacade.user()?.name[0] }}
          </div>

          <textarea
            rows="3"
            [(ngModel)]="content"
            placeholder="¿Qué estás pensando hoy?"
            class="flex-1 resize-none bg-transparent border-none outline-none text-gray-800 dark:text-gray-100 
            placeholder:text-gray-400 dark:placeholder:text-gray-500 text-base leading-relaxed"
          ></textarea>
        </div>
        <div class="flex justify-between items-center mt-4">
          <div class="flex items-center gap-3 text-gray-400 dark:text-gray-500">
            <button class="hover:text-blue-500 transition-colors cursor-pointer" title="Agregar imagen">
              <lucide-icon name="image" class="w-5 h-5"></lucide-icon>
            </button>
            <button class="hover:text-green-500 transition-colors cursor-pointer" title="Agregar emoji">
              <lucide-icon name="smile" class="w-5 h-5"></lucide-icon>
            </button>
            <button class="hover:text-purple-500 transition-colors cursor-pointer" title="Agregar enlace">
              <lucide-icon name="link-2" class="w-5 h-5"></lucide-icon>
            </button>
          </div>
          <button 
              (click)="createPost()"
              [disabled]="!content.trim()" 
              class="px-5 py-2.5 rounded-full font-semibold text-white 
                bg-gradient-to-r from-blue-600 to-indigo-600 
                hover:from-blue-700 hover:to-indigo-700 
                active:scale-95 transition-all duration-200 
                shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
              Publicar
          </button>
        </div>
    </div>
  `
})
export class CreatePost {
  content = '';
  public authfacade = inject(AuthFacade);
  private feedFacade = inject(FeedFacade);
  @Output() postCreated = new EventEmitter<string>();

  createPost() {
    if (!this.content.trim()) return;
    this.feedFacade.addPost(this.content.trim());
    this.content = '';
  }
}
