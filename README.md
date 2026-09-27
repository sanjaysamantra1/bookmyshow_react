# BookMyShow Clone — React + Vite

This project is a React/Vite migration of the supplied Angular BookMyShow clone.

## Stack
- React
- TypeScript
- Vite
- React Router
- Bootstrap 5
- Browser localStorage/sessionStorage for demo persistence

## Run

```bash
npm install
npm run dev
```

Then open the URL printed by Vite (normally `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Migrated features

- Home page and rotating hero carousel
- Recommended movies by selected city
- Movie listing and genre/language filters
- Movie details and related movies
- Login/register with browser storage
- Search across movies and events
- City selector
- Live events and filters
- Plays & theatre filters
- Sports filters
- Activities filters
- Stream page and content filters
- Protected booking flow
- Showtime selection
- Seat category selection (max 10 seats)
- Card / UPI / wallet payment UI
- Booking persistence in localStorage
- Booking confirmation ticket
- My Bookings and cancellation
- Shared header, navigation and footer

## Angular → React mapping

| Angular | React |
|---|---|
| Components | Functional components |
| Angular Router | React Router |
| `signal()` / `computed()` | `useState()` / `useMemo()` |
| Services | React Context + hooks |
| `[(ngModel)]` | Controlled inputs |
| `@for` / `@if` | `.map()` / conditional rendering |
| `routerLink` | `Link` / `NavLink` |
| `ActivatedRoute` | `useParams()` |
| `localStorage` / `sessionStorage` | Same browser APIs |
| Angular guards | Route/page auth redirect logic |

## Important

This is still a frontend/demo BookMyShow clone. Authentication and booking data are intentionally stored in the browser and are not production-grade security. Payment is UI-only and does not connect to a real payment gateway.

The original image assets and the supplied application's CSS styling have been retained as closely as possible.
