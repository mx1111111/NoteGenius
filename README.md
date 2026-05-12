#  NoteGenius

**NoteGenius** is a modern study productivity web application that helps students organize their learning process using flashcards, subject management, exam planning, and a Pomodoro timer. It is a fully client-side React + TypeScript app using LocalStorage for persistence and authentication.

---

#  Description

NoteGenius is a **personal learning workspace** designed to help students study efficiently without needing a backend.

It allows users to:
- Create and manage subjects
- Build flashcards for active recall learning
- Schedule and track exams
- Use a Pomodoro timer for focused study sessions
- Persist data per user using LocalStorage authentication

---

#  Workflow of the Application

## 1. Authentication Flow
- Users register or log in with a username and password
- Data is stored in LocalStorage
- Each user has isolated data

## 2. Subject Management
- Users create subjects (e.g. Math, Physics)
- Each subject includes:
- Name
- Color tag
- Optional description
- Subjects are the main container for flashcards and exams

---

## 3. Flashcard System
- Flashcards are linked to a subject
- Each flashcard contains:
- Front (Question)
- Back (Answer)

Features:
- Flip interaction (Q/A)
- Subject filtering
- Sequential navigation (next/previous)

---

## 4. Exam Planner
- Users schedule exams per subject
- Each exam includes:
- Subject
- Date

System automatically calculates:
- Days remaining until exam

---

## 5. Pomodoro Timer
- Two modes:
- Focus (25 minutes)
- Break (5 minutes)

Features:
- Start / pause / reset
- Session counter
- Circular progress animation

---

## 6. Dashboard
Central hub showing:
- Total subjects
- Total flashcards
- Total exams
- Quick navigation buttons

---

## 7. Settings
- Theme toggle:
- Light mode 
- Dark mode 
- Theme stored in LocalStorage

---

## 8. Data Persistence System
- Built using custom hooks:
- `useLocalStorage`
- `useUserLocalStorage`

All data is:
- Stored locally
- Isolated per user
- Persistent between sessions

---

#  Features

##  Authentication
- Simple login/register system
- LocalStorage-based sessions

##  Study Tools
- Flashcards system (active recall)
- Subject organization
- Exam scheduling

##  Productivity Tools
- Pomodoro timer
- Session tracking
- Focus/break switching

##  Dashboard
- Subject count
- Flashcard count
- Exam count

##  UI/UX
- Responsive design
- Dark/light mode
- Animated transitions
- Sidebar navigation

##  Storage
- Fully offline-first
- No backend required
- User-specific data isolation

---

#  Technologies Used

## Frontend
- React (TypeScript)
- Vite
- Tailwind CSS

## State Management
- React Context API (Auth)
- Custom Hooks architecture

## Routing
- React Router DOM

## UI Components
- Lucide React icons
- Custom reusable components:
- Modal
- Sidebar
- EmptyState
- StatCard

---

#  How to Use the Application

## 1. Install dependencies
```bash
npm install
