import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PromptCreate, PromptOut } from '../models/prompt.model';

@Injectable({ providedIn: 'root' })
export class PromptService {
  private base = 'http://127.0.0.1:8000/prompts';

  constructor(private http: HttpClient) {}

  getPrompts(): Observable<PromptOut[]> {
    return this.http.get<PromptOut[]>(this.base);
  }

  getPrompt(id: string): Observable<PromptOut> {
    return this.http.get<PromptOut>(`${this.base}/${id}`);
  }

  createPrompt(data: PromptCreate): Observable<PromptOut> {
    return this.http.post<PromptOut>(this.base, data);
  }

  updatePrompt(id: string, data: PromptCreate): Observable<PromptOut> {
    return this.http.put<PromptOut>(`${this.base}/${id}`, data);
  }

  deletePrompt(id: string): Observable<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`${this.base}/${id}`);
  }
}