import { Routes } from '@angular/router';

import { LayoutComponent } from './shared/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PipelineRunnerComponent } from './pages/pipeline-runner/pipeline-runner.component';
import { ReportsComponent } from './pages/reports/reports.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'pipeline',
        component: PipelineRunnerComponent
      },
      {
        path: 'reports',
        component: ReportsComponent
      },
      {
  path: 'reports',
  loadComponent: () =>
    import(
      './pages/reports/reports.component'
    ).then(
      (component) =>
        component.ReportsComponent,
    ),
},

{
  path: 'reports/:id',
  loadComponent: () =>
    import('./pages/execution-details/execution-details.component')
      .then(m => m.ExecutionDetailsComponent),
},
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];