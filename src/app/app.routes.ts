import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PromptEditorComponent } from './components/editor/prompt-editor.component';
import { ExecuteComponent } from './components/execute/execute.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'prompts/new', component: PromptEditorComponent },
  { path: 'prompts/:id/edit', component: PromptEditorComponent },
  { path: 'execute/:id', component: ExecuteComponent },
  { path: 'settings', component: SettingsComponent },
];
