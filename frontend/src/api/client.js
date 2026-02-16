const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

async function request(path, options = {}) {
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
      const data = await response.json();
      message = data.message || message;
    } catch {
      message = response.statusText || message;
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  register: (payload) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  login: (payload) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  getUsers: () => request("/users"),
  createUser: (payload) =>
    request("/users", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  updateUser: (id, payload) =>
    request(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload)
    }),
  deleteUser: (id) =>
    request(`/users/${id}`, {
      method: "DELETE"
    })
};
