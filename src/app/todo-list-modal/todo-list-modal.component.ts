import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-list-modal',
  standalone: true,
  imports: [],
  templateUrl: './todo-list-modal.component.html',
  styleUrl: './todo-list-modal.component.css'
})
export class TodoListModalComponent {
  @Input() showModal: boolean = false; // used to show/hide the modal
  @Output() closeModal = new EventEmitter<void>(); // used to close the modal

  close() {
    this.closeModal.emit(); // emit close modal event
  }
}
