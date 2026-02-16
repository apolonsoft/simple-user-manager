export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserPayload {
  name: string;
  email: string;
  password: string;
}
