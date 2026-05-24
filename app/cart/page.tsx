"use client";

import { useEffect, useMemo, useState } from "react";
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

const DEFAULT_ITEMS: CartItem[] = [
  { id: "panel-001", quantity: 1 },
  { id: "inverter-001", quantity: 1 },
];

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch(console.error);

    const savedCart = window.localStorage.getItem("solarCart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    } else {
      setItems(DEFAULT_ITEMS);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("solarCart", JSON.stringify(items));
  }, [items]);

  const updateQuantity = (id: string, quantity: number) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)));
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const cartProducts = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((product) => product.id === item.id);
          return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter(Boolean) as Array<Product & { quantity: number }>,
    [items, products]
  );

  const subtotal = cartProducts.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + tax;

  return (
    <main>
      <Header />
      <section className="section">
        <div className="container">
          <h1>Shopping cart</h1>
          <p className="section-subtitle">Review your selected items, update quantities, apply coupons, and proceed to checkout.</p>
          <div className="card" style={{ overflowX: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Unit price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.price.toFixed(0)}</td>
                    <td>
                      <input type="number" min={1} value={item.quantity} style={{ width: "4rem" }} onChange={(event) => updateQuantity(item.id, Number(event.target.value))} />
                    </td>
                    <td>${(item.price * item.quantity).toFixed(0)}</td>
                    <td>
                      <button className="button button-secondary" onClick={() => removeItem(item.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <div className="card" style={{ flex: 1, minWidth: "280px" }}>
              <h2>Payment summary</h2>
              <ul className="detail-list">
                <li>Subtotal: ${subtotal.toFixed(0)}</li>
                <li>Estimated tax: ${tax.toFixed(0)}</li>
                <li>
                  <strong>Total: ${total.toFixed(0)}</strong>
                </li>
              </ul>
              <a href="/checkout" className="button button-primary" style={{ display: "inline-block", width: "100%", textAlign: "center", marginTop: "1rem" }}>
                Proceed to checkout
              </a>
            </div>
            <div className="card" style={{ flex: 1, minWidth: "280px" }}>
              <h2>Checkout support</h2>
              <p>Choose shipping, installation preferences, and payment type on the next page.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
