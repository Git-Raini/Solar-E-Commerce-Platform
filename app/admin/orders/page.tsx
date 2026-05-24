import Header from "@/components/Header";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role || session.user.role !== "ADMIN") {
    return (
      <main>
        <Header />
        <section className="section">
          <div className="container">
            <h1>Access denied</h1>
            <p className="section-subtitle">You need admin access to manage orders.</p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const orders = await prisma.order.findMany({
    include: {
      items: { include: { product: true } },
      user: { select: { email: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <Header />
      <section className="section">
        <div className="container">
          <h1>Admin orders</h1>
          <p className="section-subtitle">Review all orders and monitor order fulfillment performance.</p>
          <div className="card" style={{ overflowX: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Products</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.user.name || order.user.email}</td>
                    <td>{order.status}</td>
                    <td>{order.currency} {order.total.toFixed(0)}</td>
                    <td>{order.items.map((item) => `${item.product.name} x${item.quantity}`).join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
