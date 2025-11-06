import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { InputTransformComponent } from './components/input-transform/input-transform.component';
import { of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface User {
  name: string;
  age: number;
  profession: string;
  id: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, InputTransformComponent],
  template: `
 <app-input-transform [user]="userDatasList[0]"></app-input-transform>
 <!--<div style="display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 1rem;">
  @for(user of userDatasList; track user.id) {
   @switch (user.age) {
    @case (20) {
      <span style="color: blue;"> {{user.name}} is {{user.profession}} and is 20 years old </span>
    }
    @case (30) {
      <span style="color: red;"> {{user.name}} is {{user.profession}} and is 30 years old </span>
    }
    @case (40) {
      <span style="color: brown;"> {{user.name}} is {{user.profession}} and is 40 years old </span>
    }
    @default {
      <span> {{user.name}} is {{user.profession}} and your age is {{user.age}} </span>
    }
   }
  } @empty {
    <span style="color: red;">Dont have datas to show</span>
  }
</div>-->
  `,
  styleUrls: [],
})
export class AppComponent implements OnInit{

  destroyedRef = inject(DestroyRef);

  title = 'learnAngular17';
  userDatasList: Array<User> = [
    { age: 20, name: 'Marcos', profession: 'Software Developer', id: '123' },
    { age: 30, name: 'Marcelo', profession: 'Software Developer', id: '456' },
    { age: 40, name: 'Carlos', profession: 'Scrum Master', id: '789' },
    { age: 30, name: 'Maria', profession: 'UX Designer', id: '123' },
  ];

  userDatas$ = of(this.userDatasList);

  ngOnInit(): void {
    this.userDatas$
    .pipe(takeUntilDestroyed(this.destroyedRef))
    .subscribe({
      next: (response) => console.log("Users", response)
    });
  }
}