import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Services
import { PromptService } from '../../services/prompt.service';
import { ExecutionService, ExecutionResult } from '../../services/execution.service';

@Component({
  selector: 'app-execute',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './execute.component.html',
  styleUrls: ['./execute.component.scss'],
})
export class ExecuteComponent implements OnInit {
  promptId!: string;
  promptName: string = '';
  iaModel: string = '';
  inputText: string = '';
  variables: Record<string, any> = {};
  variableKeys: string[] = [];
  
  // Results
  output: any = null;
  latency_ms: number | null = null;
  cost: number | null = null;
  
  // UI states
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private promptService: PromptService,
    private executionService: ExecutionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.promptId = this.route.snapshot.paramMap.get('id')!;
    this.loadPromptDetails();
  }

  loadPromptDetails(): void {
    this.loading = true;
    this.promptService.getPrompt(this.promptId).subscribe({
      next: (prompt) => {
        this.promptName = prompt.name;
        this.iaModel = prompt.ia_model;
        this.variableKeys = prompt.variables;
        
        this.inputText = prompt.template;
        
        this.variableKeys.forEach(key => {
          this.variables[key] = '';
        });
        
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = `Failed to load prompt details: ${err.statusText}`;
        this.loading = false;
        this.snackBar.open('Error loading prompt', 'Close', { 
          duration: 3000,
          panelClass: ['red-snackbar']
        });
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (!this.inputText.trim()) {
      this.snackBar.open('Please enter input text', 'Close', { 
        duration: 3000,
        panelClass: ['yellow-snackbar']
      });
      return;
    }

    this.loading = true;
    this.output = null;
    this.latency_ms = null;
    this.cost = null;
    this.error = null;

    // Call the service to execute the prompt
    this.executionService.executePrompt(
      this.promptId,
      this.inputText,
      this.variables,
      this.iaModel
    ).subscribe({
      next: (result: ExecutionResult) => {
        this.output = result.output;
        this.latency_ms = result.latency_ms;
        this.cost = result.cost;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Execute error:', err);
        this.error = `Failed to execute prompt: ${err.statusText || 'Unknown error'}`;
        if (err.error && typeof err.error === 'object') {
          this.error += `\n${err.error.detail || JSON.stringify(err.error)}`;
        }
        this.loading = false;
        this.snackBar.open('Error executing prompt', 'Close', { 
          duration: 3000,
          panelClass: ['red-snackbar']
        });
      }
    });
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(
      () => {
        this.snackBar.open('Copied to clipboard!', 'Close', { 
          duration: 2000,
          panelClass: ['green-snackbar']
        });
      },
      (err) => {
        console.error('Could not copy text: ', err);
        this.snackBar.open('Failed to copy to clipboard', 'Close', { 
          duration: 2000,
          panelClass: ['red-snackbar']
        });
      }
    );
  }
}