import { Routes } from '@angular/router';

// aponte pros arquivos corretos
import { DashboardComponent }     from './components/dashboard/dashboard.component';
import { PromptEditorComponent }  from './components/editor/prompt-editor.component';
import { ExecuteComponent }       from './components/execute/execute.component';
import { SettingsComponent }      from './components/settings/settings.component';

export const routes: Routes = [
  { path: '',            redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard',   component: DashboardComponent },
  { path: 'prompts/new', component: PromptEditorComponent },
  { path: 'execute/:id', component: ExecuteComponent },
  { path: 'settings',    component: SettingsComponent },
  // { path: 'metrics/:id', component: MetricsComponent }, // se voltar a usar later
  { path: '**',          redirectTo: 'dashboard' },
];
  