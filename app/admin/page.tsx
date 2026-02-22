"use client";

import { useState } from "react";
import { adminCreateCard, login } from "@/lib/api";

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 9.99,
    stock: 1,
    rarity: "COMMON",
    categoryId: 1,
    imageUrl: "",
  });

  async function doLogin() {
    try {
      const t = await login(username, password);
      setToken(t);
      setMsg("Logged in");
    } catch {
      setMsg("Login failed");
    }
  }

  async function createCard() {
    try {
      await adminCreateCard(token, form as any);
      setMsg("Card created");
    } catch {
      setMsg("Create failed");
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: "Arial, sans-serif", maxWidth: 900, margin: "0 auto" }}>
      <h1>Admin</h1>
      <p>{msg}</p>
      <div style={{ display: "grid", gap: 8, maxWidth: 360 }}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
        <button onClick={doLogin}>Login</button>
      </div>

      <hr style={{ margin: "16px 0" }} />
      <h2>Create Card</h2>
      <div style={{ display: "grid", gap: 8, maxWidth: 480 }}>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
        <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" />
        <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} placeholder="Price" />
        <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} placeholder="Stock" />
        <input value={form.rarity} onChange={(e) => setForm({ ...form, rarity: e.target.value })} placeholder="Rarity" />
        <input type="number" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })} placeholder="Category ID" />
        <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="Image URL" />
        <button onClick={createCard} disabled={!token}>Create</button>
      </div>
    </main>
  );
}
