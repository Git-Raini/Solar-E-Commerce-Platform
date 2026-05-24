"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type OrderItem = {
  id: string;
  quantity: number;
  unitPrice: number;
  product: {
    name: string;
  };
};

type Order = {
  id: string;
  status: string;
  total: number;
  currency: string;
  createdAt: string;
  items: OrderItem[];
};

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session) {
      fetch("/api/orders")
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
            return;
          }
          setOrders(data);
        })
        .catch(() => setError("Unable to load orders."));
    }
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <main>
        <Header />
        <section className="section">
          <div className="container">
            <h1>Your orders</h1>
            <p className="section-subtitle">You need to sign in to view your orders.</p>
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
        <div className="container">
          <h1>Your orders</h1>
          {error ? <p style={{ color: "#dc2626" }}>{error}</p> : null}
          {orders.length === 0 ? (
            <p className="section-subtitle">No orders have been placed yet.</p>
          ) : (
            <div className="card" style={{ overflowX: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Created</th>
                    <th>Items</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.status}</td>
                      <td>{order.currency} {order.total.toFixed(0)}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>{order.items.map((item) => `${item.product.name} (${item.quantity})`).join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
