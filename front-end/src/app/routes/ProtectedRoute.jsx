import PropTypes from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { isAuthenticated } from "../../utils/auth";

function ProtectedRoute({ redirectTo = "/login" }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}

ProtectedRoute.propTypes = {
  redirectTo: PropTypes.string,
};

export default ProtectedRoute;