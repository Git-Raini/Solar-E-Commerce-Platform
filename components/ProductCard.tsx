import Link from "next/link";
import type { Product } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card product-card">
      <img src={product.image} alt={product.name} />
      <div>
        <p className="badge">{product.category}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <ul className="spec-list">
          <li>Power: {product.power}</li>
          <li>Efficiency: {product.efficiency}</li>
          <li>Warranty: {product.warranty}</li>
        </ul>
      </div>
      <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
        <strong>${product.price.toFixed(0)}</strong>
        <Link href={`/product/${product.id}`} className="button button-primary">
          View
        </Link>
      </div>
    </article>
  );
}
