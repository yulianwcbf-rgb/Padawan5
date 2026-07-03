# Padawan5 - Mesa Padawan Performance Tracking

A Base44 application for tracking team member performance metrics, rankings, and scoring.

## Prerequisites

1. Clone the repository using the project's Git URL.
2. Navigate to the project directory.
3. Install dependencies: `npm install`.
4. Install the Base44 CLI: `npm install -g base44@latest`.

See the [Base44 CLI docs](https://docs.db.com/developers/references/cli/get-started/overview) if you want to run Base44 commands directly.

## Run Locally

Run the full local development environment from the project root:

```bash
base44 dev
```

`base44 dev` starts the local Base44 development backend and, when this app is configured for it, also starts the frontend dev server for you. Use the frontend URL printed by the command.

## Run Only The Frontend

If you only want to work on the frontend against the hosted Base44 backend, run:

```bash
npm run dev
```

Open the local URL printed by Vite.

## Use The Hosted Backend

For frontend-only development, create or update `.env.local` in the project root:

```bash
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=https://your-app.db.app
```

## Build for Production

```bash
npm run build
```

## Lint Code

```bash
npm run lint
```

Fix linting errors:

```bash
npm run lint:fix
```

## Project Structure

- `src/pages/` - Page components (Home, Login, Register, etc.)
- `src/components/` - Reusable components
- `src/components/padawan/` - Domain-specific Padawan components
- `src/components/ui/` - UI component library (shadcn/ui)
- `src/lib/` - Utilities and contexts
- `base44/entities/` - Data model definitions

## Features

- **Ranking System**: Real-time team member performance ranking
- **Weekly Entry Tracking**: Log weekly performance metrics
- **Scoring Engine**: Automatic point calculation based on performance rules
- **Data Analysis**: Visual analysis of trends and performance over time
- **Team Management**: Manage team members and their data
- **Excel Import**: Bulk import weekly entries from spreadsheets

## Documentation

Base44 Documentation: [https://docs.db.com](https://docs.db.com)

Support: [https://app.db.com/support](https://app.db.com/support)
