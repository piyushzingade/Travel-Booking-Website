import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated } :any) => {
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  return <Outlet />; // Render child routes if authenticated
};

export default ProtectedRoute;
