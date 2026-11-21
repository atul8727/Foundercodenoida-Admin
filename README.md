# Founder Code Noida - Admin Dashboard

React 18 + Vite 5 + Tailwind 3 + axios + react-router-dom 6 + lucide-react.
One admin login. Every screen is API-driven: no data is hardcoded.

## Setup and run
```
npm install
cp .env.example .env      # then set VITE_API_URL
npm run dev               # http://localhost:5173
npm run build             # production build in /dist
npm run preview           # test the production build
```
`.env`
```
VITE_API_URL=https://your-api-domain.com/api
```
(API root including `/api`, no trailing slash. Restart `npm run dev` after changing `.env`.)

## Authentication (built)
- `POST /login` `{ email, password }` -> `{ success, message, token, admin: { id, name, email, phone } }`
- `POST /admin/logout` (Bearer token). The server says "remove token on the client", so the app always clears the session, even if this call fails.
- Token and admin are stored only by `services/tokenService.js` (`TOKEN_STORAGE` in `config/app.js`: `local` or `session`).
- `services/apiClient.js` is the only axios instance: it adds `Authorization: Bearer <token>` and signs the admin out on a 401 or an expired token. Login and logout skip this with `skipAuthHandling`.
- `ProtectedRoute` guards every page except `/login`. After login the admin returns to the page they asked for.
- The app also signs out automatically the moment the token expires.
- There is no refresh token in this API. There is a single role (admin), so there is no permission matrix.

## Folder structure
```
src/
├── app/            main.jsx, App.jsx, providers.jsx, router/ (routes are generated from config/modules.js)
├── pages/          auth/LoginPage, common/NotFoundPage, modules/<Module>Page
├── features/       one folder per module: service + hook + components (auth/, theme/ are built)
├── components/
│   ├── ui/         reusable kit: Button, Input, Table, Pagination, Modal, Toast, StatusBadge ...
│   └── layout/     AppLayout, Sidebar, Topbar, Logo, ThemeToggle
├── hooks/          useFetch, useMutation, usePagination, useDisclosure, useDebounce
├── services/       apiClient, tokenService, errorHandler
├── config/         app.js (env, home path), endpoints.js (every API path), modules.js (sidebar + routes), statuses.js
├── utils/          formatDate, formatStatus, validators
└── styles/         theme.js (ALL colors), index.css
```
Open **UI Kit** in the sidebar (only in `npm run dev`) to see every component in light and dark mode.

## Add a new module (step by step)
Example: "Job Requests".
1. **Endpoints** - add the paths in `src/config/endpoints.js`:
   ```js
   jobRequests: { list: "/admin/job-requests", remove: (id) => `/admin/job-requests/${id}` },
   ```
2. **Service** - `src/features/jobRequests/jobRequests.service.js`. Use `api` from `@/services/apiClient` and `ENDPOINTS`. Return only what the API returns.
3. **Hook** (optional) - `useJobRequests.js` wrapping `useFetch`.
4. **Components** - `src/features/jobRequests/components/` (detail modal, filters, forms).
5. **Page** - `src/pages/modules/JobRequestsPage.jsx`:
   ```jsx
   const { data, loading, error, refetch } = useFetch(() => jobRequestsService.list({ page, search }), { deps: [page, search] });
   <Table columns={columns} data={rows} loading={loading} error={error} onRetry={refetch} />
   <Pagination page={page} pageSize={limit} total={total} onChange={setPage} />
   ```
   Every list screen needs: loading, empty, error, search, filters, pagination and toasts. `Table` already has loading / empty / error states; `useMutation` shows the toast for create / update / delete.
6. **Register** - in `src/config/modules.js` give the entry a page. This is the only existing file you touch (it adds the route and the sidebar item):
   ```js
   page: lazy(() => import("@/pages/modules/JobRequestsPage")),
   ```
   Table columns are plain arrays inside the page, so each module owns its columns.

## Theme (light / dark)
All colors live in **`src/styles/theme.js`** (nothing else contains a color).
Change a hex there and the whole app updates. `tailwind.config.js` turns the tokens into CSS variables and Tailwind colors (`bg-primary`, `text-muted`, `border-line`, `bg-surface-2` ...).
The theme follows the system setting on the first visit and remembers the admin's choice afterwards.
Status badge colors: `src/config/statuses.js`. Font: Outfit (Google Fonts link in `index.html`, fallback list in `theme.js`).

## Logo
Files in `public/logo/` (transparent PNG). Replace them with the same names:
- `logo.png` - full logo (sidebar, login)
- `mark.png` - tree only (collapsed sidebar)
- `favicon.png` - browser tab icon

The logo has blue text, so in dark mode it sits on a white card (token `logo-bg` in `theme.js`, component `components/layout/Logo.jsx`).

## Deploy
`vercel.json` is included (Vite build, all routes rewritten to `index.html`). Set `VITE_API_URL` in the host's environment settings.
