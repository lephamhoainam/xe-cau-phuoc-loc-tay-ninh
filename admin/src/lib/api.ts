const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type User = {
  username: string;
  role: "superAdmin" | "staff";
  permissions: string[];
};

export function getToken(): string | null {
  return typeof window === "undefined" ? null : localStorage.getItem("token");
}

export function saveSession(token: string, user: User) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function hasPermission(user: User | null, permission: string): boolean {
  return !!user && (user.role === "superAdmin" || user.permissions.includes(permission));
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (res.status === 401 && token && !path.startsWith("/api/auth/login")) {
      clearSession();
      window.location.href = "/login";
    }
    throw new Error(data.message ?? "Có lỗi xảy ra");
  }

  return data as T;
}