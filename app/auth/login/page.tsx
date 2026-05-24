"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setIsSubmitting(false);

    if (result?.error) {
      setErrorMessage("Invalid email or password.");
      return;
    }

    window.location.href = "/";
  };

  return (
    <main>
      <Header />
      <section className="section">
        <div className="container" style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <h1>Login to SolarSphere</h1>
            <p className="section-subtitle">Sign in to manage orders, request quotes, and track installation progress.</p>
            <form className="card" onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Email address</label>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </div>
              <div className="input-group" style={{ marginTop: "1rem" }}>
                <label>Password</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              </div>
              <button className="button button-primary" type="submit" style={{ marginTop: "1rem" }} disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
              {errorMessage ? <p style={{ marginTop: "1rem", color: "#dc2626" }}>{errorMessage}</p> : null}
              <p style={{ marginTop: "1rem" }}>
                Don&apos;t have an account? <Link href="/auth/register">Create one</Link>.
              </p>
            </form>
          </div>
          <div className="card">
            <h2>Quick access</h2>
            <ul className="detail-list">
              <li>Customer portal access</li>
              <li>Admin order management</li>
              <li>Installer status tracking</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
