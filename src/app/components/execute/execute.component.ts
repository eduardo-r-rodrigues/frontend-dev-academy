import { Component, OnInit }    from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

// Angular Material
import { MatCardModule }        from '@angular/material/card';
import { MatFormFieldModule }   from '@angular/material/form-field';
import { MatInputModule }       from '@angular/material/input';
import { MatButtonModule }      from '@angular/material/button';
import { MatIconModule }        from '@angular/material/icon';
import { MatChipsModule }       from '@angular/material/chips';

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
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './execute.component.html',
  styleUrls: ['./execute.component.scss'],
})
export class ExecuteComponent implements OnInit {
  promptId!: string;
  iaModel = '';
  inputText = '';
  variables: Record<string, any> = {};
  variableKeys: string[] = [];
  output: any = null;
  latency_ms: number | null = null;
  cost: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.promptId = this.route.snapshot.paramMap.get('id')!;
    // se quiser puxar dados do prompt (título, modelo, variáveis default), faça aqui
  }

  onSubmit(): void {
    // Aqui você chamaria seu serviço HTTP para /execute/gemini ou o que for
    console.log('Executar prompt', {
      promptId: this.promptId,
      iaModel: this.iaModel,
      inputText: this.inputText,
      variables: this.variables,
    });
    // Exemplo mock:
    this.output = `Resposta simulada para "${this.inputText}"`;
    this.latency_ms = 123;
    this.cost = 0.004;
  }
}
