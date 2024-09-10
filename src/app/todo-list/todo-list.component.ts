import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListHeroComponent } from '../todo-list-hero/todo-list-hero.component';
//import { TodoListModalComponent } from '../todo-list-modal/todo-list-modal.component';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoListHeroComponent, TodoListItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  defaultTasksList: any[] = [
    { id: 0, text: "Update checkbox state for completed todo items", duedate: "2099-01-01 12:00", completed: true, position: 0 },
    { id: 1, text: "Edit item - watch out for long text lines that wrap", duedate: "2099-01-01 12:00", completed: false, position: 1 },
    { id: 2, text: "Add todo item", duedate: "", completed: false, position: 2 },
    { id: 3, text: "Delete todo item", duedate: "", completed: false, position: 3 },
    { id: 4, text: "localStorage save/read of todo items", duedate: "", completed: false, position: 4 },
    { id: 5, text: "Drag and drop reordering of todo items", duedate: "2024-08-01 12:00", completed: false, position: 5 }
  ];
}
