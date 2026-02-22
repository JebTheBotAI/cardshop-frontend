# Cardshop Frontend

Next.js frontend for the `cardshop-api` backend.

## Features

- Public card catalog with pagination/filter/search
- Card detail page
- Admin login + create-card UI (JWT via `/login`)

## Backend

Set API base URL in `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000
