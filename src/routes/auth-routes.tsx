import { useAuth } from "@/context/auth-context"
import { AppLayout } from "@/pages/_layouts/app"
import { Home } from "@/pages/app/home"
import { Login } from "@/pages/app/login"
import { redirectUser } from "@/utils/redirect-user"
import { Navigate, Route, Routes } from "react-router-dom"

export function AuthRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={ <AppLayout /> }>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        { !user && <Route path="*" element={ <Navigate to="/login" /> } /> }
        {
          user &&
          <Route
            path="*"
            element={
              <Navigate to={`${redirectUser(user.role)}`} />
            }
          />
        }
      </Route>
    </Routes>
  )
}