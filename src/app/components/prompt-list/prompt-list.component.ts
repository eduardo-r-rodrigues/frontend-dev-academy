// src/app/components/prompt-list/prompt-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Angular Material Modules
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Prompt {
  id: string;
  name: string;
  ia_model: string;
  template: string;
}

@Component({
  selector: 'app-prompt-list',
  standalone: true,
  imports: [
    CommonModule, // *ngFor
    RouterLink, // [routerLink]
    MatGridListModule, // <mat-grid-list> / <mat-grid-tile>
    MatCardModule, // <mat-card> e sub-componentes
    MatButtonModule, // <button mat-stroked-button>
    MatIconModule, // <mat-icon>
  ],
  templateUrl: './prompt-list.component.html',
  styleUrls: ['./prompt-list.component.scss'],
})
export class PromptListComponent implements OnInit {
  prompts: Prompt[] = [];

  ngOnInit(): void {
    this.prompts = [
      {
        id: '1',
        name: 'Saudação',
        ia_model: 'gemini-2.0',
        template: 'Olá, {{nome}}!',
      },
      {
        id: '2',
        name: 'Resumo Texto',
        ia_model: 'gemini-2.0',
        template: 'Resuma: {{texto}}',
      },
    ];
  }
}
