import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListHeroComponent } from '../todo-list-hero/todo-list-hero.component';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
//import { TodoListModalComponent } from '../todo-list-modal/todo-list-modal.component';

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
    { id: 3, text: "Delete todo item", duedate: "", completed: true, position: 3 },
    { id: 4, text: "localStorage save/read of todo items", duedate: "", completed: false, position: 4 },
    { id: 5, text: "Drag and drop reordering of todo items", duedate: "2024-08-01 12:00", completed: false, position: 5 }
  ];

  filterType: string = 'tasks-all';
  filteredTasksList: any[] = [...this.defaultTasksList];

  get completedTasks(): number {
    return this.defaultTasksList.filter(task => task.completed).length;
  }

  get totalTasks(): number {
    return this.defaultTasksList.length;
  }

  handleTaskUpdate(updatedTask: any) {
    // Find the task in the list and update it
    const taskIndex = this.defaultTasksList.findIndex(task => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      this.defaultTasksList[taskIndex] = updatedTask; // Update the task
      this.updateFilteredTasks(); // Re-filter the tasks if necessary
    }
  }

  // method to update the filter
  handleFilterChange(event: any) {
    this.filterType = event.target.value;
    this.updateFilteredTasks(); // Apply filter based on selection
  }

  updateFilteredTasks(): void {
    if (this.filterType === 'tasks-all') {
      this.filteredTasksList = [...this.defaultTasksList];
    } else if (this.filterType === 'tasks-checked') {
      this.filteredTasksList = this.defaultTasksList.filter(task => task.completed);
    } else if (this.filterType === 'tasks-unchecked') {
      this.filteredTasksList = this.defaultTasksList.filter(task => !task.completed);
    }
  }

  // Method to handle the delete event from the child component
  onDeleteTask(taskId: number) {
    this.defaultTasksList = this.defaultTasksList.filter(task => task.id !== taskId);
    this.filteredTasksList = [...this.defaultTasksList]; // Update filtered list after deletion
  }
}
