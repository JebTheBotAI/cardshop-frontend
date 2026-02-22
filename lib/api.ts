export type Category = { id: number; name: string };
export type Card = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  rarity: string;
  categoryId: number;
  categoryName?: string;
  imageUrl?: string;
};

export type PageResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

function qs(params: Record<string, string | number | undefined>) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") sp.set(k, String(v));
  });
  return sp.toString();
}

export async function getCards(params: {
  page?: number;
  size?: number;
  category?: string;
  rarity?: string;
  search?: string;
}): Promise<PageResponse<Card>> {
  const query = qs(params);
  const res = await fetch(`${API_BASE}/api/v1/cards${query ? `?${query}` : ""}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load cards");
  return res.json();
}

export async function getCardById(id: string): Promise<Card> {
  const res = await fetch(`${API_BASE}/api/v1/cards/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Card not found");
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/api/v1/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load categories");
  return res.json();
}

export async function login(username: string, password: string): Promise<string> {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  return data.access_token || data.token || "";
}

export async function adminCreateCard(token: string, payload: Omit<Card, "id">) {
  const res = await fetch(`${API_BASE}/api/v1/admin/cards`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Create failed");
  return res.json();
}
