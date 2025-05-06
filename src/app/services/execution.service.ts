import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExecutionResult {
  output: any;
  latency_ms: number;
  cost: number;
}

@Injectable({ providedIn: 'root' })
export class ExecutionService {
  private baseUrl = 'http://127.0.0.1:8000';

  // Map of frontend model names to backend model IDs
  private modelMap: Record<string, string> = {
    'GPT-4': 'gpt-4',
    'GPT-3.5': 'gpt-3.5-turbo',
    'Gemini Pro': 'gemini-1.5-pro',
    'Gemini Flash': 'gemini-1.5-flash',
    'Claude 3': 'claude-3-opus'
  };

  constructor(private http: HttpClient) {}

  /**
   * Execute a prompt with text input
   */
  executePrompt(promptId: string, inputText: string, variables: Record<string, any> = {}, iaModel?: string): Observable<ExecutionResult> {
    // Create form data for multipart request
    const formData = new FormData();
    formData.append('prompt_id', promptId);
    formData.append('input_text', inputText);
    formData.append('variables', JSON.stringify(variables));
    
    // Convert frontend model name to backend model ID if needed
    const backendModel = iaModel ? (this.modelMap[iaModel] || iaModel) : undefined;
    
    if (backendModel) {
      formData.append('ia_model', backendModel);
    }
    
    // Use the correct endpoint now that you've fixed the router
    return this.http.post<ExecutionResult>(`${this.baseUrl}/execute`, formData);
  }

  /**
   * Execute a prompt with file input
   */
  executePromptWithFile(promptId: string, file: File, variables: Record<string, any> = {}, iaModel?: string): Observable<ExecutionResult> {
    // Create form data for multipart request
    const formData = new FormData();
    formData.append('prompt_id', promptId);
    formData.append('input_file', file);
    formData.append('variables', JSON.stringify(variables));
    
    // Convert frontend model name to backend model ID if needed
    const backendModel = iaModel ? (this.modelMap[iaModel] || iaModel) : undefined;
    
    if (backendModel) {
      formData.append('ia_model', backendModel);
    }
    
    // Use the correct endpoint now that you've fixed the router
    return this.http.post<ExecutionResult>(`${this.baseUrl}/execute`, formData);
  }
}