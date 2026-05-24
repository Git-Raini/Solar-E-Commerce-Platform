"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { calculateSolarRecommendation } from "@/lib/data";

export default function CalculatorPage() {
  const [monthlyBill, setMonthlyBill] = useState(120);
  const [roofArea, setRoofArea] = useState(120);
  const [location, setLocation] = useState("India");
  const [result, setResult] = useState(() => calculateSolarRecommendation({ monthlyBill, roofArea, location }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(calculateSolarRecommendation({ monthlyBill, roofArea, location }));
  };

  return (
    <main>
      <Header />
      <section className="section">
        <div className="container" style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <h1>Solar Savings Calculator</h1>
            <p className="section-subtitle">Estimate required system size, installation cost, annual savings, carbon reduction, and payback period.</p>
            <form className="card" onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Monthly electricity bill (USD)</label>
                <input type="number" value={monthlyBill} min={10} onChange={(event) => setMonthlyBill(Number(event.target.value))} />
              </div>
              <div className="input-group">
                <label>Available roof area (m²)</label>
                <input type="number" value={roofArea} min={20} onChange={(event) => setRoofArea(Number(event.target.value))} />
              </div>
              <div className="input-group">
                <label>Location</label>
                <select value={location} onChange={(event) => setLocation(event.target.value)}>
                  <option>India</option>
                  <option>USA</option>
                  <option>Germany</option>
                  <option>UK</option>
                  <option>Australia</option>
                </select>
              </div>
              <button className="button button-primary" type="submit" style={{ marginTop: "1rem" }}>
                Estimate system
              </button>
            </form>
          </div>

          <div className="card">
            <h2>Estimated results</h2>
            <ul className="detail-list" style={{ marginTop: "1rem" }}>
              <li>Required system size: <strong>{result.requiredKW} kW</strong></li>
              <li>Estimated project cost: <strong>${result.estimatedCost.toLocaleString()}</strong></li>
              <li>Annual savings: <strong>${result.annualSavings.toLocaleString()}</strong></li>
              <li>Payback period: <strong>{result.paybackYears} years</strong></li>
              <li>Annual CO₂ reduction: <strong>{result.co2Reduction} kg</strong></li>
            </ul>
            <p style={{ marginTop: "1rem" }}>Use this estimate to create a quote, compare products, and schedule installation.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
