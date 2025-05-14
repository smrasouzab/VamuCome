import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roleType?: string[];
}

const ProtectedRoute = ({ children, roleType }: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useAuth();

  console.log("isAuthenticated", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (roleType && !roleType.includes(role)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;