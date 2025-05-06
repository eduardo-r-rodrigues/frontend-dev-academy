import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { filter, skip } from 'rxjs/operators';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { PromptService } from '../../services/prompt.service';
import { PromptOut } from '../../models/prompt.model';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

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
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  prompts: PromptOut[] = [];
  loading = true;
  error = '';

  constructor(private promptService: PromptService, private router: Router) {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        skip(1) 
      )
      .subscribe((e: NavigationEnd) => {
        if (e.urlAfterRedirects == '/dashboard') {
          this.loadPrompts();
        }
      });
  }

  ngOnInit(): void {
    this.loadPrompts();
  }

  private loadPrompts() {
    this.loading = true;
    this.error = '';
    this.promptService.getPrompts().subscribe({
      next: (list) => {
        this.prompts = list;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load prompts';
        this.loading = false;
      },
    });
  }

  executePrompt(id: string) {
    this.router.navigate(['/execute', id]);
  }

  viewMetrics(id: string) {
    this.router.navigate(['/metrics', id]);
  }

  editPrompt(id: string) {
    this.router.navigate(['/prompts', id, 'edit']);
  }

  deletePrompt(id: string) {
    this.promptService.deletePrompt(id).subscribe(() => {
      this.prompts = this.prompts.filter((p) => p.id !== id);
    });
  }
}
