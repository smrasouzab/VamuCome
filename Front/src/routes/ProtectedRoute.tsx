import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roleType?: string[];
  exact?: boolean;
}

const ProtectedRoute = ({ children, roleType }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    Promise.resolve(isAuthenticated).then((result) => {
      if (mounted) {
        setAuth(result);
        setAuthChecked(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, [isAuthenticated]);

  if (!authChecked) {
    // Optionally, render a loading indicator here
    return null;
  }

  if (!auth) {
    return <Navigate to="/" />;
  }

  if (roleType && !roleType.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;