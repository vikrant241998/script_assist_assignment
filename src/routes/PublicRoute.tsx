import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../auth/useAuthStore';

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}