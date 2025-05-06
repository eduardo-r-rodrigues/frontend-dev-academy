import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PromptService } from '../../services/prompt.service';
import { PromptCreate } from '../../models/prompt.model';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-prompt-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    // Angular Material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './prompt-editor.component.html',
  styleUrls: ['./prompt-editor.component.scss'],
})
export class PromptEditorComponent implements OnInit {
  form!: FormGroup;
  variables: string[] = [];
  newVariable = '';
  availableModels = [
    'GPT-4',
    'GPT-3.5-turbo',
    'Gemini Pro',
    'Gemini Flash',
    'Claude 3'
  ];

  isEditMode = false;
  promptId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private promptService: PromptService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      template: ['', Validators.required],
      ia_model: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.promptId = this.route.snapshot.paramMap.get('id');
    if (this.promptId) {
      this.isEditMode = true;
      this.loadPromptData();
    }
  }

  loadPromptData(): void {
    if (!this.promptId) return;
    
    this.promptService.getPrompt(this.promptId).subscribe({
      next: (prompt) => {
        this.form.patchValue({
          name: prompt.name,
          template: prompt.template,
          ia_model: prompt.ia_model,
        });
        this.variables = [...prompt.variables];
      },
      error: (err) => {
        this.showErrorSnackbar('Failed to load prompt details');
        console.error('Error loading prompt:', err);
      }
    });
  }

  addVariable(): void {
    const value = this.newVariable.trim();
    if (value && !this.variables.includes(value)) {
      this.variables.push(value);
      this.newVariable = '';
    } else if (this.variables.includes(value)) {
      this.showErrorSnackbar('Variable already exists');
    }
  }

  removeVariable(variable: string): void {
    this.variables = this.variables.filter(v => v !== variable);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.showErrorSnackbar('Please fill all required fields');
      return;
    }

    const payload: PromptCreate = {
      name: this.form.value.name,
      template: this.form.value.template,
      ia_model: this.form.value.ia_model,
      variables: this.variables,
    };

    if (this.isEditMode && this.promptId) {
      this.updatePrompt(this.promptId, payload);
    } else {
      this.createPrompt(payload);
    }
  }

  private createPrompt(payload: PromptCreate): void {
    this.promptService.createPrompt(payload).subscribe({
      next: () => {
        this.showSuccessSnackbar('Prompt created successfully');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.showErrorSnackbar('Failed to create prompt');
        console.error('Error creating prompt:', err);
      }
    });
  }

  private updatePrompt(id: string, payload: PromptCreate): void {
    this.promptService.updatePrompt(id, payload).subscribe({
      next: () => {
        this.showSuccessSnackbar('Prompt updated successfully');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.showErrorSnackbar('Failed to update prompt');
        console.error('Error updating prompt:', err);
      }
    });
  }

  private showSuccessSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['green-snackbar']
    });
  }

  private showErrorSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['red-snackbar']
    });
  }
}