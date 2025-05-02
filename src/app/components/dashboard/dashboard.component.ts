import { Component } from '@angular/core';
import { CommonModule }    from '@angular/common';
import { RouterModule }    from '@angular/router';

// Material
import { MatCardModule }   from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule }   from '@angular/material/icon';
import { MatChipsModule }  from '@angular/material/chips';

export interface PromptSummary {
  id: number;
  title: string;
  model: string;
  lastUsed: string;
  categories: string[];
}

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
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  recentPrompts: PromptSummary[] = [
    { id: 1, title: 'Product Description Generator', model: 'GPT-4', lastUsed: '2h ago', categories: ['marketing','e-commerce'] },
    { id: 2, title: 'Code Refactoring',             model: 'Gemini Pro', lastUsed: 'yesterday',   categories: ['dev','coding'] },
    { id: 3, title: 'Email Template',               model: 'Claude 3',    lastUsed: '3 days',     categories: ['communication','biz'] },
  ];
}
