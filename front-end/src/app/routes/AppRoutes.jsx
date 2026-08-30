import { Route, Routes } from "react-router-dom";

import { DashboardLayout } from "../../components/layout";

import {
  Dashboard,
  Notes,
  TasksPage,
  SchedulePage,
  RoadmapPage,
  ProgressPage,
  ProfilePage,
  NotificationsPage,
  SettingsPage,
} from "../../pages/dashboard";

import {
  Home,
  About,
  Features,
  Pricing,
  Blogs,
  FAQ,
  Contact,
  PrivacyPolicy,
  NotFound,
} from "../../pages/public";

import {
  Login,
  Signup,
  ForgotPasswordPage,
} from "../../pages/auth";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/features" element={<Features />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/privacy-policy"
        element={<PrivacyPolicy />}
      />

      {/* Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/forgot-password"
        element={<ForgotPasswordPage />}
      />

      {/* Protected Dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="notes" element={<Notes />} />

          <Route path="tasks" element={<TasksPage />} />

          <Route
            path="schedule"
            element={<SchedulePage />}
          />

          <Route
            path="roadmaps"
            element={<RoadmapPage />}
          />

          <Route
            path="progress"
            element={<ProgressPage />}
          />

          <Route
            path="profile"
            element={<ProfilePage />}
          />

          <Route
            path="notifications"
            element={<NotificationsPage />}
          />

          <Route
            path="settings"
            element={<SettingsPage />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>

      {/* Global Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;