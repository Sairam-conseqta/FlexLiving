# FlexLiving Reviews Dashboard

This project is a small React + Vite frontend with an Express mock API that returns Hostaway-like review data.
The UI has been styled to match the screenshot provided (teal theme, rounded upload area, spacing).

## Requirements
- Node 18+

## Install
```
npm install
```

## Run (development)
```
npm run dev
```
This runs the Express mock API on port 4000 and Vite dev server on 5173. The frontend proxies `/api` to the mock API.

## Build / Serve production
```
npm run build
npm start
```
`npm start` serves the `dist` build together with the mock API.

## Notes
- The Upload area in the right pane is a UI placeholder matching the screenshot and is not wired to actual uploads.
- Modify `public/mock-hostaway.json` to change demo data.

## File uploads

The app now supports file uploads (demo only) via `POST /api/upload`.
Uploaded files are persisted to the `uploads/` directory and served under `/uploads/<filename>`.

**Note:** This is a simple demo implementation. Do not use this in production without proper validation and security checks.

## Client-side validation & previews

The frontend now enforces:

- Max file size: 10 MB per file
- Allowed types: PDF, PNG, JPG/JPEG, GIF

It also shows per-file upload progress and a lightbox preview for image files (client-side object URLs). Server still accepts uploads and saves them to `uploads/`.

## Design & Logic Decisions

- **Stack:** React + Vite for fast frontend dev; Express for lightweight mock API and file upload handling.
- **Data normalization:** Hostaway JSON is transformed to a simpler schema with consistent fields (id, type, status, rating, categories, etc.).
- **UI decisions:** Dashboard shows filters, review selection, preview panel. Upload widget added to simulate manager tasks.
- **Routing:** React Router used to provide a `/property` page that mimics a property details layout with reviews section.

## Google Reviews Exploration

The assessment suggested exploring Google Reviews integration (via Places API). Findings:
- Google Places API can return place reviews, but requires an API key with billing enabled.
- In a demo/local context, it is not feasible to integrate due to quota and billing restrictions.
- In production, integration could be achieved by fetching `place_id` for each property, then calling `place/details` with `fields=review`.
- For this assessment, we document feasibility but do not implement it.



## Design decisions & documentation

- **Tech stack:** React (Vite) frontend, Express backend (Node). Chosen for fast local dev iteration and simple server API mocking.
- **Data normalization:** `GET /api/reviews/hostaway` reads provided mock JSON and returns `reviews` array with normalized fields: `id`, `type`, `status`, `rating`, `publicReview`, `categories`, `submittedAt`, `guestName`, `listingName`.
- **File uploads:** Demo server persists files to `uploads/` via `multer`. Client does validation (10 MB max, PDF/JPG/PNG/GIF) and uploads files one-by-one with progress.
- **UI decisions:** Clean cards, clear upload affordance, strong teal brand color, and a property preview page replicating a property detail layout for approved reviews.

## Google Reviews exploration

- The Google Places API / Google My Business (Business Profile) APIs can provide place reviews, but access requires a GCP project, API key, and adherence to usage limits and billing.
- For demo purposes we did not integrate Google Reviews because:
  - It requires a property/place ID tied to a Google Business Profile and proper OAuth or API key setup.
  - There are quota and billing considerations for production use.
- **Recommendation:** If you want a minimal integration, we can fetch public place details by Places API (requires an API key). For production, use the Business Profile APIs with proper consent and caching.
