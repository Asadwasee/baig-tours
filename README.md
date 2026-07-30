# Baig Tours - Tour & Travel Booking Website

Baig Tours is a modern, full-stack tour and travel booking platform developed using the MERN stack (MongoDB, Express.js, React/Next.js, Node.js). The system allows users to explore tour packages, make booking inquiries, interact via pre-configured WhatsApp triggers, read travel blogs, and view media galleries. It also features a protected Admin Dashboard for complete content management, booking processing, customer records, and financial analytics.

---

## Team Members & Contributions

The development of Baig Tours is divided among a 5-member engineering team structured into backend and frontend roles:

### Backend Team

* **Asad Waseem (Team Lead & MERN Backend Developer)**
  * Designed overall project architecture, environment configurations, and database schemas.
  * Built Admin Authentication APIs (JWT logic, password encryption).
  * Developed Package Management APIs (CRUD, image/video upload processing, destination/category filters, sorting).
  * Implemented Single Package Details API (itinerary management, FAQs, available seats).
  * Developed Admin Dashboard summary & analytics metrics APIs.
  * Integrated security middlewares (rate limiting, XSS/CSRF prevention, input validation).
  * Oversaw Pull Request (PR) reviews, branch management, and server deployment.

* **Aliyan (MERN Backend Developer)**
  * Developed Booking System APIs and input validation workflows.
  * Implemented booking status state logic (Pending, Confirmed, Cancelled, Completed).
  * Built Admin Booking Management tools (viewing bookings, Excel/PDF data export, voucher printing).
  * Implemented Customer Management APIs and customer booking history records.
  * Engineered WhatsApp integration pre-filled message generator logic.
  * Configured email notification services (Nodemailer) for automated customer confirmation alerts.

* **Wasif (MERN Backend Developer)**
  * Created Blog Management CRUD endpoints (categories, tags, featured images, content).
  * Engineered Media Gallery APIs supporting image and video categorization.
  * Developed Customer Reviews APIs with Admin approval/rejection workflows.
  * Built Contact Form processing endpoints.
  * Developed Website Settings management APIs (logo, contact details, social links, footer content).
  * Implemented reporting/analytics data aggregation endpoints for visual charts.
  * Added SEO backend metadata support across models (Open Graph, Meta titles, keywords).

### Frontend Team

* **Afreen (Frontend Developer)**
  * Developed the Home Page UI components (Hero Banner Slider, Search section, Featured Packages, Why Choose Us).
  * Built the About Us Page (Company overview, mission, vision, team profiles).
  * Built the Tour Packages Listing Page with interactive search, category filters, price range sliders, and sorting controls.
  * Constructed the detailed Package View UI (day-by-day itinerary accordions, inclusions/exclusions, image galleries, related packages).
  * Developed the Media Gallery Page featuring category-based filtering for images and videos.
  * Ensured responsive UI layouts across mobile, tablet, and desktop screens for assigned modules.

* **Fiza (Frontend Developer)**
  * Developed the multi-field Booking Form UI with dynamic client-side input validation.
  * Built the Contact Page UI featuring embedded Google Maps and inquiry form validation.
  * Implemented the Blog Listing and Blog Details view pages.
  * Created the Customer Review submission form and public review display widgets.
  * Built global interactive components including the floating WhatsApp action button and sticky navigation bar.
  * Constructed the Admin Dashboard UI (stats cards, analytics charts, package/booking management tables, review moderation panels).

---

## Tech Stack

* **Frontend**: Next.js (App Router), React.js, TypeScript, Tailwind CSS
* **Backend**: Node.js, Express.js (ES Modules syntax)
* **Database**: MongoDB & Mongoose ODM
* **Authentication**: JSON Web Tokens (JWT) & bcrypt
* **Media & File Storage**: Cloudinary / Multer file upload handling
* **Communication & Services**: Nodemailer (Email alerts), WhatsApp Business API integration links

---

## Project Directory Structure

### 1. Backend Folder Structure (`/backend`)

