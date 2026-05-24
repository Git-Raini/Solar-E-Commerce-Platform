# SolarSphere

SolarSphere is a full-stack MVP implementation of the Global Solar E-Commerce Platform described in the PRD. It includes:

- React + Next.js frontend
- App Router pages for Home, Products, Product Details, Cart, Calculator, Quote request, Dashboard, and Login
- API routes for products, quotes, calculator estimates, and cart state
- Shared product catalog data and system estimation utilities

## Getting started

1. Install dependencies

```bash
npm install
```

2. Start development server

```bash
npm run dev
```

3. Open the app at `http://localhost:3000`

## Project structure

- `app/` – Next.js app router pages and API routes
- `components/` – shared UI components
- `lib/` – mock data, product catalog, and calculation utilities
- `styles/` – global styling

## Notes

This scaffold is built as an end-to-end prototype. It is ready for:

- adding real database persistence
- implementing authentication and authorization flows
- connecting to payment and finance providers
- expanding the installer and admin workflows
