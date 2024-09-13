import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo-list-hero',
  standalone: true,
  imports: [],
  templateUrl: './todo-list-hero.component.html',
  styleUrl: './todo-list-hero.component.css'
})

export class TodoListHeroComponent {
  @Input() completedTasks: number = 0;
  @Input() totalTasks: number = 0;
}
