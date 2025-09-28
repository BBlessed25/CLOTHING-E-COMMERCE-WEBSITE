import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export default function ProtectedRoute({ children }) {
  const { state } = useApp()
  const location = useLocation()
  
  // Check if user is authenticated
  if (state.auth.status !== 'auth' || !state.auth.user) {
    // Redirect to login page with the current location as state
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  return children
}
