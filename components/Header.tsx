"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const commonNav = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Calculator", href: "/calculator" },
  { label: "Quote", href: "/quote" },
  { label: "Cart", href: "/cart" },
];

export default function Header() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <header className="header">
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" className="logo">
          SolarSphere
        </Link>
        <nav style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {commonNav.map((item) => (
            <Link key={item.href} href={item.href} className="button button-secondary" style={{ padding: "0.75rem 1rem", background: "rgba(255,255,255,0.1)" }}>
              {item.label}
            </Link>
          ))}
          {isAdmin ? (
            <Link href="/admin/orders" className="button button-secondary" style={{ padding: "0.75rem 1rem", background: "rgba(255,255,255,0.1)" }}>
              Admin
            </Link>
          ) : null}
          {session ? (
            <>
              <Link href="/orders" className="button button-secondary" style={{ padding: "0.75rem 1rem", background: "rgba(255,255,255,0.1)" }}>
                Orders
              </Link>
              <button className="button button-primary" onClick={() => signOut({ callbackUrl: "/" })}>
                Sign out
              </button>
            </>
          ) : (
            <Link href="/auth/login" className="button button-primary" style={{ padding: "0.75rem 1rem" }}>
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