```text
backend/
├── config/                  # Configuration files
│   └── db.js                # MongoDB Atlas connection setup
│
├── controllers/             # Route logic / request controllers
│   ├── authController.js    # Admin authentication APIs
│   ├── packageController.js # Tour package CRUD & search logic
│   ├── bookingController.js # Booking creation & management
│   ├── blogController.js    # Travel blog management
│   └── adminController.js   # Analytics & Dashboard summary
│
├── middlewares/             # Custom middlewares
│   ├── authMiddleware.js    # JWT verification middleware
│   ├── security.js          # Rate limiter, XSS & input validators
│   └── uploadMiddleware.js  # File upload processing (Multer)
│
├── models/                  # Mongoose Database Schemas
│   ├── User.js              # Admin credentials model
│   ├── Package.js           # Tour Packages details model
│   ├── Booking.js           # Customers bookings details model
│   ├── Blog.js              # Blog content schema
│   ├── Gallery.js           # Images and videos schema
│   ├── Review.js            # Customer reviews and ratings schema
│   └── Settings.js          # General website settings
│
├── routes/                  # Express REST API routes
│   ├── authRoutes.js        # Auth-related routes
│   ├── packageRoutes.js     # Package-related routes
│   ├── bookingRoutes.js     # Booking-related routes
│   ├── blogRoutes.js        # Blog-related routes
│   └── adminRoutes.js       # Admin stats & dashboard routes
│
├── utils/                   # Helper utility functions
│   ├── sendEmail.js         # Nodemailer setup for notifications
│   └── cloudinary.js        # Cloudinary integration for uploads
│
├── .env                     # Local environment variables (Not pushed to GitHub)
├── .gitignore               # Excluded files list for Git
├── package.json             # NPM dependencies & ES Modules configuration
└── server.js                # Main entry point of the server
``` 
### 2. Frontend Folder Structure (/frontend)
```text
frontend/
├── public/                  # Static assets (images, logos, favicon)
│   └── assets/              # Theme-specific images & banners
│
├── src/                     # Source directory
│   ├── app/                 # Next.js App Router (Pages & layouts)
│   │   ├── layout.tsx       # Root layout (Navbar, Footer, Providers)
│   │   ├── page.tsx         # Homepage UI
│   │   ├── about/           # About Us Page
│   │   ├── packages/        # Tours listing & filter page
│   │   │   └── [id]/        # Tour Details page
│   │   ├── booking/         # Booking application form page
│   │   ├── blogs/           # Travel blogs & articles
│   │   ├── contact/         # Contact info & Map page
│   │   └── admin/           # Protected Admin Dashboard UI
│   │
│   ├── components/          # Reusable UI React components
│   │   ├── common/          # Global UI (Navbar, Footer, Buttons)
│   │   ├── cards/           # PackageCard, BlogCard components
│   │   └── dashboard/       # Dashboard specific components & charts
│   │
│   ├── context/             # React Context API for global state management
│   │   └── AuthContext.tsx  # Admin authentication state
│   │
│   ├── hooks/               # Custom React hooks
│   │   └── useFetch.ts      # Data fetching helper
│   │
│   ├── services/            # API call modules (Axios / Fetch configs)
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
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration 
```
## Environment Variables Configuration
Create a .env file in the /backend directory:
```text
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password 
```
Create a .env.local file in the /frontend directory:
```text
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```
## Setup and Installation
Prerequisites
Node.js (v18 or higher)

MongoDB database instance (Local or MongoDB Atlas)

Git

## 1. Clone the Repository
```text
git clone https://github.com/Asadwasee/baig-tours.git
```
## 2. Backend Setup
```text
cd backend
npm install
npm run start
```
## 3. Frontend Setup
Open a new terminal session from the project root:
```text
cd frontend
npm install
npm run dev
```
## Git Workflow Rules
To ensure code quality and avoid merge conflicts, all team members must follow these guidelines:

Direct commits to the main or master branch are prohibited.

Create dedicated feature branches using the standard naming convention: feature/module-name (e.g., feature/booking-api, feature/home-ui).

Commit changes frequently with clear, descriptive commit messages.

Submit a Pull Request (PR) to the primary branch upon module completion for review by the Team Lead.

Pull latest changes from main into your local feature branch before creating a PR to resolve potential conflicts early.

Never push confidential environment configurations (.env) or secret keys to Git repositories.
