import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PostCard } from '@presentation/feed/components/post-card';
import { UserProfileFacade } from '@core/application/user/services/user-profile.facade';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, PostCard, ReactiveFormsModule, LucideAngularModule],
  template: `
    <section class="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden transition-all duration-300">
        <!-- Banner -->
        <div class="h-48 bg-gradient-to-r from-blue-400 to-indigo-600 
            dark:from-gray-700 dark:to-gray-950 relative group cursor-pointer">
            @if (user?.bannerUrl) {
                <img [src]="user?.bannerUrl" class="w-full h-full object-cover" />
            }
            <input type="file" accept="image/*" hidden #coverInput (change)="onCoverSelected($event)" />
            <button 
                (click)="coverInput.click()" 
                class="absolute w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-60 
                    bg-black/40 transition-all duration-300 cursor-pointer"
                >
                <lucide-icon name="camera" color="white" class="w-12 h-12"></lucide-icon>
            </button>

            <!-- Avatar -->
            <div class="absolute -bottom-16 left-6 w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden 
                shadow-lg bg-gray-200 hover:border-blue-200 transition-all duration-300 hover:scale-105">
                @if (user?.avatarUrl) {
                    <div class="relative w-full h-full">
                        <img [src]="user?.avatarUrl" class="w-full h-full object-cover" />   
                        <div class="absolute top-0 right-0 w-full h-full opacity-0 hover:opacity-40
                            flex items-center justify-center text-3xl font-bold text-blue-600">
                            <input type="file" accept="image/*" hidden #avatarInput (change)="onAvatarSelected($event)" />
                            <button 
                                (click)="avatarInput.click()" 
                                class="bg-white dark:bg-gray-800 p-1 rounded-full shadow text-gray-700 
                                    dark:text-gray-200 hover:bg-gray-100 transition cursor-pointer"
                            >
                                <lucide-icon name="camera" class="w-6 h-6"></lucide-icon>
                            </button>
                        </div>         
                    </div>
                } @else {
                    <div class="w-full h-full flex items-center justify-center text-3xl font-bold text-blue-600">
                        <input type="file" accept="image/*" hidden #avatarInput (change)="onAvatarSelected($event)" />
                        <button 
                            (click)="avatarInput.click()" 
                            class="bg-white dark:bg-gray-800 p-1 rounded-full shadow text-gray-700 
                                dark:text-gray-200 hover:bg-gray-100 transition cursor-pointer"
                        >
                            <lucide-icon name="camera" class="w-6 h-6"></lucide-icon>
                        </button>
                    </div>
                }            
            </div>

            <!-- Edit -->
            @if (isCurrentUser) {
                <div class="mt-4 absolute -bottom-10 right-6">
                    <button (click)="toggleEdit()" 
                        class="px-4 py-1.5 rounded-full text-sm text-blue-600 font-medium bg-blue-50
                        hover:bg-blue-100 cursor-pointer dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 transition">
                        {{ editing ? 'Cancelar' : 'Editar perfil' }}
                    </button>
                </div>
            }
        </div>

        <div class="pt-20 px-6 pb-4 text-center sm:text-left">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ user?.name }}</h2>
            <p class="text-gray-500">@{{ user?.username }}</p>
            <p class="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">{{ user?.bio || 'Sin descripción aún.' }}</p>

            <div class="flex flex-wrap gap-6 mt-4 text-sm text-gray-500 dark:text-gray-400">
                <span><strong>{{ posts.length }}</strong> {{ posts.length == 1 ? 'publicación' : 'publicaciones' }}</span>
                <span><strong>{{ user?.followers?.length || 0 }}</strong> seguidores</span>
                <span><strong>{{ user?.following?.length || 0 }}</strong> siguiendo</span>
            </div>
                    
            @if (editing) {
                <!-- Edit Modal -->
                <div class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">                
                    <div class="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl 
                        m-4 p-6 sm:m-6 relative animate-[fadeIn_0.3s_ease-out]">
                        
                        <button (click)="toggleEdit()" 
                            class="absolute top-3 right-4 text-gray-400 hover:text-gray-600 
                                dark:hover:text-gray-300 transition cursor-pointer"
                        >
                            ✕
                        </button>

                        <h2 class="text-xl font-semibold mb-6 text-gray-800 dark:text-white text-center">
                            Editar perfil
                        </h2>

                        <form [formGroup]="form" (ngSubmit)="saveChanges()" class="flex flex-col gap-5">
                            <div class="relative w-full">
                                <input
                                    id="name"
                                    name="name"
                                    formControlName="name"
                                    type="text"
                                    placeholder=" "
                                    class="peer w-full rounded-md border-0 border-b-2 border-gray-400 
                                        bg-transparent px-3 py-3 text-sm dark:text-gray-100
                                        focus:border-2 focus:border-blue-600 focus:rounded-md focus:outline-none"
                                />
                                <label
                                    for="name"
                                    class="absolute left-3 bg-white dark:bg-gray-900 px-1 text-gray-500 
                                        dark:text-gray-400 text-base top-3 transition-all peer-focus:-top-2.5 peer-focus:text-xs 
                                        peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2.5 
                                        peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-600 
                                        dark:peer-[&:not(:placeholder-shown)]:text-gray-400"
                                >
                                    Nombre
                                </label>
                            </div>
                            <div class="relative w-full">
                                <input
                                    id="username"
                                    name="username"
                                    formControlName="username"
                                    type="text"
                                    placeholder=" "
                                    class="peer w-full rounded-md border-0 border-b-2 border-gray-400 
                                        bg-transparent px-3 py-3 text-sm dark:text-gray-100
                                        focus:border-2 focus:border-blue-600 focus:rounded-md focus:outline-none"
                                />
                                <label
                                    for="username"
                                    class="absolute left-3 bg-white dark:bg-gray-900 px-1 text-gray-500 
                                        dark:text-gray-400 text-base top-3 transition-all peer-focus:-top-2.5 peer-focus:text-xs 
                                        peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2.5 
                                        peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-600
                                        dark:peer-[&:not(:placeholder-shown)]:text-gray-400"
                                        
                                >
                                    Usuario
                                </label>
                            </div>
                            <div class="relative w-full">                                
                                <textarea id="bio"
                                    name="bio"
                                    formControlName="bio"
                                    type="text"
                                    placeholder=" "
                                    class="peer w-full rounded-md border-0 border-b-2 border-gray-400 
                                        bg-transparent px-3 py-3 text-sm dark:text-gray-100
                                        focus:border-2 focus:border-blue-600 focus:rounded-md focus:outline-none"
                                ></textarea>
                                <label
                                    for="bio"
                                    class="absolute left-3 bg-white dark:bg-gray-900 px-1 text-gray-500 text-base 
                                        dark:text-gray-400 top-2  transition-all peer-focus:-top-2.5 peer-focus:text-xs 
                                        peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-2.5 
                                        peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-600
                                        dark:peer-[&:not(:placeholder-shown)]:text-gray-400"
                                >
                                    Biografía
                                </label>
                            </div>                            

                            <div class="flex justify-end gap-3 mt-2">
                                <button type="button" (click)="toggleEdit()"
                                    class="px-4 py-1 rounded-xl border border-gray-300 text-gray-600 dark:text-gray-300
                                        hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button type="submit"
                                    class="px-4 py-1 rounded-xl bg-blue-500 text-white hover:bg-blue-600 
                                        transition cursor-pointer"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>                
            }        
        </div>

        <div class="py-12 px-6 relative">
            <hr class="mt-1.25 border-gray-200 dark:border-gray-700" />
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 
                absolute top-6 border-blue-400 border-b-2 cursor-pointer">Publicaciones</h3>

            <!-- Posts -->
            <div class="flex flex-col gap-3 py-3">
                @for (post of posts; track post.createdAt) {
                    <app-post-card [post]="post"></app-post-card>
                }
                @if (posts.length === 0) {
                    <p class="text-gray-500 text-center">Aún no hay publicaciones</p>
                }        
            </div>
        </div>
    </section>
  `
})
export class ProfilePage {
  editing = false;
  route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  profileFacade = inject(UserProfileFacade);

  form = this.fb.nonNullable.group({
    name: [''],
    username: [''],
    bio: ['']
  });

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username')!;
    this.profileFacade.loadProfile(username);
    this.form.patchValue({
      name: this.user?.name,
      username: this.user?.username,
      bio: this.user?.bio
    });
  }

  get user() {
    return this.profileFacade.user();
  }

  get posts() {
    return this.profileFacade.posts();
  }

  get isCurrentUser() {
    return this.profileFacade.isCurrentUser();
  }

  onAvatarSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.user!.avatarUrl = reader.result as string;
      this.saveChanges();
    };
    reader.readAsDataURL(file);
  }

  onCoverSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.user!.bannerUrl = reader.result as string;
      this.saveChanges();
    };
    reader.readAsDataURL(file);
  }

  toggleEdit() {
    this.editing = !this.editing;
  }

  saveChanges() {
    const values = this.user!;
    const updated = this.form.value;

    values.bio = updated.bio ?? values.bio;
    values.name = updated.name ?? values.name; 
    values.username = updated.username ?? values.username; 

    this.profileFacade.updateProfile(values);
    this.editing = false;
  }
}
