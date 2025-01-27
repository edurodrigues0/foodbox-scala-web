import { useAuth } from '@/context/auth-context'
import { Navigate, Outlet } from 'react-router-dom'

export function PublicRoute() {
  const { user } = useAuth()

  let redirectTo = '/rh/dashboard'

  if (user && user.role === 'rh') {
    redirectTo = '/rh/dashboard'
  }

  if (user && user.role === 'restaurant') {
    redirectTo = '/restaurante/dashboard'
  }

  if (user) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}
