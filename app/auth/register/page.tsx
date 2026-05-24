"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const result = await response.json();
      setError(result.error || "Unable to create account.");
      return;
    }

    setSuccess("Account created successfully. Redirecting to login...");
    setTimeout(() => router.push("/auth/login"), 1500);
  };

  return (
    <main>
      <Header />
      <section className="section">
        <div className="container" style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <h1>Create your account</h1>
            <p className="section-subtitle">Register to save quotes, checkout, and manage solar installations.</p>
            <form className="card" onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Name</label>
                <input name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="input-group" style={{ marginTop: "1rem" }}>
                <label>Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="input-group" style={{ marginTop: "1rem" }}>
                <label>Password</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} minLength={8} required />
              </div>
              <button className="button button-primary" type="submit" disabled={isSubmitting} style={{ marginTop: "1rem" }}>
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>
              {error ? <p style={{ marginTop: "1rem", color: "#dc2626" }}>{error}</p> : null}
              {success ? <p style={{ marginTop: "1rem", color: "#059669" }}>{success}</p> : null}
            </form>
          </div>
          <div className="card">
            <h2>Already registered?</h2>
            <p>Use your account credentials to log in and access orders, quotes, and checkout.</p>
            <Link href="/auth/login" className="button button-secondary" style={{ marginTop: "1rem" }}>
              Sign in
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
