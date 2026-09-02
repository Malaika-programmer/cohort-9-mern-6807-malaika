import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

import { isAuthenticated } from "../../utils/auth";

function GuestRoute({ redirectTo = "/dashboard" }) {
  if (isAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}

GuestRoute.propTypes = {
  redirectTo: PropTypes.string,
};

export default GuestRoute;
