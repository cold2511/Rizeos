import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token'); // token from login

  return token ? children : <Navigate to="/login" />;
}