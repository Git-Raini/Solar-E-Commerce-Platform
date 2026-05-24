import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  return (
    <main>
      <Header />
      <section className="section">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p className="section-subtitle">Manage products, orders, inventory, and reporting from a central portal.</p>
          <div className="grid-3" style={{ marginTop: "2rem" }}>
            <div className="card">
              <h3>Products</h3>
              <p>Add, update, and organize catalog items with country-specific pricing and specifications.</p>
            </div>
            <div className="card">
              <h3>Orders</h3>
              <p>Track order status, refunds, cancellations, and delivery or installation progress.</p>
            </div>
            <div className="card">
              <h3>Analytics</h3>
              <p>View sales volume, conversion, traffic, and inventory health across regions.</p>
            </div>
          </div>
          <div className="card" style={{ marginTop: "2rem" }}>
            <h2>Key metrics</h2>
            <div className="grid-3">
              <div>
                <p className="badge">Orders</p>
                <p style={{ fontSize: "1.5rem" }}>1,280</p>
              </div>
              <div>
                <p className="badge">Revenue</p>
                <p style={{ fontSize: "1.5rem" }}>$354,000</p>
              </div>
              <div>
                <p className="badge">Conversion</p>
                <p style={{ fontSize: "1.5rem" }}>5.6%</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
