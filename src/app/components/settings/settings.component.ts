import { Component } from '@angular/core';
import { CommonModule }    from '@angular/common';
import { FormsModule }     from '@angular/forms';

// Angular Material
import { MatCardModule }      from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatIconModule }      from '@angular/material/icon';
import { MatButtonModule }    from '@angular/material/button';

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
    MatButtonModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  openaiKey = '';
  geminiKey = '';

  hideOpenai = true;
  hideGemini = true;

  toggleOpenaiVisibility(): void {
    this.hideOpenai = !this.hideOpenai;
  }

  toggleGeminiVisibility(): void {
    this.hideGemini = !this.hideGemini;
  }

  saveOpenaiKey(): void {
    localStorage.setItem('OPENAI_API_KEY', this.openaiKey);
    alert('OpenAI API key salva localmente.');
  }

  saveGeminiKey(): void {
    localStorage.setItem('GENAI_API_KEY', this.geminiKey);
    alert('Gemini API key salva localmente.');
  }
}
