import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-list-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.css'
})
export class TodoListItemComponent {
  @Input() task: any;
  @Output() taskUpdated = new EventEmitter<any>();
  @Output() deleteTask = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<any>();

  // toggled completed value for the task
  toggleCompleted() {
    this.task.completed = !this.task.completed; // toggle completed state
    this.taskUpdated.emit(this.task); // emit the updated task to the parent component
  }

  // logic to handle deleting a task
  handleDelete() {
    if (window.confirm(`Delete todo: ${this.task.text}?`)) {
      this.deleteTask.emit(this.task.id); // Emit the task's ID to the parent component
    }
  }

  handleEdit() {
    // logic to handle editing a task
    console.log('handleEdit called. task.id', this.task.id);

    // Emit the task object to the parent component
    this.editTask.emit(this.task);
  }
}