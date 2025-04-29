import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-execute',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './execute.component.html',
  styleUrls: ['./execute.component.scss'],
})
export class ExecuteComponent implements OnInit {
  prompt = { id: '1', template: 'Olá, {{nome}}!', variables: ['nome'] };
  variableValues: Record<string, string> = {};
  output = '';
  latency_ms = 0;
  cost = 0;

  ngOnInit(): void {
    this.prompt.variables.forEach((v) => (this.variableValues[v] = ''));
  }

  onExecute(): void {
    this.output = this.prompt.template.replace(
      /\{\{nome\}\}/,
      this.variableValues['nome'] || 'usuário'
    );
    this.latency_ms = Math.floor(Math.random() * 200) + 50;
    this.cost = parseFloat((Math.random() * 0.005).toFixed(4));
  }
}
