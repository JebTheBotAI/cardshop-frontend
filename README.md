# Cardshop Frontend

Next.js frontend for the `cardshop-api` backend.

## Features

- Public card catalog with pagination/filter/search
- Card detail page
- Admin login + create-card UI (JWT via `/login`)

## Backend

Use environment templates:

- `.env.local.example` (local)
- `.env.production.example` (production)

Examples:

```bash
# local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

# production
NEXT_PUBLIC_API_BASE_URL=https://cardshop-api.onrender.com
```

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000
