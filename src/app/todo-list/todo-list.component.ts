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
  defaultTasksList: any[] = [
    { id: 1, text: "Edit item   - watch out for long text lines that wrap", duedate: "2099-01-01 12:00", completed: true, position: 1 },
    { id: 2, text: "Add todo item", duedate: "", completed: true, position: 2 },
    { id: 3, text: "Delete todo item", duedate: "", completed: true, position: 3 },
    { id: 4, text: "localStorage save/read of todo items", duedate: "", completed: true, position: 4 },
    { id: 5, text: "Drag and drop reordering of todo items", duedate: "2024-08-01 12:00", completed: false, position: 5 }
  ];
}
