import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, children }) {
  // If not logged in, redirect to /auth
  if (!user) {
    return <Navigate to="/auth" />;
  }

  // Otherwise, render the page
  return children;
}

export default ProtectedRoute;
