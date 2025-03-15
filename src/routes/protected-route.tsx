import { useAuth } from '@/context/auth-context'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedRouteProps {
  requiredRoles?: string[]
}

export function ProtectedRoute({ requiredRoles }: ProtectedRouteProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false)
    }
  }, [user])

  if (loading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <Loader2 className='h-12 w-12 text-primary animate-spin' />
      </div>
    )
  }

  if (!user) {
    return <Navigate to='/login' replace />
  }

  // if (requiredRoles && !requiredRoles.includes(user.role ?? "")) {
  //   return <Navigate to='/unauthorized' replace />
  // }

  return <Outlet />
}
