export interface ApiResponse<T = any> {
    status: 'success' | 'error';
    results?: number;
    data?: { [index: string]: T };
    message?: string;
  }
  