export interface User {
  id: string;
  name: string;
  role: string;
  status: string;
  lastLogin: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  count: number;
  page: number;
  limit: number;
  totalPages: number;
  data: T[];
}
