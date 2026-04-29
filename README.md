# InvoiceLite

A clean, offline-first invoice generator built with React. Create professional invoices, manage your assets, export to PDF — no account required.

---

## Screenshots
| | |
| ![Landing Page](https://github.com/user-attachments/assets/1589f621-c104-48dc-9fb7-fe098f76e9cc) | ![Create Invoice](https://github.com/user-attachments/assets/6de75a43-1d90-42d4-81e4-265073188f79) |
| ![Invoices Table](https://github.com/user-attachments/assets/f956395a-c073-4991-92ce-d4695ec12723) | ![Manage Assets](https://github.com/user-attachments/assets/f34a6370-47b9-4efd-84cd-28d71bc9cf8f) |

---

## Features

### Invoice Creation
- Fill in company details, client details, invoice line items, payment info, notes, and terms through a structured accordion form
- Live side-by-side preview (A4-sized **InvoiceCopy** component) that mirrors the final PDF layout in real time
- On smaller screens, toggle between Form view and Preview view
- Edit existing invoices via the `/edit/:storage/:invoiceId` route

### Invoice Customization
- Choose invoice theme: **Light** or **Dark**
- Pick a custom **base color** using a color picker (applied as accent color throughout the invoice)
- Select from a comprehensive list of **global currencies**
- Add custom metadata fields to both company and client details
- Add billing details, payment terms, notes, terms & conditions, and payment information

### Invoice Items
- Add, edit, and remove line items with name, description, quantity, and unit price
- Supports tax and discount — both as **fixed** amounts or **percentages**
- Totals are calculated automatically

### PDF Export
- Generates a PDF using **@react-pdf/renderer** with a separate `InvoicePDF` component tree
- Supports repeating table headers across pages and prevents row splitting across pages
- Download triggered via a popover with a dedicated download button

### Invoices Table
- View all saved invoices in a paginated table (10 per page)
- Filter invoices by:
  - **Storage** — Local or Server
  - **Invoice ID** — full or partial match
  - **Serial No** — full or partial match
  - **Status** — `pending`, `success`, `error`, `expired`, `rejected` (multi-select)
  - **Created At** — date range using a calendar picker
  - **Paid At** — date range using a calendar picker
- Sort invoices by column
- Active filters are highlighted; each filter can be cleared individually or all at once
- Update invoice status from the table actions menu
- Delete invoices from the table

### Asset Management
- Upload and manage **logos** and **signatures** separately
- Images are stored in IndexedDB as base64 strings
- Drag-and-drop upload with preview
- Select a stored image to use in an invoice via a slide-in drawer

### Storage
- **Local (IndexedDB)** — invoices and images are stored in the browser's IndexedDB. No login required.
- **Server (Supabase)** — *(coming soon)* cloud storage for cross-device access

### App-wide
- **Dark / Light mode** toggle (via `next-themes`)
- Toast notifications (via `sonner`) with custom icons for success, error, warning, info, and loading states
- Fully responsive — adapts layout between mobile and desktop

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite |
| State Management | Redux Toolkit + RTK Query |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v4 |
| UI Components | ShadCN UI (Radix UI) |
| Forms | React Hook Form + Zod |
| PDF Generation | @react-pdf/renderer + @ag-media/react-pdf-table |
| Local Storage | IndexedDB (custom wrapper) |
| Animations | Framer Motion |
| Date Handling | date-fns + react-day-picker |
| Color Picker | react-colorful |
| File Upload | react-dropzone |
| Notifications | Sonner |
| Icons | Lucide React |
| IDs | uuid |

---

## Project Structure

```
src/
├── components/
│   ├── forms/                  # React Hook Form sections (company, client, invoice, items, etc.)
│   ├── invoice-copy/           # A4 live preview component (InvoiceCopy)
│   ├── invoice-pdf/            # PDF document component (@react-pdf/renderer)
│   └── ui/                     # ShadCN UI primitives
├── constants.js                # Currencies, status types, filter options
├── contexts/
│   └── theme-provider.jsx      # next-themes wrapper
├── helpers/                    # Formatting, sorting, page layout calculation utilities
├── hooks/                      # Custom hooks (media query, resize observer, form error sync)
├── layouts/
│   └── dashboard-layout.jsx    # Sidebar + header shell for dashboard routes
├── motion/
│   └── motion-variants.js      # Framer Motion animation variants
├── pages/
│   ├── landing-page.jsx        # Marketing landing page
│   └── error-page.jsx          # 404 / error fallback
├── schemas/                    # Zod validation schemas for each form section
├── store/
│   ├── slices/
│   │   ├── invoice-slice.js    # Invoice form state (company, client, items, etc.)
│   │   └── dashboard-slice.js  # UI state (filters, item edit, form errors)
│   └── services/
│       ├── invoice-api.js      # RTK Query endpoints (fetch, save, update, delete invoices)
│       └── image-api.js        # RTK Query endpoints for image assets
└── utils/
    └── indexedDB/
        ├── db.js               # IndexedDB connection and transaction helpers
        ├── invoices-store.js   # CRUD operations for invoices
        └── images-store.js     # CRUD operations for image assets
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Krupesh17/invoice-lite-v1.0.git
cd invoice-lite-v1.0

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Local Network Access

```bash
npm run host
```

---

## Routes

| Path | Description |
|---|---|
| `/` | Landing page |
| `/create/invoice` | Create a new invoice |
| `/invoices` | View and manage all invoices |
| `/assets` | Manage logo and signature images |
| `/edit/:storage/:invoiceId` | Edit an existing invoice |

---

## Status

This project is actively under development. The following features are planned or in progress:

- [ ] Supabase cloud storage integration for cross-device access
- [ ] User authentication (sign in / sign up)
- [ ] Server-side invoice and image management
- [ ] Data sync toggle between local and server storage

---

## License

This project is open source. Feel free to use it, fork it, or build on top of it.
