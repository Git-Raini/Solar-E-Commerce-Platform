import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function HomePage() {
  const featured = await prisma.product.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <Header />
      <section className="main-hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <p className="badge">Global Solar Marketplace</p>
              <h1 className="section-title">Power your world with clean solar energy.</h1>
              <p className="section-subtitle">
                Discover panels, batteries, inverters, EV chargers, installation services, financing, and energy monitoring in one platform.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/products" className="cta-button button-primary">
                  Browse Products
                </Link>
                <Link href="/calculator" className="cta-button button-secondary">
                  Calculate Savings
                </Link>
              </div>
            </div>
            <div className="card" style={{ background: "rgba(255,255,255,0.14)" }}>
              <h2>Build your solar system</h2>
              <p>Complete self-service workflow for product selection, quote creation, checkout, and installation scheduling.</p>
              <div className="grid-3" style={{ marginTop: "1.5rem" }}>
                <div>
                  <h4>250+</h4>
                  <p>Products</p>
                </div>
                <div>
                  <h4>15+</h4>
                  <p>Countries</p>
                </div>
                <div>
                  <h4>98%</h4>
                  <p>Customer satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <h2>Featured Solar Products</h2>
              <p className="section-subtitle">Explore highest-rated solar products selected for reliability, performance, and global compatibility.</p>
            </div>
            <Link href="/products" className="button button-secondary">
              View all products
            </Link>
          </div>
          <div className="product-grid" style={{ marginTop: "2rem" }}>
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr 1fr", alignItems: "center" }}>
            <div>
              <h2>Solar Savings Calculator</h2>
              <p className="section-subtitle">Estimate your system size, installation cost, annual savings, carbon reduction, and payback period.</p>
              <Link href="/calculator" className="button button-primary">
                Start calculator
              </Link>
            </div>
            <div className="card">
              <h3>Why choose SolarSphere?</h3>
              <ul className="detail-list">
                <li>Localized product pricing and compliance</li>
                <li>Installer network and scheduling built in</li>
                <li>Financing and EMI workflows included</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Designed for homeowners, businesses, and installers</h2>
          <div className="grid-3" style={{ marginTop: "2rem" }}>
            <div className="card">
              <h3>Homeowners</h3>
              <p>Find panels, batteries, and installation quotes tailored to your roof and budget.</p>
            </div>
            <div className="card">
              <h3>Businesses</h3>
              <p>Configure large systems, track ROI, and secure financing for commercial solar projects.</p>
            </div>
            <div className="card">
              <h3>Installers</h3>
              <p>Manage jobs, appointment schedules, and customer details from one dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
