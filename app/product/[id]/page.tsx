import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductDetailsPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    notFound();
  }

  return (
    <main>
      <Header />
      <section className="section">
        <div className="container" style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1.5fr 1fr" }}>
          <div>
            <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: "1rem" }} />
            <p className="badge">{product.category}</p>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div className="card" style={{ marginTop: "1.5rem" }}>
              <h3>Technical specifications</h3>
              <ul className="spec-list">
                <li>Power output: {product.power}</li>
                <li>Efficiency: {product.efficiency}</li>
                <li>Warranty: {product.warranty}</li>
                <li>Availability: {product.availability}</li>
                <li>Region: {product.country}</li>
                <li>Rating: {product.rating} / 5</li>
              </ul>
            </div>
          </div>
          <aside className="card">
            <h2>Order summary</h2>
            <p style={{ fontSize: "1.5rem", margin: "1rem 0" }}>${product.price.toFixed(0)}</p>
            <p>Secure checkout, installation scheduling, and financing options available.</p>
            <button className="button button-primary" style={{ width: "100%", marginTop: "1.5rem" }}>
              Add to cart
            </button>
            <button className="button button-secondary" style={{ width: "100%", marginTop: "0.75rem" }}>
              Request quote
            </button>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}
