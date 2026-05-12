# NoteGenius

A focused, client-side study management application built with React and TypeScript. NoteGenius helps students organize their study material through subject management, flashcard review, exam scheduling, and productivity tracking — all without a backend or external database.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Application Workflow](#application-workflow)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)

---

## Overview

NoteGenius is a single-page application (SPA) designed for students who want a lightweight, private, and offline-capable tool to manage their academic workload. All data is persisted in the browser's `localStorage`, scoped per user account, meaning no data ever leaves the device.

---

## Key Features

### Authentication
- Local account registration and login with name and password
- Per-user data isolation: each account's subjects, flashcards, and exams are stored under a unique namespace in `localStorage`
- Protected routes: unauthenticated users are redirected to the landing page

### Subject Management
- Create subjects with a name and a color label
- Delete subjects along with all their associated flashcards and exams (cascading delete)
- Dashboard overview showing total subjects, flashcards, and exams

### Flashcard System
- Manually create flashcards (question / answer pairs) assigned to a subject
- Review flashcards with a flip interaction, filterable by subject or across all subjects
- Navigate forward and backward through the card deck

### Exam Planner
- Schedule exam dates for any subject
- View all upcoming and past exams with a countdown in days
- Remove individual exam entries

### Pomodoro Timer
- 25-minute focus sessions and 5-minute break sessions
- Circular SVG progress ring with real-time countdown
- Session counter persisted per user in `localStorage`

### Theme
- Light and dark mode toggle, persisted across sessions via `localStorage`

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 with functional components and hooks |
| Language | TypeScript |
| Routing | React Router v6 |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| State / Persistence | Custom `useLocalStorage` hook (browser `localStorage`) |
| Build Tool | Vite |

No external backend, database, or authentication service is used.

---

## Project Structure

```
src/
├── types.ts                    # Shared TypeScript interfaces (User, Subject, Flashcard, Exam)
├── App.tsx                     # Root component, router configuration
├── main.tsx                    # React DOM entry point
│
├── hooks/
│   ├── AuthContext.ts          # React context definition for auth state
│   ├── AuthProvider.tsx        # Auth state provider (login, register, logout)
│   ├── useAuth.ts              # Hook to consume auth context
│   ├── useLocalStorage.ts      # Generic localStorage state hook
│   ├── useUserLocalStorage.ts  # Per-user namespaced localStorage hook
│   ├── useTheme.ts             # Theme toggle hook (light / dark)
│   ├── useSubjects.ts          # Subject CRUD operations
│   ├── useCards.ts             # Flashcard CRUD operations
│   ├── useExams.ts             # Exam scheduling operations
│   └── usePomodoro.ts          # Pomodoro timer logic
│
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx       # Authenticated layout wrapper with auth guard
│   │   └── Sidebar.tsx         # Responsive navigation sidebar
│   └── ui/
│       ├── Modal.tsx           # Reusable modal dialog
│       ├── StatCard.tsx        # Statistic display card
│       └── EmptyState.tsx      # Empty state placeholder component
│
└── pages/
    ├── LandingPage.tsx         # Public marketing / entry page
    ├── LoginPage.tsx           # Login form
    ├── SignupPage.tsx          # Registration form
    ├── Dashboard.tsx           # Main workspace with subject overview
    ├── UploadNotes.tsx         # Flashcard creation form
    ├── Review.tsx              # Flashcard review interface
    ├── ExamPlanner.tsx         # Exam scheduling and listing
    ├── Pomodoro.tsx            # Pomodoro timer page
    └── Settings.tsx            # Theme settings
```

---

## Application Workflow

### 1. Authentication Flow

The application starts at the landing page (`/`). From there, the user can navigate to `/signup` to create a new local account or to `/login` to access an existing one. Credentials are stored in `localStorage` under the key `notegenius-accounts`. On successful login, the user is redirected to `/app`.

`AppLayout` wraps all protected routes and performs an auth check on every render. If `isAuthenticated` is `false`, the user is redirected back to `/`.

### 2. Data Isolation

All data hooks (`useSubjects`, `useCards`, `useExams`, `usePomodoro`) use `useUserLocalStorage`, which namespaces every key as `notegenius-{username}-{key}`. This ensures that switching accounts or logging out does not expose one user's data to another.

### 3. Subject Lifecycle

A subject is created from the Dashboard with a name and a color. It serves as the parent entity for both flashcards and exams. When a subject is deleted, the dashboard handler calls `removeBySubject` on both the cards and exams hooks before removing the subject itself, ensuring no orphaned data remains.

### 4. Flashcard Lifecycle

Flashcards are created in the Upload Notes page by selecting a subject, entering a question (front), and entering an answer (back). They are reviewed in the Review page, where the user can filter by subject, flip cards, and navigate sequentially.

### 5. Exam Scheduling

In the Exam Planner, the user selects a subject and a date to schedule an exam. All scheduled exams are listed with a calculated days-remaining value. Past exams are marked as "passed".

### 6. Pomodoro Timer

The timer runs entirely in component state using `setInterval`. Session completions are persisted to `localStorage` via `useUserLocalStorage`. The timer automatically switches between focus and break modes on completion.

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/notegenius.git
cd notegenius
npm install
```

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

The output will be in the `dist/` directory and can be served by any static file host.

---

## Usage Guide

1. Open the application and click **Get Started** to create an account.
2. From the **Dashboard**, click **Add Subject** to create your first subject.
3. Navigate to **Upload Notes** to create flashcards for that subject.
4. Use the **Review** page to study your flashcards.
5. Schedule upcoming exams in the **Exam Planner**.
6. Use the **Pomodoro** timer to manage your study sessions.
7. Toggle dark mode from the **Settings** page.

---

## Notes

- All data is stored locally in the browser. Clearing browser storage will erase all accounts and data.
- There is no password recovery mechanism; this is intentional given the local-only design.
- The application is fully functional offline once loaded.
