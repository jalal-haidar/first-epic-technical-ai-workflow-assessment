export interface User {
  id: string;
  name: string;
  role: string;
  status: string;
  lastLogin: string;
}

export interface UsersApiResponse {
  success: boolean;
  count: number;
  page: number;
  limit: number;
  totalPages: number;
  data: User[];
}
