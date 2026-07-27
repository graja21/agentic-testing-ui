import { Routes } from '@angular/router';

import { PipelineRunnerComponent } from './pages/pipeline-runner/pipeline-runner.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pipeline',
    pathMatch: 'full'
  },
  {
    path: 'pipeline',
    component: PipelineRunnerComponent
  },
  {
    path: '**',
    redirectTo: 'pipeline'
  }
];