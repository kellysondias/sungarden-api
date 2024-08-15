export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResponse {
  status: string;
  errors: ValidationError[];
}

