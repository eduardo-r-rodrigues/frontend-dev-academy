export interface PromptCreate {
  name: string;
  template: string;
  ia_model: string;
  variables: string[];
}

export interface PromptOut extends PromptCreate {
  id: string;
}
