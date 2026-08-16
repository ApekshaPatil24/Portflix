<div align="center">

  # 🎬 PORTFLIX
  ### *AI-Powered Developer Curation & Portfolio Engine*

  <p align="center">
    <b>Transform your raw GitHub repositories into high-converting, recruiter-ready developer portfolios in seconds.</b>
  </p>

  [![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
  [![Supabase](https://img.shields.io/badge/Supabase-SSR%20Auth-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
  [![Google Gemini](https://img.shields.io/badge/Google%20Gemini-1.5%20Flash-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

##  Overview

**Portflix** is an enterprise-grade full-stack platform engineered for modern software developers. Instead of spending hours manually crafting static personal websites, Portflix connects securely to your **GitHub account via OAuth**, fetches your active repositories, and utilizes **Curator AI (powered by Google Gemini 1.5 Flash)** to analyze README files, extract programming tech stacks, and write compelling project summaries.

Developers can choose from **5 specialized role templates**, monitor **real-time recruiter telemetry analytics**, generate a **3D AI Avatar**, chat with **Curator AI Assistant**, and share a **unique QR Code Pass** for mobile devices.

---

##  Key Features

###  1. Curator AI Repository Curation & OAuth Integration
- **Selective Repo Manager**: Choose which GitHub repositories to showcase or remove.
- **AI-Powered Code & README Summarizer**: Curator AI reads raw README snippets and extracts technologies, primary languages, and architecture summaries.
- **OAuth Expiry Detection**: Automated detection for expired GitHub OAuth access tokens with 1-click reconnect prompts.

###  2. 5 Role-Based Portfolio Templates (`/{username}`)
- **Fullstack Developer**: Dark terminal-inspired bento grid with neon accents.
- **Backend Developer**: Deep matrix green engineering layout highlighting APIs, system design, and database schemas.
- **Frontend Developer**: Vibrant gradient canvas with smooth micro-animations.
- **UI/UX Designer**: Visual hero layout focusing on case studies and design systems.
- **Other Roles**: Clean, minimal, high-contrast engineering portfolio.
- **Instant Template Switching**: Switch templates with 1 click without losing your custom data.

###  3. Real-Time Telemetry & Recruiter Analytics (`/analytics`)
- **Live Database Telemetry**: Computes total portfolio views, recruiter click-through rates, top engaged projects, and average time on page directly from PostgreSQL.
- **Showcase Health Score**: Evaluates profile completion, avatar assignment, linked socials, and tech stacks.
- **Geographic Recruiter Signals**: Real-time signal feed displaying recruiter activity and location data.

###  4. Direct Recruiter Inquiry & Contact Channel
- **Floating `Hire Candidate` Drawer**: Recruiters can send interview invitations, job descriptions, or freelance offers directly from the candidate's public portfolio.
- **SMTP Email Delivery**: Integrated email pipeline delivering messages straight to the developer's personal inbox.

###  5. Unique Portfolio QR Pass & Universal Live Preview
- **Mobile QR Pass**: Generates a high-definition, unique matrix QR Code for every candidate. Scanning it on any mobile device or tablet instantly launches the live showcase.
- **Universal Live Preview ↗**: Persistent topbar launcher linking to `http://localhost:3000/YOUR_USERNAME`.

###  6. Curator AI Assistant Chatbot
- **Interactive System Companion**: Intelligent AI assistant built into the dashboard floating widget.
- **Multi-Model Provider Fallback**: Cascades between `Google Gemini 1.5/2.0 Flash` and `Groq Llama 3.1` to ensure zero downtime.
- **Full System Knowledge**: Answers workflow questions, guides users through template selection, and provides career advice.

###  7. Global Studio Theme Engine & 3D AI Avatars
- **System-Wide Light / Dark Mode**: Custom theme provider with curated slate color palettes and contrast tokens.
- **3D AI Avatar Curation**: Generates custom professional avatars with overwriting protection overlays.

---

##  Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router & Server Actions) |
| **Language** | TypeScript (Strict Mode) |
| **Database & ORM** | PostgreSQL & Prisma ORM v6 |
| **Authentication** | Supabase SSR Auth (`@supabase/ssr`) |
| **AI Engines** | Google Gemini 1.5/2.0 Flash REST API & Groq Llama 3.1 |
| **Styling** | TailwindCSS v4, Lucide React, Glassmorphism, Custom CSS Variables |
| **Security** | AES-256-CBC Encrypted Tokens, Row-Level Security (RLS) |

---

##  Project Architecture

```
portflix/
├── app/
│   ├── (dashboard)/            # Authenticated console layout
│   │   ├── dashboard/          # Telemetry overview & AI Avatar Generator
│   │   ├── portfolio/          # Portfolio section editor & Curator AI Audit
│   │   ├── templates/          # Role template picker
│   │   ├── analytics/          # Real-time traffic & recruiter signals
│   │   ├── integrations/       # OAuth pipeline status (GitHub, Supabase, Gemini)
│   │   └── settings/           # Profile visibility & studio theme toggle
│   ├── (public)/
│   │   └── [username]/         # Public live portfolios & template renderer
│   └── api/                    # Serverless API routes
│       ├── ai/chat/            # Curator AI Assistant chatbot engine
│       ├── analytics/          # PostgreSQL telemetry calculator
│       ├── contact/            # Recruiter inquiry & SMTP handler
│       ├── projects/           # Selective GitHub repo importer & DELETE
│       └── user/               # Settings, avatar generator, & integrations
├── features/                   # Decoupled UI feature modules
│   ├── ai/                     # Floating Chatbot component
│   ├── analytics/              # Telemetry charts & signals
│   ├── dashboard/              # Sidebar, Topbar, ThemeProvider
│   ├── portfolio/              # Manager forms, QR Modal, Recruiter Drawer
│   └── templates/              # Role template cards
├── lib/                        # Core utilities, Prisma, Encryption, & AI helpers
├── prisma/                     # Database Schema & Migrations
└── public/                     # Static media & assets
```

---

##  Local Installation & Setup

### Prerequisites
- Node.js 18+ or Node.js 20+
- PostgreSQL database (or free [Supabase](https://supabase.com/) project)
- Free Google Gemini API Key ([Google AI Studio](https://aistudio.google.com/))

### Step 1: Clone Repository & Install Dependencies
```bash
git clone https://github.com/ApekshaPatil24/Portflix.git
cd Portflix
npm install
```

### Step 2: Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database & Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL="postgresql://user:password@host:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:5432/postgres"

# AI Engines
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here

# GitHub OAuth Credentials
PORTFLIX_GITHUB_CLIENT_ID=your_github_client_id
PORTFLIX_GITHUB_CLIENT_SECRET=your_github_client_secret

# Security & Encryption
ENCRYPTION_KEY=32_character_encryption_key_here
```

### Step 3: Initialize Database Schema
```bash
npx prisma db push
```

### Step 4: Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

##  Security & Privacy

- **Encrypted Token Storage**: GitHub OAuth access tokens are encrypted using **AES-256-CBC** prior to database persistence.
- **Serverless API Scoping**: All AI API keys and DB mutations execute server-side within Next.js API routes, keeping credentials isolated from client bundles.
- **Visibility Control**: Users can switch profile visibility between **Public**, **Unlisted**, or **Private** at any time.

---

##  Contributing

Contributions, issues, and feature requests are welcome! Feel free to check out the [issues page](https://github.com/ApekshaPatil24/Portflix/issues).

---

<div align="center">
  <sub>Built with ❤️ for developers worldwide by <b>Apeksha Patil</b>.</sub>
</div>
