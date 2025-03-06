import { useAuth } from '@/context/auth-context'
import { Navigate, Outlet } from 'react-router-dom'

export function PublicRoute() {
  const { user } = useAuth()

  let redirectTo = '/admin/colaboradores'

  if (user && user.role === 'rh') {
    redirectTo = '/admin/colaboradores'
  }

  if (user && user.role === 'restaurant') {
    redirectTo = '/restaurante/cardapio'
  }

  if (user) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}
