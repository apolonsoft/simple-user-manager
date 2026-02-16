import type { AuthUser, LoginPayload, UserPayload } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    let message = "Request failed";
    try {
      const data = (await response.json()) as { message?: string };
      message = data.message || message;
    } catch {
      message = response.statusText || message;
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  register: (payload: UserPayload) =>
    request<AuthUser>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  login: (payload: LoginPayload) =>
    request<AuthUser>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  getUsers: () => request<AuthUser[]>("/users"),
  createUser: (payload: UserPayload) =>
    request<AuthUser>("/users", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  updateUser: (id: number, payload: UserPayload) =>
    request<AuthUser>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload)
    }),
  deleteUser: (id: number) =>
    request<null>(`/users/${id}`, {
      method: "DELETE"
    })
};
