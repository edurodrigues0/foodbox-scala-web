import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layouts/app";
import { Home } from "./pages/app/home";
import { Login } from "./pages/app/login";
import { Dashboard } from "./pages/app/dashboard";
import { DashboardLayout } from "./pages/_layouts/dashboard";
import { Orders } from "./pages/app/orders";
import { Menu } from "./pages/app/menu/menu";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/dashboard', element: <Dashboard /> }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/dashboard/pedidos', element: <Orders /> },
      { path: '/dashboard/cardapio', element: <Menu /> },
    ]
  }
])