// src/app/models/prompt.model.ts
export interface Prompt {
    id: string;
    name: string;
    template: string;
    ia_model: string;
    variables: string[];
  }
  export interface Execution {
    output: any;
    latency_ms: number;
    cost: number;
  }
  export interface Metrics {
    total_executions: number;
    avg_latency_ms: number;
    avg_cost: number;
  }
  