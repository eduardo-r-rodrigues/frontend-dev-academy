import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter, skip } from 'rxjs/operators';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { PromptService } from '../../services/prompt.service';
import { PromptOut } from '../../models/prompt.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  prompts: PromptOut[] = [];
  loading = true;
  error = '';

  constructor(
    private promptService: PromptService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Listen for navigation events to reload prompts when returning to dashboard
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        skip(1) 
      )
      .subscribe((e) => {
        if (e instanceof NavigationEnd && e.urlAfterRedirects === '/dashboard') {
          this.loadPrompts();
        }
      });
  }

  ngOnInit(): void {
    this.loadPrompts();
  }

  loadPrompts() {
    this.loading = true;
    this.error = '';
    this.promptService.getPrompts().subscribe({
      next: (list) => {
        this.prompts = list;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load prompts. Please check your connection and try again.';
        this.loading = false;
        console.error('Error loading prompts:', err);
      },
    });
  }

  executePrompt(id: string) {
    this.router.navigate(['/execute', id]);
  }

  viewMetrics(id: string) {
    // For now we'll show a notification since this feature isn't fully implemented
    this.snackBar.open('Metrics feature coming soon!', 'Close', {
      duration: 3000,
      panelClass: ['green-snackbar']
    });
    // When implemented, use: this.router.navigate(['/metrics', id]);
  }

  editPrompt(id: string) {
    this.router.navigate(['/prompts', id, 'edit']);
  }

  confirmDelete(prompt: PromptOut): void {
    if (confirm(`Are you sure you want to delete "${prompt.name}"?`)) {
      this.deletePrompt(prompt.id);
    }
  }

  deletePrompt(id: string) {
    this.promptService.deletePrompt(id).subscribe({
      next: () => {
        this.prompts = this.prompts.filter((p) => p.id !== id);
        this.snackBar.open('Prompt deleted successfully', 'Close', {
          duration: 3000,
          panelClass: ['green-snackbar']
        });
      },
      error: (err) => {
        this.snackBar.open('Failed to delete prompt', 'Close', {
          duration: 3000,
          panelClass: ['red-snackbar']
        });
        console.error('Error deleting prompt:', err);
      }
    });
  }

  // Utility methods for the template
  getModelClass(modelName: string): string {
    const name = modelName.toLowerCase();
    if (name.includes('gemini')) return 'gemini';
    if (name.includes('gpt')) return 'gpt';
    if (name.includes('claude')) return 'claude';
    return 'default';
  }

  getPreviewText(template: string): string {
    return template.length > 120 ? template.substring(0, 120) + '...' : template;
  }
}