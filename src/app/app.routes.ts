import { Routes } from '@angular/router';
import { AddEditComponent } from './pages/add-edit/add-edit.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ListComponent } from './pages/list/list.component';

export const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'edit', component: AddEditComponent },
  { path: 'detail', component: DetailComponent },
];
