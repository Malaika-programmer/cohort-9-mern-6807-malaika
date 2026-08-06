import { Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../../components/layout";
import {
  DashboardPage,
  NotesPage,
  TasksPage,
  SchedulePage,
  RoadmapPage,
  ProgressPage,
  ProfilePage,
  NotificationsPage,
  SettingsPage,
} from "../../pages/dashboard";

import {
  HomePage,
  AboutPage,
  NotFoundPage,
} from "../../pages/public";
import {
  LoginPage,
  SignupPage,
  ForgotPasswordPage,
} from "../../pages/auth";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />

       /* Authentication */
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      /* Dashboard */
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="notes" element={<NotesPage />} />
        <Route path="notes/create" element={<NotesPage />} />
        <Route path="notes/:noteId" element={<NotesPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="tasks/create" element={<TasksPage />} />
        <Route path="tasks/:taskId" element={<TasksPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="roadmaps" element={<RoadmapPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
