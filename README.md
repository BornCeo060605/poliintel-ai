# PoliIntel AI

A production-ready political intelligence SaaS platform that ingests booth-level and constituency-level election data and generates strategic analytics.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Authentication & Database)
- **Recharts** (Analytics Charts)

## Features

- **Authentication**: Email/password sign up and sign in
- **User Roles**: Consultant (full dashboard) and Politician (Leadership Mode)
- **Dashboard**: Metric cards (Seat Health, Risk Booths, Opportunity Booths, Avg Swing)
- **Charts**: Line, Bar, and Area charts for swing trends, vote share, turnout
- **Data Upload**: CSV upload for booth/constituency data
- **Constituency Detail**: Per-constituency analytics with risk booth identification
- **AI Recommendations**: Strategic campaign recommendations
- **Mode Toggle**: Switch between Consultant Mode and Leadership Mode (simplified executive view)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### 1. Install Dependencies

```bash
npm install
```

### 2. Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy `.env.local.example` to `.env.local`
3. Add your Supabase URL and anon key:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

4. Run the database migration in Supabase SQL Editor:
   - Open `supabase/migrations/001_initial_schema.sql`
   - Execute the SQL in your Supabase project

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign up for an account to access the dashboard.

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Auth routes (login, signup)
│   ├── (dashboard)/      # Protected dashboard routes
│   │   └── dashboard/
│   │       ├── upload/       # CSV data upload
│   │       ├── constituencies/
│   │       │   └── [id]/     # Constituency detail
│   │       └── recommendations/
│   └── actions/          # Server actions
├── components/
│   ├── dashboard/        # Metric cards, charts
│   └── layout/          # Sidebar, Header
├── contexts/             # Auth, ViewMode
├── lib/
│   ├── supabase/         # Supabase client config
│   ├── data/             # Mock/sample data
│   └── constants.ts      # Design tokens
└── types/
```

## Design System

- **Colors**: Blue (primary), Red (risk), Amber (caution), Green (positive)
- **Cards**: 12px border radius, subtle shadows
- **Layout**: Clean white background, enterprise-grade UI

## License

MIT
