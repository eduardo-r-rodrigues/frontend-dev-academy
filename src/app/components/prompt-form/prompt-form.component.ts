// src/app/components/prompt-form/prompt-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-prompt-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './prompt-form.component.html',
  styleUrls: ['./prompt-form.component.scss'],
})
export class PromptFormComponent implements OnInit {
  name = '';
  template = '';
  ia_model = '';
  variables: string[] = [];
  readonly separatorKeysCodes = [13, 188] as const; // ENTER, COMMA

  ngOnInit(): void {
    this.name = '';
    this.template = '';
    this.ia_model = '';
    this.variables = [];
  }

  addVariableFromInput(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) this.variables.push(value);
    event.chipInput!.clear();
  }

  removeVariable(i: number): void {
    this.variables.splice(i, 1);
  }

  onSubmit(): void {
    console.log({
      name: this.name,
      template: this.template,
      ia_model: this.ia_model,
      variables: this.variables,
    });
  }
}
