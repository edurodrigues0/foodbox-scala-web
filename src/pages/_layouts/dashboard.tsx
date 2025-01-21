import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function DashboardLayout() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error?.response?.status
          const code = error.response?.data.code

          if (status === 401 && code === 'Unauthorized') {
            navigate('/login', { replace: true })
          }

          if (status === 400) {
            navigate('/login', { replace: true })
          }
        } else {
          throw error
        }
      }
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar role={user?.role} />

        <Separator className="bg-primary" orientation="vertical" />

        <Outlet />
      </div>
    </div>
  )
}