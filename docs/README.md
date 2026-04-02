# Documentation

This directory contains project documentation for the First Epic Technical AI Workflow Assessment.

## Contents

- [Architecture Decision Records](./architecture.md) — Key architectural choices and rationale
- [API Documentation](./api.md) — REST API endpoints, parameters, and response formats

## Project Structure

```
├── .github/
│   └── copilot-instructions.md
├── docs/
│   ├── README.md
│   ├── api.md
│   └── architecture.md
├── backend/                        # Nest.js API (port 3000)
│   ├── src/
│   │   ├── users/
│   │   │   ├── types/
│   │   │   │   └── user.types.ts   # User & PaginatedResponse interfaces
│   │   │   ├── users.controller.ts # GET /api/users (thin, delegates to service)
│   │   │   ├── users.module.ts     # UsersModule wiring
│   │   │   └── users.service.ts    # Mock data, pagination, search logic
│   │   ├── app.controller.ts
│   │   ├── app.module.ts           # Imports UsersModule
│   │   ├── app.service.ts
│   │   └── main.ts                 # CORS enabled
│   └── package.json
├── frontend/                       # Next.js App Router (port 3001)
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── page.module.css
│   │   │   └── page.tsx            # User Directory page (client component)
│   │   ├── components/
│   │   │   ├── Pagination.tsx      # Previous/Next page controls
│   │   │   ├── Pagination.module.css
│   │   │   ├── SearchInput.tsx     # Search text input
│   │   │   ├── SearchInput.module.css
│   │   │   ├── UserCard.tsx        # Individual user card
│   │   │   ├── UserCard.module.css
│   │   │   ├── UserList.tsx        # User list wrapper
│   │   │   └── UserList.module.css
│   │   ├── hooks/
│   │   │   └── useUsers.ts         # Data fetching + state (debounced search)
│   │   └── types/
│   │       └── user.ts             # User & UsersApiResponse interfaces
│   └── package.json
├── page.tsx                        # Original flawed frontend (reference)
└── users.controller.ts             # Original flawed backend (reference)
```
