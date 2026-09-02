import { Route, Routes } from "react-router-dom";

import { DashboardLayout } from "../../components/layout";

import {
  Dashboard,
  Notes,
  TasksPage,
  ProfilePage,
  SettingsPage,
} from "../../pages/dashboard";

import {
  Home,
  Blogs,
  About,
  Contact,
  PrivacyPolicy,
  NotFound,
  Terms,
} from "../../pages/public";

import {
  Login,
  Signup,
  ForgotPasswordPage,
} from "../../pages/auth";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route
        path="/privacy-policy"
        element={<PrivacyPolicy />}
      />

      {/* Authentication Routes */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />
      </Route>

      {/* Protected Dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="notes" element={<Notes />} />

          <Route path="tasks" element={<TasksPage />} />


          <Route
            path="profile"
            element={<ProfilePage />}
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