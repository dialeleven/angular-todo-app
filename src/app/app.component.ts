import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { TodoListComponent } from './todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-todo-app';
}
