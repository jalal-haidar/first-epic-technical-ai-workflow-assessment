# First Epic Technical AI Workflow Assessment

## Scenario

You've taken over a V1 codebase built by a junior team. The founders are complaining that the "User Directory" page freezes the browser when it loads, and the codebase is too tangled to easily add new features.

Two raw files are provided:

- `page.tsx` — A poorly optimized Next.js frontend component
- `users.controller.ts` — A basic Nest.js API controller

---

## Step-by-Step Requirements

### Step 0: Scaffold the Environment

- Generate a basic **Next.js frontend** project
- Generate a basic **Nest.js backend** project
- Drop the two raw files (`page.tsx`, `users.controller.ts`) into the correct locations
- Configure communication between frontend and backend:
  - Handle **CORS**
  - Configure **routing**
  - Ensure API connectivity works end-to-end

### Step 1: The Backend Fix (Nest.js API)

- **Problem:** `/api/users` endpoint generates and sends a massive, unpaginated payload in-memory (5000 records at once)
- **Fix:** Refactor to support **basic pagination** using `limit/offset` or `page/limit` query parameters
- Move business logic out of the controller into a **service layer**

### Step 2: The Frontend Rescue (Next.js Page)

- **Problem:** Frontend fetches the entire dataset at once and maps over it in a single monolithic file — kills performance
- **Fix:**
  - Implement a **paginated list** on the frontend
  - Break the UI into **clean sub-components** (e.g., UserCard, UserList, SearchInput)
  - Extract fetching/state logic into a **custom hook** or **server component**

### Step 3: The Feature Pivot

- Add a **"Search" text input** at the top of the feed that filters the user list
- Filtering can be **client-side or server-side** (architectural discretion)

### Step 4: End-to-End Validation (ChromeDevTools MCP)

- Start both frontend and backend servers
- Use **ChromeDevTools MCP** to validate the running application:
  - Navigate to the frontend URL
  - Take a **screenshot** to confirm the UI renders correctly
  - Verify the **paginated user list** loads without freezing
  - Test the **search input** — type a query and confirm filtered results appear
  - Check the **network requests** to confirm paginated API calls (`limit`/`offset` params)
  - Inspect the **console** for any runtime errors or warnings
  - Test **pagination controls** (next/previous) and confirm correct data loads
- Fix any issues discovered during testing

---

## Known Flaws in Original Code

### `users.controller.ts`

1. Generates 5000 mock users in-memory synchronously on load
2. Business logic sits directly inside the controller (no service layer)
3. No pagination — sends all records at once

### `page.tsx`

1. Types, business logic, and UI consolidated into one file
2. Fetch logic hardcoded inside component body (no separation of concerns)
3. Renders thousands of DOM nodes at once (no pagination/virtualization) — causes browser freeze
4. Massive inline component that needs extraction
5. Overly verbose style object anchored to bottom of logic-heavy file

---

## Technical Constraints

- **Frontend:** Next.js (App Router, React)
- **Backend:** Nest.js (TypeScript, REST)
- **Communication:** REST API with CORS enabled
- **No external databases** — mock data is acceptable

## Code Quality Guidelines

- Use TypeScript throughout
- Separate concerns: services, hooks, components, types
- Keep components small and focused
- Use proper error handling at API boundaries
- Follow idiomatic Next.js and Nest.js patterns

## Documentation Sync Rule

**IMPORTANT:** Whenever you make code changes that affect any of the following, you MUST update the corresponding documentation in the `docs/` directory in the same response:

| Change Type                                          | Update Target          |
| ---------------------------------------------------- | ---------------------- |
| API endpoint added/modified/removed                  | `docs/api.md`          |
| Query params, request/response shape changed         | `docs/api.md`          |
| New architectural decision or pattern introduced     | `docs/architecture.md` |
| Component added/renamed/restructured                 | `docs/architecture.md` |
| Project structure changed (new folders, moved files) | `docs/README.md`       |

**Rules:**

- Treat docs as part of the code change — not a separate step
- If a code edit would make any doc inaccurate, fix the doc in the same operation
- When adding new endpoints, add the full endpoint spec (params, response, examples) to `docs/api.md`
- When making architectural choices, add a new ADR entry to `docs/architecture.md`
- Never leave docs stale — if in doubt, update
