import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export default function ProtectedRoute({ children }) {
  const { state } = useApp()
  const location = useLocation()
  
  console.log('ProtectedRoute - Auth state:', state.auth)
  
  // Check if user is authenticated
  if (state.auth.status !== 'auth' || !state.auth.user) {
    console.log('ProtectedRoute - User not authenticated, redirecting to login')
    // Redirect to login page with the current location as state
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  console.log('ProtectedRoute - User authenticated, allowing access')
  return children
}
