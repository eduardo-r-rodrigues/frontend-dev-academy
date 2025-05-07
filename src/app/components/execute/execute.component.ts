import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
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
    MatButtonToggleModule,
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
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  promptId!: string;
  promptName: string = '';
  iaModel: string = '';
  inputType: 'text' | 'file' = 'text';
  inputText: string = '';
  uploadedFile: File | null = null;
  
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
        
        // Initialize variables
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFile = input.files[0];
      
      // Validate file type
      const fileType = this.uploadedFile.type;
      if (!(fileType === 'application/pdf' || fileType.startsWith('image/'))) {
        this.snackBar.open('Please upload a PDF or image file', 'Close', { 
          duration: 3000,
          panelClass: ['yellow-snackbar']
        });
        this.removeFile();
        return;
      }
      
      // Validate file size (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (this.uploadedFile.size > maxSize) {
        this.snackBar.open('File size should be less than 10MB', 'Close', { 
          duration: 3000,
          panelClass: ['yellow-snackbar']
        });
        this.removeFile();
        return;
      }
    }
  }

  removeFile(): void {
    this.uploadedFile = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  getFileIcon(fileType: string): string {
    if (fileType === 'application/pdf') {
      return 'picture_as_pdf';
    } else if (fileType.startsWith('image/')) {
      return 'image';
    }
    return 'insert_drive_file';
  }

  onSubmit(): void {
    // Clear previous results
    this.output = null;
    this.latency_ms = null;
    this.cost = null;
    this.error = null;
    
    // Validate input
    if (this.inputType === 'text' && !this.inputText.trim()) {
      this.snackBar.open('Please enter input text', 'Close', { 
        duration: 3000,
        panelClass: ['yellow-snackbar']
      });
      return;
    }
    
    if (this.inputType === 'file' && !this.uploadedFile) {
      this.snackBar.open('Please upload a file', 'Close', { 
        duration: 3000,
        panelClass: ['yellow-snackbar']
      });
      return;
    }
    
    this.loading = true;
    
    // Execute prompt based on input type
    if (this.inputType === 'text') {
      this.executeWithText();
    } else {
      this.executeWithFile();
    }
  }

  executeWithText(): void {
    this.executionService.executePrompt(
      this.promptId,
      this.inputText,
      this.variables,
      this.iaModel
    ).subscribe({
      next: (result: ExecutionResult) => {
        this.processResult(result);
      },
      error: (err: HttpErrorResponse) => {
        this.handleExecutionError(err);
      }
    });
  }

  executeWithFile(): void {
    if (!this.uploadedFile) return;
    
    this.executionService.executePromptWithFile(
      this.promptId,
      this.uploadedFile,
      this.variables,
      this.iaModel
    ).subscribe({
      next: (result: ExecutionResult) => {
        this.processResult(result);
      },
      error: (err: HttpErrorResponse) => {
        this.handleExecutionError(err);
      }
    });
  }

  private processResult(result: ExecutionResult): void {
    this.output = result.output;
    this.latency_ms = result.latency_ms;
    this.cost = result.cost;
    this.loading = false;
  }

  private handleExecutionError(err: HttpErrorResponse): void {
    console.error('Execution error:', err);
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