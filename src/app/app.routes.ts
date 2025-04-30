import { Routes } from '@angular/router';
import { PromptListComponent } from './components/prompt-list/prompt-list.component';
import { PromptFormComponent } from './components/prompt-form/prompt-form.component';
import { ExecuteComponent } from './components/execute/execute.component';
import { MetricsComponent } from './components/metrics/metrics.component';

export const routes: Routes = [
  { path: '',        redirectTo: 'prompts', pathMatch: 'full' },
  { path: 'prompts', component: PromptListComponent },
  { path: 'prompts/new',   component: PromptFormComponent },
  { path: 'execute/:id',   component: ExecuteComponent },
  { path: 'metrics/:id',   component: MetricsComponent },
];
