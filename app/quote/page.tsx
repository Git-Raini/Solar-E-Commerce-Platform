"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function QuotePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "India",
    electricityBill: 0,
    roofArea: 0,
    preferredTimeline: "1-2 weeks",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: name === "electricityBill" || name === "roofArea" ? Number(value) : value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const result = await response.json();
      setError(result.error || "Failed to submit quote request.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <main>
      <Header />
      <section className="section">
        <div className="container" style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <h1>Request a custom quote</h1>
            <p className="section-subtitle">Our team will review system requirements, cost estimates, and installation preferences for your project.</p>
            <form className="card" onSubmit={handleSubmit}>
              <div className="grid-3">
                <div className="input-group">
                  <label>Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} required />
                </div>
              </div>
              <div className="grid-3" style={{ marginTop: "1rem" }}>
                <div className="input-group">
                  <label>Country</label>
                  <select name="country" value={form.country} onChange={handleChange}>
                    <option>India</option>
                    <option>USA</option>
                    <option>Germany</option>
                    <option>UK</option>
                    <option>Australia</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Monthly electricity bill (USD)</label>
                  <input name="electricityBill" type="number" value={form.electricityBill} onChange={handleChange} min={0} required />
                </div>
                <div className="input-group">
                  <label>Roof area (m²)</label>
                  <input name="roofArea" type="number" value={form.roofArea} onChange={handleChange} min={0} required />
                </div>
              </div>
              <div className="input-group" style={{ marginTop: "1rem" }}>
                <label>Preferred timeline</label>
                <select name="preferredTimeline" value={form.preferredTimeline} onChange={handleChange}>
                  <option>1-2 weeks</option>
                  <option>2-4 weeks</option>
                  <option>Flexible</option>
                </select>
              </div>
              <div className="input-group" style={{ marginTop: "1rem" }}>
                <label>Additional information</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={4} />
              </div>
              <button className="button button-primary" style={{ marginTop: "1rem" }} type="submit">
                Submit quote request
              </button>
              {error ? <p style={{ marginTop: "1rem", color: "#dc2626" }}>{error}</p> : null}
            </form>
          </div>
          <div className="card">
            <h2>What happens next?</h2>
            <ul className="detail-list">
              <li>We review your information within 24 hours.</li>
              <li>Deliver a personalized solar system recommendation.</li>
              <li>Provide installation and financing options.</li>
            </ul>
            {submitted ? <p style={{ marginTop: "1rem", fontWeight: 600 }}>Your request has been submitted successfully.</p> : null}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
