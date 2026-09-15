# Frontend structure

- src/Pages/auth: login, registration, password recovery and OTP pages.
- src/Pages/customer: storefront, menu, booking and other customer pages.
- src/Pages/super-admin: restaurant and staff administration entry page.
- src/Pages/restaurant-admin: dashboard, orders, menu, reservations, gallery, settings and kitchen staff pages. Super admins also reuse these pages for their selected restaurant.
- src/Pages/kitchen: accepted order board and preparation actions.
- src/routes: role selection, protected routes and customer/admin/kitchen route collections.
- src/layouts: shared workspace shell.
- src/components: reusable UI, grouped by concern (orders, menu, staff, restaurants, navigation, chat, customer and common).
- src/services/api: HTTP helpers and existing API hooks.
- src/services: business-facing service helpers.
- src/context: application and authenticated session state.
- src/config: API configuration and role labels.
- src/styles: shared workspace styles.
- src/assets: bundled static assets.

Keep routed screens in pages and reusable UI in components. Shared staff management renders through separate super-admin and restaurant-admin entry pages. Existing /admin/* and /kitchen/orders URLs are preserved. AppRoutes selects the workspace from the authenticated role; ProtectedRoute guards privileged route collections. Backend authorization remains authoritative.

Order flow: restaurant admin accepts, kitchen marks preparing and completed, then restaurant admin marks delivered.

Validation: npm run build. Run ESLint on changed files; the legacy project has existing lint debt.

