# Baig Tours - Tour & Travel Booking Website

MERN Stack Tour & Travel Booking Platform for Baig Tours.

## Project Directory Structure

This project is divided into two main modules: `/backend` (Node.js + Express + MongoDB) and `/frontend` (Next.js + Tailwind CSS).

---

### 1. Backend Folder Structure (`/backend`)

The backend is built using Node.js, Express, and MongoDB (Mongoose) utilizing ES Modules (import/export syntax).

```text
backend/
├── config/                  # Configuration files
│   └── db.js                # MongoDB Atlas connection setup
│
├── controllers/             # Route logic / request controllers
│   ├── authController.js    # Admin authentication APIs
│   ├── packageController.js # Tour package CRUD & search logic[cite: 2]
│   ├── bookingController.js # Booking creation & management[cite: 2]
│   ├── blogController.js    # Travel blog management[cite: 2]
│   └── adminController.js   # Analytics & Dashboard summary[cite: 2]
│
├── middlewares/             # Custom middlewares[cite: 2]
│   ├── authMiddleware.js    # JWT verification middleware[cite: 2]
│   ├── security.js          # Rate limiter, XSS & input validators[cite: 2]
│   └── uploadMiddleware.js  # File upload processing (Multer)[cite: 2]
│
├── models/                  # Mongoose Database Schemas[cite: 2]
│   ├── User.js              # Admin credentials model[cite: 2]
│   ├── Package.js           # Tour Packages details model[cite: 2]
│   ├── Booking.js           # Customers bookings details model[cite: 2]
│   ├── Blog.js              # Blog content schema[cite: 2]
│   ├── Gallery.js           # Images and videos schema[cite: 2]
│   ├── Review.js            # Customer reviews and ratings schema[cite: 2]
│   └── Settings.js          # General website settings[cite: 2]
│
├── routes/                  # Express REST API routes[cite: 2]
│   ├── authRoutes.js        # Auth-related routes[cite: 2]
│   ├── packageRoutes.js     # Package-related routes[cite: 2]
│   ├── bookingRoutes.js     # Booking-related routes[cite: 2]
│   ├── blogRoutes.js        # Blog-related routes[cite: 2]
│   └── adminRoutes.js       # Admin stats & dashboard routes[cite: 2]
│
├── utils/                   # Helper utility functions
│   ├── sendEmail.js         # Nodemailer setup for notifications[cite: 2]
│   └── cloudinary.js        # Cloudinary integration for uploads[cite: 2]
│
├── .env                     # Local environment variables (Not pushed to GitHub)[cite: 2]
├── .gitignore               # Excluded files list for Git[cite: 2]
├── package.json             # NPM dependencies & ES Modules configuration[cite: 2]
└── server.js                # Main entry point of the server[cite: 2]
```
### 2. Frontend Folder Structure (/frontend)
The frontend is built using Next.js (React Framework) with TypeScript, Tailwind CSS, and the App Router architecture.
```text
frontend/
├── public/                  # Static assets (images, logos, favicon)
│   └── assets/              # Theme-specific images & banners
│
├── src/                     # Source directory[cite: 2]
│   ├── app/                 # Next.js App Router (Pages & layouts)[cite: 2]
│   │   ├── layout.tsx       # Root layout (Navbar, Footer, Providers)
│   │   ├── page.tsx         # Homepage UI[cite: 2]
│   │   ├── about/           # About Us Page[cite: 2]
│   │   ├── packages/        # Tours listing & filter page[cite: 2]
│   │   │   └── [id]/        # Tour Details page[cite: 2]
│   │   ├── booking/         # Booking application form page[cite: 2]
│   │   ├── blogs/           # Travel blogs & articles[cite: 2]
│   │   ├── contact/         # Contact info & Map page[cite: 2]
│   │   └── admin/           # Protected Admin Dashboard UI[cite: 2]
│   │
│   ├── components/          # Reusable UI React components[cite: 2]
│   │   ├── common/          # Global UI (Navbar, Footer, Buttons)[cite: 2]
│   │   ├── cards/           # PackageCard, BlogCard components[cite: 2]
│   │   └── dashboard/       # Dashboard specific components & charts[cite: 2]
│   │
│   ├── context/             # React Context API for global state management
│   │   └── AuthContext.tsx  # Admin authentication state
│   │
│   ├── hooks/               # Custom React hooks[cite: 2]
│   │   └── useFetch.ts      # Data fetching helper
│   │
│   ├── services/            # API call modules (Axios / Fetch configs)[cite: 2]
│   │   ├── api.ts           # Global Axios instance
│   │   └── authService.ts   # Authentication specific API requests
│   │
│   ├── types/               # TypeScript interfaces & types
│   │   └── index.ts         # Global interface definitions
│   │
│   └── utils/               # Formatting and general utility helpers
│
├── .env.local               # Local environment variables (Not pushed)
├── .gitignore               # Excluded files list for Git
├── next.config.js           # Next.js configuration settings
├── package.json             # NPM dependencies & scripts
├── tailwind.config.ts       # Tailwind CSS configuration[cite: 2]
└── tsconfig.json            # TypeScript configuration[cite: 2]
