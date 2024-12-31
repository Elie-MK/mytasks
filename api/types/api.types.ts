export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
  metadata?: Record<string, any>;
}
