# NoteGenius

A client-side study management application built with React and TypeScript. Organize subjects, create flashcards, schedule exams, and track study sessions — all stored locally in the browser with no backend required.

---

## Deployment

The application is deployed on Netlify.

Live URL: https://notegeniuswebapp.netlify.app/

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Application Workflow](#application-workflow)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Notes](#notes)

---

## Overview

NoteGenius is a single-page application designed for students who want a lightweight, private tool to manage their academic workload. All data is persisted in `localStorage`, namespaced per user account. No data ever leaves the device.

---

## Features

- Multi-user authentication with per-account data isolation
- Subject management with color labels and cascading delete
- Flashcard creation and review with subject filtering and flip interaction
- Exam scheduling with a real-time days-remaining countdown
- Pomodoro timer (25 min focus / 5 min break) with session tracking
- Dark and light theme toggle, persisted across sessions
- Dashboard with live statistics on subjects, cards, and exams
- Fully offline — no network requests for user data

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Language | TypeScript |
| Routing | React Router v6 |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| State / Persistence | Custom hooks over `localStorage` |
| Build Tool | Vite |

---

## Project Structure

```
src/
├── types.ts
├── App.tsx
├── main.tsx
│
├── hooks/
│   ├── AuthContext.ts
│   ├── AuthProvider.tsx
│   ├── useAuth.ts
│   ├── useLocalStorage.ts
│   ├── useUserLocalStorage.ts
│   ├── useTheme.ts
│   ├── useSubjects.ts
│   ├── useCards.ts
│   ├── useExams.ts
│   └── usePomodoro.ts
│
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx
│   │   └── Sidebar.tsx
│   └── ui/
│       ├── Modal.tsx
│       ├── StatCard.tsx
│       └── EmptyState.tsx
│
└── pages/
    ├── LandingPage.tsx
    ├── LoginPage.tsx
    ├── SignupPage.tsx
    ├── Dashboard.tsx
    ├── UploadNotes.tsx
    ├── Review.tsx
    ├── ExamPlanner.tsx
    ├── Pomodoro.tsx
    └── Settings.tsx
```

---

## Application Workflow

### Authentication

The app starts at `/`. Users register at `/signup` or log in at `/login`. On success they are redirected to `/app`. `AppLayout` guards all protected routes — unauthenticated users are redirected back to `/`.

### Data Isolation

Every data hook uses `useUserLocalStorage`, which namespaces keys as `notegenius-{username}-{key}`. Logging out or switching accounts never exposes one user's data to another.

### Subject Lifecycle

Subjects are created from the Dashboard with a name and color. When deleted, all associated flashcards and exams are removed first via `removeBySubject` on their respective hooks, ensuring no orphaned data remains.

### Flashcard Lifecycle

Cards are created in Upload Notes by selecting a subject and filling in a question and answer. They are reviewed in the Review page with subject filtering, flip interaction, and sequential navigation.

### Exam Scheduling

The Exam Planner accepts a subject and a date. All scheduled exams are listed with a calculated days-remaining value. Past exams are labeled as "passed".

### Pomodoro Timer

The timer runs in component state using `setInterval` with refs to avoid stale closures. Completed focus sessions are persisted to `localStorage`. The mode switches automatically on completion.

---

## Getting Started

### Prerequisites

- Node.js 16 or later
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/notegenius.git
cd notegenius
npm install
```

### Development Server

```bash
npm run dev
```

Available at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

Output is in `dist/`, ready to deploy to any static file host.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Compile for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Usage Guide

1. Open the app and click **Get Started** to register an account.
2. From the **Dashboard**, click **Add Subject** to create your first subject.
3. Go to **Upload Notes** to create flashcards for that subject.
4. Use the **Review** page to study your cards.
5. Schedule upcoming exams in the **Exam Planner**.
6. Use the **Pomodoro** timer to manage study sessions.
7. Toggle dark mode from **Settings**.

---


## Notes

- Clearing browser storage will permanently erase all accounts and data.
- Passwords are stored in plaintext — this is intentional for a local-only demo. For a production deployment, hash passwords server-side before storage.
- The application works fully offline once loaded in the browser.
