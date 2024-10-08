import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list-modal',
  standalone: true,
  imports: [CommonModule, FormsModule], // Include FormsModule here
  templateUrl: './todo-list-modal.component.html',
  styleUrl: './todo-list-modal.component.css'
})
export class TodoListModalComponent {
  @Input() showModal: boolean = false; // used to show/hide the modal
  @Input() addEditMode: string = 'Add'; // label for modal heading
  @Input() task: any = { text: '', dueDate: '' }; // Receives the task to edit, default to empty task
  @Output() closeModal = new EventEmitter<void>(); // used to close the modal
  @Output() taskSubmitted = new EventEmitter<any>(); // emit the task on submit
  
  // Used to focus the input field when the modal is displayed
  @ViewChild('todoInput') todoInput!: ElementRef; // Reference to the input field

  // Define todoTextInput to store the value from the input field
  todoTextInput: string = '';

  // Define todoDueDateInput to store the value from the input field
  todoDueDateInput: string = '';

  todoCompleted: boolean = false;

  // Angular lifecycle hook triggered when the input values change.
  // Since `addEditMode` is an input property that may change when the component
  // is used (e.g., when the modal is opened), we use the ngOnChanges() lifecycle 
  // hook to capture these changes. This allows updating todoTextInput and todoDueDateInput 
  //when addEditMode changes.
  ngOnChanges(changes: SimpleChanges) {
    // When the modal is opened and the mode is Edit, populate the fields
    if (changes['showModal'] && this.showModal && this.addEditMode === 'Edit') {
      this.todoTextInput = this.task.text || '';
      this.todoDueDateInput = this.task.duedate || '';
      this.todoCompleted = this.task.completed || false; // keep track of completed state

      // console.log('task in ngAfterViewInit: ', this.task, 'addEditMode: ', this.addEditMode, 'todoDueDateInput: ', this.todoDueDateInput);
    }
  }
  
  // Focus the input when the modal is displayed using ngAfterViewInit() lifecycle 
  // hook in Angular. It is called after Angular has fully initialized a component's view.
  // In this case, it is used to focus an input field when a modal is displayed.
  ngAfterViewInit() {
    // Focus the input when the modal is displayed
    if (this.showModal) {
      this.todoInput.nativeElement.focus();
    }
  }

  handleClose() {
    this.closeModal.emit(); // emit close modal event to parent component
  }

  // handle modal form submission for add/edit actions
  handleSubmit() {

    // Prepare the task object
    const task = {
      id: this.task.id,
      text: this.todoTextInput,
      duedate: this.todoDueDateInput,
      completed: this.todoCompleted
    };

    this.taskSubmitted.emit(task); // Emit task to parent component
    this.handleClose(); // Close the modal after submission
  }
}
