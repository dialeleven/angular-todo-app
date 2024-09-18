import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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
  
  // Used to focus the input field when the modal is displayed
  @ViewChild('todoInput') todoInput!: ElementRef; // Reference to the input field

  // Define todoTextInput to store the value from the input field
  todoTextInput: string = ''; 
  
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
    this.closeModal.emit(); // emit close modal event
  }

  handleSubmit() {
    // logic to handle submitting the form
    console.log('handleSubmit called');
  }
}
