import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  openaiKey = '';
  geminiKey = '';

  hideOpenai = true;
  hideGemini = true;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Load saved API keys from localStorage
    this.loadSavedKeys();
  }

  loadSavedKeys(): void {
    const openaiKey = localStorage.getItem('OPENAI_API_KEY');
    const geminiKey = localStorage.getItem('GENAI_API_KEY');
    
    if (openaiKey) {
      this.openaiKey = openaiKey;
    }
    
    if (geminiKey) {
      this.geminiKey = geminiKey;
    }
  }

  toggleOpenaiVisibility(): void {
    this.hideOpenai = !this.hideOpenai;
  }

  toggleGeminiVisibility(): void {
    this.hideGemini = !this.hideGemini;
  }

  saveOpenaiKey(): void {
    localStorage.setItem('OPENAI_API_KEY', this.openaiKey);
    this.showSuccessSnackbar('OpenAI API key saved successfully');
  }

  saveGeminiKey(): void {
    localStorage.setItem('GENAI_API_KEY', this.geminiKey);
    this.showSuccessSnackbar('Gemini API key saved successfully');
  }

  private showSuccessSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['green-snackbar']
    });
  }
}