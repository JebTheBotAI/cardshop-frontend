import Link from "next/link";
import { getCardById } from "@/lib/api";

export default async function CardDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const card = await getCardById(id);

  return (
    <main style={{ padding: 24, fontFamily: "Arial, sans-serif", maxWidth: 900, margin: "0 auto" }}>
      <Link href="/">← Back</Link>
      <h1>{card.name}</h1>
      <p>{card.description}</p>
      <p>Rarity: {card.rarity}</p>
      <p>Price: ${card.price.toFixed(2)}</p>
      <p>Stock: {card.stock}</p>
      {card.imageUrl ? <img src={card.imageUrl} alt={card.name} style={{ maxWidth: 360, borderRadius: 8 }} /> : null}
    </main>
  );
}
