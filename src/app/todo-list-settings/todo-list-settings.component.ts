import { Component, Input } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

@Component({
  selector: 'app-todo-list-settings',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './todo-list-settings.component.html',
  styleUrl: './todo-list-settings.component.css'
})
export class TodoListSettingsComponent {
  @Input() showAddTodoButtonBottom: boolean = false; 

  // on component initialization, load settings from local storage
  ngOnInit() {
    const showTodoControlsOnBottom = localStorage.getItem('showTodoControlsOnBottom');

    // check/uncheck show add todo button on bottom from localstorage if it exists
    if (showTodoControlsOnBottom) {
      this.showAddTodoButtonBottom = showTodoControlsOnBottom === 'true';
    }
  }

  toggleShowTodoControlsOnBottom() {
    this.showAddTodoButtonBottom = !this.showAddTodoButtonBottom;

    console.log('toggleShowTodoControlsOnBottom, ', this.showAddTodoButtonBottom);

    // save show add todo button on bottom to local storage
    localStorage.setItem('showTodoControlsOnBottom', this.showAddTodoButtonBottom ? 'true' : 'false');
  }
}
