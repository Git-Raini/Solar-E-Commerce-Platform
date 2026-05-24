"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  power: string;
  efficiency: string;
  warranty: string;
  rating: number;
  availability: string;
  country: string;
  image: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  }, []);

  const categories = useMemo(() => Array.from(new Set(products.map((product) => product.category))), [products]);
  const countries = useMemo(() => Array.from(new Set(products.map((product) => product.country))), [products]);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category ? product.category === category : true;
      const matchesCountry = country ? product.country === country : true;
      const matchesQuery = query
        ? product.name.toLowerCase().includes(query.toLowerCase()) || product.description.toLowerCase().includes(query.toLowerCase())
        : true;
      return matchesCategory && matchesCountry && matchesQuery;
    });
  }, [products, category, country, query]);

  return (
    <main>
      <Header />
      <section className="section">
        <div className="container">
          <h1>Product Catalog</h1>
          <p className="section-subtitle">Filter by category, country, and product name to find the equipment you need.</p>
          <div className="card" style={{ marginBottom: "1.5rem" }}>
            <div className="grid-3">
              <div className="input-group">
                <label>Search</label>
                <input placeholder="Search products" value={query} onChange={(event) => setQuery(event.target.value)} />
              </div>
              <div className="input-group">
                <label>Category</label>
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  <option value="">All categories</option>
                  {categories.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Country</label>
                <select value={country} onChange={(event) => setCountry(event.target.value)}>
                  <option value="">All countries</option>
                  {countries.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <p>{filtered.length} product{filtered.length === 1 ? "" : "s"} matching your filters.</p>
          </div>
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
