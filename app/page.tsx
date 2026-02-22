import Link from "next/link";
import { getCards, getCategories } from "@/lib/api";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; category?: string; rarity?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page || 0);
  const [cardsPage, categories] = await Promise.all([
    getCards({ page, size: 12, search: params.search, category: params.category, rarity: params.rarity }),
    getCategories(),
  ]);

  return (
    <main style={{ padding: 24, fontFamily: "Arial, sans-serif", maxWidth: 1100, margin: "0 auto" }}>
      <h1>Card Shop</h1>
      <form style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input name="search" placeholder="Search cards" defaultValue={params.search} />
        <select name="category" defaultValue={params.category || ""}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <input name="rarity" placeholder="Rarity" defaultValue={params.rarity} />
        <button type="submit">Filter</button>
        <Link href="/admin">Admin</Link>
      </form>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {cardsPage.content.map((card) => (
          <Link key={card.id} href={`/cards/${card.id}`} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
            <h3>{card.name}</h3>
            <p>{card.rarity}</p>
            <p>${card.price.toFixed(2)}</p>
            <p>Stock: {card.stock}</p>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        {page > 0 && (
          <Link href={`/?page=${page - 1}${params.search ? `&search=${encodeURIComponent(params.search)}` : ""}`}>
            Previous
          </Link>
        )}
        {page + 1 < cardsPage.totalPages && (
          <Link href={`/?page=${page + 1}${params.search ? `&search=${encodeURIComponent(params.search)}` : ""}`}>
            Next
          </Link>
        )}
      </div>
    </main>
  );
}
