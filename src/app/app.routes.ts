import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListSettingsComponent } from './todo-list-settings/todo-list-settings.component';

export const routes: Routes = [
   { path: '', redirectTo: 'todo', pathMatch: 'full' },
   { path: 'todo', component: TodoListComponent },
   { path: 'settings', component: TodoListSettingsComponent },
   // { path: 'other', component: SomeOtherComponent },
   { path: '**', redirectTo: 'todo' } // Wildcard route for a 404 page
 ];