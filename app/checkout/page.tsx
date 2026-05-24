"use client";

import { useEffect, useMemo, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type CartItem = {
  id: string;
  quantity: number;
};

type Product = {
  id: string;
  name: string;
  price: number;
};

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "USA",
    currency: "USD",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch(console.error);

    const savedCart = window.localStorage.getItem("solarCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const items = useMemo(
    () =>
      cart
        .map((cartItem) => {
          const product = products.find((product) => product.id === cartItem.id);
          return product
            ? {
                id: product.id,
                name: product.name,
                quantity: cartItem.quantity,
                unitPrice: product.price,
              }
            : null;
        })
        .filter(Boolean) as Array<{ id: string; name: string; quantity: number; unitPrice: number }>,
    [cart, products]
  );

  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setShipping((current) => ({ ...current, [name]: value }));
  };

  const handleCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setIsLoading(true);

    const result = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, shipping }),
    });

    const data = await result.json();
    setIsLoading(false);

    if (!result.ok) {
      setError(data.error || "Unable to complete checkout.");
      return;
    }

    if (data.url) {
      window.location.href = data.url;
      return;
    }

    setMessage(`Order placed successfully. Order ID: ${data.orderId}`);
    window.localStorage.removeItem("solarCart");
    setCart([]);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <main>
        <Header />
        <section className="section">
          <div className="container">
            <h1>Checkout</h1>
            <p className="section-subtitle">You need to sign in before you can complete checkout.</p>
            <button className="button button-primary" onClick={() => signIn()}>
              Sign in
            </button>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      <section className="section">
        <div className="container" style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <h1>Checkout</h1>
            <p className="section-subtitle">Review your cart items, enter shipping details, and complete payment.</p>
            <form className="card" onSubmit={handleCheckout}>
              <div className="input-group">
                <label>Name</label>
                <input name="name" value={shipping.name} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Street address</label>
                <input name="address" value={shipping.address} onChange={handleChange} required />
              </div>
              <div className="grid-3" style={{ gap: "1rem" }}>
                <div className="input-group">
                  <label>City</label>
                  <input name="city" value={shipping.city} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>State</label>
                  <input name="state" value={shipping.state} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>Postal code</label>
                  <input name="postalCode" value={shipping.postalCode} onChange={handleChange} required />
                </div>
              </div>
              <div className="input-group">
                <label>Delivery country</label>
                <select name="country" value={shipping.country} onChange={handleChange}>
                  <option>India</option>
                  <option>USA</option>
                  <option>Germany</option>
                  <option>UK</option>
                  <option>Australia</option>
                </select>
              </div>
              <button className="button button-primary" type="submit" disabled={isLoading} style={{ marginTop: "1rem" }}>
                {isLoading ? "Processing order..." : "Place order"}
              </button>
              {error ? <p style={{ marginTop: "1rem", color: "#dc2626" }}>{error}</p> : null}
              {message ? <p style={{ marginTop: "1rem", color: "#059669" }}>{message}</p> : null}
            </form>
          </div>
          <div className="card">
            <h2>Order summary</h2>
            {items.length === 0 ? (
              <p>Your cart is currently empty.</p>
            ) : (
              <div>
                <ul className="detail-list">
                  {items.map((item) => (
                    <li key={item.id}>
                      {item.name} × {item.quantity} — ${item.unitPrice.toFixed(0)} each
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: "1rem" }}>
                  <strong>Total: ${total.toFixed(0)}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
