import { Component } from '@angular/core';
import { TodoListHeroComponent } from '../todo-list-hero/todo-list-hero.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoListHeroComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

}
