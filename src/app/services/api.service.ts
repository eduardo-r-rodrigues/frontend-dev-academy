// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prompt, Execution, Metrics } from '../models/prompt.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Prompts
  getPrompts(): Observable<Prompt[]> {
    return this.http.get<Prompt[]>(`${this.base}/prompts`);
  }
  createPrompt(p: Partial<Prompt>): Observable<Prompt> {
    return this.http.post<Prompt>(`${this.base}/prompts`, p);
  }

  // Execute
  executePrompt(id: string, vars: any): Observable<Execution> {
    return this.http.post<Execution>(`${this.base}/execute`, {
      prompt_id: id,
      variables: vars,
      ia_model: 'gpt-3.5-turbo'
    });
  }

  // Metrics
  getMetrics(id: string): Observable<Metrics> {
    return this.http.get<Metrics>(`${this.base}/prompts/${id}/metrics`);
  }
}
