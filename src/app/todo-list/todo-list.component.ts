import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TodoListHeroComponent } from '../todo-list-hero/todo-list-hero.component';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { TodoListModalComponent } from '../todo-list-modal/todo-list-modal.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, DragDropModule, TodoListHeroComponent, TodoListItemComponent, TodoListModalComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  // Initialize the tasks as a BehaviorSubject with an empty array as default value
  tasks = new BehaviorSubject<any[]>([]);
    
  defaultTasksList: any[] = [
    { id: 1, text: "Edit item - watch out for long text lines that wrap", duedate: "2099-01-01 12:00", completed: true, position: 1 },
    { id: 2, text: "Add todo item", duedate: "", completed: true, position: 2 },
    { id: 3, text: "Delete todo item", duedate: "", completed: true, position: 3 },
    { id: 4, text: "localStorage save/read of todo items", duedate: "", completed: false, position: 4 },
    { id: 5, text: "Drag and drop reordering of todo items", duedate: "2024-08-01 12:00", completed: false, position: 5 }
  ];

  filterType: string = 'tasks-all';
  filteredTasksList: any[] = [...this.defaultTasksList];
  selectedTask: any = null;
  showModal: boolean = false;
  addEditMode: string = 'Add';

  currentCompletedTasks: number = 0;
  currentTotalTasks: number = 0;

  /**
   * Handles the reordering of tasks after a drag-and-drop operation.
   * 
   * - Uses the CdkDragDrop event to capture the previous and current positions of the dragged task.
   * - The moveItemInArray function updates the position of the dragged task in both the filtered and default task lists.
   * - Optionally persists the updated task order to localStorage to retain changes after a page reload.
   *
   * @param event - The drag-and-drop event containing details about the dragged item and its new position.
   */
  drop(event: CdkDragDrop<any[]>) {
    // Move item in the array
    moveItemInArray(this.filteredTasksList, event.previousIndex, event.currentIndex);
    
    // If you need to update the original list (defaultTasksList) too:
    moveItemInArray(this.defaultTasksList, event.previousIndex, event.currentIndex);

    // You can also update the task position or save the reordered list to localStorage if needed
    localStorage.setItem('tasks', JSON.stringify(this.defaultTasksList));
  }

  // TypeScript getter method to return number of completed tasks
  get completedTasks(): number {
    return this.currentCompletedTasks;
    // return this.defaultTasksList.filter(task => task.completed).length;
  }

  // TypeScript getter method to return total number of tasks
  get totalTasks(): number {
    return this.currentTotalTasks;
    // return this.defaultTasksList.length;
  }

  // set up initial task values from localStorage or default tasks
  constructor() {
    // check if tasks exist in localStorage
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
      this.defaultTasksList = JSON.parse(storedTasks); // Load tasks from localStorage
    } else {
        // If no tasks in localStorage, use the default tasks
        this.defaultTasksList = [...this.defaultTasksList]; // Use predefined default tasks
    }

    // Initialize the filtered tasks list and task counts
    this.filteredTasksList = [...this.defaultTasksList];
    this.updateTaskCounts(this.defaultTasksList);  // Initialize task counts
  }

  handleTaskUpdate(updatedTask: any) {
    console.log('handleTaskUpdate called', updatedTask);

    // Find the task in the list and update it
    const taskIndex = this.defaultTasksList.findIndex(task => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      this.defaultTasksList[taskIndex] = updatedTask; // Update the task
      this.updateFilteredTasks(); // Re-filter the tasks if necessary
      this.updateTaskCounts(this.defaultTasksList); // Update task counts after change
    }

    // Save to localStorage
    localStorage.setItem('tasks', JSON.stringify(this.defaultTasksList));
  }

  // Handle task submission from modal (add or edit task)
  handleTaskSubmission(task: any) {
    console.log('handleTaskSubmission called', task);

    if (this.addEditMode === 'Add') {
      task.id = this.defaultTasksList.length + 1; // Assign an ID to the new task
      //task.id = this.defaultTasksList.length > 0 ? Math.max(...this.defaultTasksList.map(t => t.id)) + 1 : 1; // Generate a new ID
      this.defaultTasksList.push(task); // Add new task
    } else if (this.addEditMode === 'Edit') {
      this.handleTaskUpdate(task); // Update existing task
    }
    this.showModal = false; // Close modal after submission
    this.updateFilteredTasks(); // Update filtered tasks after submission
    this.updateTaskCounts(this.defaultTasksList); // Update task counts after submission
    
    // Save to localStorage
    localStorage.setItem('tasks', JSON.stringify(this.filteredTasksList));
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
    // Remove the task from the list
    this.defaultTasksList = this.defaultTasksList.filter(task => task.id !== taskId);

    // Update the filtered list based on the current filter type
    this.updateFilteredTasks();
    //this.filteredTasksList = [...this.defaultTasksList];

    // Update task counts
    this.updateTaskCounts(this.defaultTasksList); // Update task counts after deletion

    // Save to localStorage
    localStorage.setItem('tasks', JSON.stringify(this.filteredTasksList));
  }

  handleShowModal(action: string, task: any) {
    console.log("Add/edit Todo clicked. Action: ", action, " Task: ", task);  // Debugging

    this.addEditMode = action;

    this.selectedTask = task ? { ...task } : { text: '', dueDate: '' }; // Pass task to modal for edit or empty task for add

    // logic to handle showing the modal window
    this.showModal = true;
  }

  handleCloseModal() {
    this.showModal = false;
  }

  loadDefaultTasks(event: any) {
    // Confirm if the user wants to load default tasks.
    if (event && !confirm('Load default tasks?')) {
      console.log('not confirmed');
      return false;
    }

    console.log('loadDefaultTasks called. event: ', event);

    // Define default tasks
    const defaultTasks = [
      { id: 1, text: "Edit item - watch out for long text lines that wrap", duedate: "2099-01-01 12:00", completed: true, position: 1 },
      { id: 2, text: "Add todo item", duedate: "", completed: true, position: 2 },
      { id: 3, text: "Delete todo item", duedate: "", completed: true, position: 3 },
      { id: 4, text: "localStorage save/read of todo items", duedate: "", completed: true, position: 4 },
      { id: 5, text: "Drag and drop reordering of todo items", duedate: "2024-08-01 12:00", completed: false, position: 5 }
    ];

    // Update defaultTasksList with new tasks
    this.defaultTasksList = defaultTasks;

    // Save to localStorage
    localStorage.setItem('tasks', JSON.stringify(defaultTasks));

    // Update observable tasks (if using an observable like BehaviorSubject)
    this.tasks.next(defaultTasks);

    // Update the filtered task list for UI rendering
    this.filteredTasksList = defaultTasks;

    // Update task counts after deletion
    this.updateTaskCounts(this.defaultTasksList);

    return defaultTasks;
  }

  // Helper method to update task counts
  updateTaskCounts(tasks: any[]) {
    this.currentTotalTasks = tasks.length;
    this.currentCompletedTasks = tasks.filter(task => task.completed).length;
  }
}
