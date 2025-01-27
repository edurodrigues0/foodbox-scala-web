import { AppLayout } from '@/pages/_layouts/app';
import { Home } from '@/pages/app/home';
import { Login } from '@/pages/app/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './protected-route';
import { DashboardLayout } from '@/pages/_layouts/dashboard';
import { Dashboard } from '@/pages/app/dashboard';
import { Menu } from '@/pages/app/menu/menu';
import { Orders } from '@/pages/app/orders/orders';
import { RhDashboard } from '@/pages/rh/rh-dashboard';
import { Colaborators } from '@/pages/rh/colaborators/colaborators';
import { RegisterColaborator } from '@/pages/rh/register/register-colaborator';
import { Units } from '@/pages/rh/units/units';
import { Sectors } from '@/pages/rh/sectors/sectors';
import { Restaurants } from '@/pages/rh/restaurants/restaurants';
import { Orders as AdminOrders } from '@/pages/rh/orders/orders'
import { Users } from '@/pages/rh/users/users';
import { Unauthorized } from '@/pages/unauthorized';
import { PublicRoute } from './public-routes';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <PublicRoute /> }>
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
            <Route path='/rh/dashboard/usuarios' element={ <Users /> } />
            <Route path='/rh/dashboard/unidades' element={ <Units /> } />
            <Route path='/rh/dashboard/setores' element={ <Sectors /> } />
            <Route path='/rh/dashboard/restaurantes' element={ <Restaurants /> } />
            <Route path='/rh/dashboard/pedidos' element={ <AdminOrders /> } />
          </Route>
        </Route>

        <Route path='/unauthorized' element={ <Unauthorized /> } />
      </Routes>
    </BrowserRouter>
  )
}