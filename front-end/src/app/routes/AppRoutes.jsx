import { Route, Routes } from "react-router-dom";

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

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
