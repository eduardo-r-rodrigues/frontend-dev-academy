// src/app/components/editor/prompt-editor.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PromptService } from '../../services/prompt.service';
import { PromptCreate } from '../../models/prompt.model';

import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-prompt-editor',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './prompt-editor.component.html',
  styleUrls: ['./prompt-editor.component.scss'],
})
export class PromptEditorComponent implements OnInit {
  form!: FormGroup;
  variables: string[] = [];
  newVariable = '';
  availableModels = ['GPT-4', 'GPT-3.5', 'Gemini Pro', 'Claude 3', 'Llama 3'];

  isEditMode = false;
  promptId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private promptService: PromptService
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
      this.promptService.getPrompt(this.promptId).subscribe(p => {
        this.form.patchValue({
          name: p.name,
          template: p.template,
          ia_model: p.ia_model,
        });
        this.variables = [...p.variables];
      });
    }
  }

  addVariable() {
    const v = this.newVariable.trim();
    if (v && !this.variables.includes(v)) {
      this.variables.push(v);
    }
    this.newVariable = '';
  }

  removeVariable(v: string) {
    this.variables = this.variables.filter(x => x !== v);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const payload: PromptCreate = {
      name: this.form.value.name,
      template: this.form.value.template,
      ia_model: this.form.value.ia_model,
      variables: this.variables,
    };

    if (this.isEditMode && this.promptId) {
      this.promptService.updatePrompt(this.promptId, payload).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.promptService.createPrompt(payload).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
