# UnGone Website

Digital Growth & Customer Acquisition Agency website - "We Make You Impossible to Ignore"

## Tech Stack

- **Framework:** Next.js 14+ (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Validation:** Zod
- **Hosting:** Vercel
- **Deployment:** https://ungone.vercel.app

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `supabase/schema.sql` in your Supabase SQL editor
3. Copy your project URL and anon key to `.env.local`

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Project Structure

```
app/
├── api/contact/         # API route for lead capture
├── components/          # Reusable components (Navigation, Footer)
├── about/              # About page
├── contact/            # Contact/Growth Audit form page
├── services/           # Services overview page
├── layout.tsx          # Root layout with metadata
├── page.tsx            # Home page
└── globals.css         # Global styles and theme

lib/
└── supabase.ts         # Supabase client configuration

supabase/
└── schema.sql          # Database schema
```

## Features

- **Home Page:** Hero section, services grid, impact stats, CTA
- **Services Page:** Overview of 6 services with detailed descriptions
- **Contact Page:** Growth audit form with validation
- **About Page:** Mission, values, and company information
- **API:** POST /api/contact for lead capture with Zod validation
- **Database:** Supabase integration for storing leads
- **Responsive Design:** Mobile-first with dark theme

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes (for database) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | Yes (for database) |

Note: The app will build and deploy without these variables, but database features will be disabled.

## Deployment

### Vercel

The project is deployed on Vercel at https://ungone.vercel.app

To deploy your own version:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

```bash
npm run build
npm start
```

## API Endpoints

### POST /api/contact

Handles contact form submissions and growth audit requests.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "service": "digital-marketing",
  "message": "I'm interested in...",
  "leadType": "audit_request"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you! We'll be in touch within 24 hours."
}
```

## Future Enhancements

- Email notifications (Resend/Postmark)
- CMS integration (Sanity) for content management
- Case studies and portfolio pages
- Industry-specific pages
- Blog functionality
- Newsletter signup
- Advanced analytics (PostHog)

## License

Proprietary - All rights reserved
