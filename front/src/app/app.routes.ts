import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/todo',
    pathMatch: 'full',
  },
  {
    path: 'todo',
    loadComponent: () =>
      import('./components/todo/todo.component').then((c) => c.TodoComponent),
  },
];
