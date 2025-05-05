import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
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
  tags: string[] = [];
  newTag = '';
  availableModels = ['GPT-4', 'GPT-3.5', 'Gemini Pro', 'Claude 3', 'Llama 3'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: [''],
      content: [''],
      models: [[]],
    });
  }

  addTag() {
    const t = this.newTag.trim();
    if (t && !this.tags.includes(t)) {
      this.tags.push(t);
    }
    this.newTag = '';
  }

  removeTag(t: string) {
    this.tags = this.tags.filter((x) => x !== t);
  }

  onSubmit() {
    if (this.form.valid) {
      const payload = {
        ...this.form.value,
        tags: this.tags,
      };
      console.log('Saving prompt →', payload);
      // TODO: chamar serviço
    }
  }
}
