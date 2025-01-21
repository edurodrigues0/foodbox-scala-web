import { AppLayout } from '@/pages/_layouts/app';
import { Home } from '@/pages/app/home';
import { Login } from '@/pages/app/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './protected-route';
import { DashboardLayout } from '@/pages/_layouts/dashboard';
import { Dashboard } from '@/pages/app/dashboard';
import { Menu } from '@/pages/app/menu/menu';
import { Orders } from '@/pages/app/orders';
import { RhDashboard } from '@/pages/rh/rh-dashboard';
import { useAuth } from '@/context/auth-context';
import { Colaborators } from '@/pages/rh/colaborators/colaborators';
import { RegisterColaborator } from '@/pages/rh/register/register-colaborator';
import { Supervisors } from '@/pages/rh/supervisors/supervisors';

export function AppRoutes() {
  const { user } = useAuth()
  const redirectByRole = user ? `/${user.role}/dashboard` : '/'

  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <ProtectedRoute redirectTo={redirectByRole} /> }>
          <Route element={ <AppLayout /> }>
            <Route index element={ <Home /> } />
            <Route path='/login' element={ <Login /> } />
          </Route>
        </Route>

        <Route element={ <ProtectedRoute requiredRoles={['restaurant']} /> }>
          <Route element={ <DashboardLayout /> }>
            <Route path='/restaurante/dashboard' element={ <Dashboard /> } />
            <Route path='/restaurante/dashboard/pedidos' element={ <Orders /> } />
            <Route path='/restaurante/dashboard/cardapio' element={ <Menu /> } />
          </Route>
        </Route>

        <Route element={ <ProtectedRoute requiredRoles={['rh', 'supervisor']} /> }>
          <Route element={ <DashboardLayout /> }>
            <Route path='/rh/dashboard' element={ <RhDashboard /> } />
            <Route path='/rh/dashboard/colaboradores' element={ <Colaborators /> } />
            <Route path='/rh/dashboard/colaboradores/cadastro' element={ <RegisterColaborator /> } />
            <Route path='/rh/dashboard/supervisores' element={ <Supervisors /> } />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}