import { useAuth } from "@/context/auth-context"
import { DashboardLayout } from "@/pages/_layouts/dashboard"
import { Dashboard } from "@/pages/app/dashboard"
import { Menu } from "@/pages/app/menu/menu"
import { Orders } from "@/pages/app/orders"
import { redirectUser } from "@/utils/redirect-user"
import { Navigate, Route, Routes } from "react-router-dom"

export function RestaurantRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/restaurante/dashboard" element={ <DashboardLayout /> }>
        <Route index element={ <Dashboard /> } />

        <Route
          path="/restaurante/dashboard/pedidos"
          element={ <Orders /> }
        />

        <Route
          path="/restaurante/dashboard/cardapio"
          element={ <Menu /> }
        />

        {
          user?.role !== 
          'restaurant' &&
          <Route
            path="*"
            element={ <Navigate to={`${redirectUser(user?.role)}`} /> }
          />
        }
      </Route>
    </Routes>
  )
}