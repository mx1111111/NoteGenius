import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthProvider";
import { AppLayout } from "./components/layout/AppLayout";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { Dashboard } from "./pages/Dashboard";
import { UploadNotes } from "./pages/UploadNotes";
import { Review } from "./pages/Review";
import { ExamPlanner } from "./pages/ExamPlanner";
import { Settings } from "./pages/Settings";
import { Pomodoro } from "./pages/Pomodoro";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="upload" element={<UploadNotes />} />
            <Route path="pomodoro" element={<Pomodoro />} />
            <Route path="review" element={<Review />} />
            <Route path="exam-planner" element={<ExamPlanner />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}