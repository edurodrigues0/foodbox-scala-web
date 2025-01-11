import { Header } from "@/components/header";
import { NavLink } from "@/components/nav-link";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { Home, Utensils, SquareMenu } from "lucide-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function DashboardLayout() {
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
        <nav className="h-full w-56 flex flex-col justify-start p-6 space-y-4">
          <NavLink
            to='/dashboard'
            title="Inicio"
            icon={Home}
          />

          <NavLink
            to="/dashboard/pedidos"
            title="Pedidos"
            icon={Utensils}
          />

          <NavLink
            to="/dashboard/cardapio"
            title="Cardápio"
            icon={SquareMenu}
          />
        </nav>

        <Separator className="bg-primary" orientation="vertical" />

        <Outlet />
      </div>
    </div>
  )
}