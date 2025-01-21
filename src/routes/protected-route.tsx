import { useAuth } from '@/context/auth-context'
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedRouteProps {
  requiredRoles?: string[]
  redirectTo?: string
}

export function ProtectedRoute({ requiredRoles }: ProtectedRouteProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user !== null) {
      setLoading(false)
    }
  }, [user])

  if (loading) {
    return <div>...Carregando</div>
  }

  if (requiredRoles && !requiredRoles.includes(user?.role || "")) {
    return <Navigate to='/unauthorized' replace />
  }

  return <Outlet />
}
