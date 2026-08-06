import { Route, Routes } from "react-router-dom";

import {
  LoginPage,
  SignupPage,
  ForgotPasswordPage,
} from "../../pages/auth";

function AppRoutes() {
  return (
    <Routes>
       /* Authentication */
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  );
}

export default AppRoutes;
