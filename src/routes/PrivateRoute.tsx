import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../auth/useAuthStore'; 

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation(); 

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}