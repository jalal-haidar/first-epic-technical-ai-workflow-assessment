# Architecture Decision Records

## ADR-001: Monorepo Structure

- **Status:** Accepted
- **Context:** The project consists of a Next.js frontend and a Nest.js backend that need to be developed and deployed together.
- **Decision:** Use a monorepo with `frontend/` and `backend/` top-level directories.
- **Rationale:** Simplifies local development, shared tooling, and atomic commits across both apps.

## ADR-002: Server-Side Pagination

- **Status:** Accepted
- **Context:** The original `/api/users` endpoint returned all 5000 records at once, freezing the browser.
- **Decision:** Implement `page/limit` query parameter pagination on the backend; frontend requests one page at a time.
- **Rationale:** Reduces payload size, eliminates browser thread blocking, and scales to larger datasets.

## ADR-003: Service Layer Extraction

- **Status:** Accepted
- **Context:** Business logic (mock data generation, filtering, pagination) was embedded directly in the Nest.js controller.
- **Decision:** Extract all business logic into a dedicated `UsersService`.
- **Rationale:** Follows Nest.js conventions, enables unit testing, and separates concerns.

## ADR-004: Server-Side Search

- **Status:** Accepted
- **Context:** A search feature is required to filter the user list.
- **Decision:** Implement search as a `search` query parameter on the backend API; filter results before pagination.
- **Rationale:** Avoids fetching all records to the client, keeps filtering consistent with pagination, and reduces bandwidth.

## ADR-005: Component Decomposition

- **Status:** Accepted
- **Context:** The original `page.tsx` was a monolithic file with types, fetch logic, styles, and rendering all in one place.
- **Decision:** Break into `UserCard`, `UserList`, `SearchInput` components; extract fetch/state logic into a custom hook (`useUsers`); separate types into a `types.ts` file.
- **Rationale:** Improves readability, reusability, and testability.
