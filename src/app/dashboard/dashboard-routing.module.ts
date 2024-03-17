import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '',
    component: DashboardComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'users' },
      { path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
      { path: 'tasks', loadChildren: () => import('./task/task.module').then(m => m.TaskModule) },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
