import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListSettingsComponent } from './todo-list-settings/todo-list-settings.component';

export const routes: Routes = [
   { path: '', component: TodoListComponent },
   { path: 'settings', component: TodoListSettingsComponent },
   // { path: 'other', component: SomeOtherComponent },
   { path: '**', redirectTo: '' } // Wildcard route for a 404 page
 ];