import { AppLayout } from '@/pages/_layouts/app'
import { Home } from '@/pages/app/home'
import { Login } from '@/pages/app/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './protected-route'
import { DashboardLayout } from '@/pages/_layouts/dashboard'
import { Menu } from '@/pages/restaurant/menu/menu'
import { Orders } from '@/pages/restaurant/orders/orders'
import { Collaborators } from '@/pages/admin/collaborators/collaborators'
import { RegisterColaborator } from '@/pages/admin/collaborators/register/register-colaborator'
import { Units } from '@/pages/admin/units/units'
import { Sectors } from '@/pages/admin/sectors/sectors'
import { Restaurants } from '@/pages/admin/restaurants/restaurants'
import { Orders as AdminOrders } from '@/pages/admin/orders/orders'
import { Users } from '@/pages/admin/users/users'
import { Unauthorized } from '@/pages/unauthorized'
import { PublicRoute } from './public-routes'
import { UpdateColaborator } from '@/pages/admin/collaborators/update/update-colaborator'
import { Collaborators as SupervisorCollaborators } from '@/pages/supervisor/collaborators'
import { Orders as SupervisorOrders } from '@/pages/supervisor/orders'
import { History } from '@/pages/app/history'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <PublicRoute /> }>
          <Route element={ <AppLayout /> }>
            <Route index element={ <Home /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/historico' element={ <History /> } />
          </Route>
        </Route>
        
        { /* Restaurant Routes */ }
        <Route element={ <ProtectedRoute requiredRoles={['restaurant']} /> }>
          <Route element={ <DashboardLayout /> }>
            <Route path='/restaurante/pedidos' element={ <Orders /> } />
            <Route path='/restaurante/cardapio' element={ <Menu /> } />
          </Route>
        </Route>

        { /* Supervisor Route */ }
        <Route element={ <ProtectedRoute requiredRoles={['supervisor']} /> }>
          <Route element={ <DashboardLayout /> }>
            <Route path='/supervisor/colaboradores' element={ <SupervisorCollaborators /> } />
            <Route path='/supervisor/pedidos' element={ <SupervisorOrders /> } />
          </Route>
        </Route>

        { /* Admin Routes */ }
        <Route element={ <ProtectedRoute requiredRoles={['rh', 'admin']} /> }>
          <Route element={ <DashboardLayout /> }>
            {/* <Route path='/admin/dashboard' element={ <RhDashboard /> } /> */}
            <Route path='/admin/colaboradores' element={ <Collaborators /> } />
            <Route path='/admin/colaboradores/cadastro' element={ <RegisterColaborator /> } />
            <Route path='/colaboradores/:colaboratorId/editar' element={ <UpdateColaborator /> } />
            <Route path='/admin/usuarios' element={ <Users /> } />
            <Route path='/admin/unidades' element={ <Units /> } />
            <Route path='/admin/setores' element={ <Sectors /> } />
            <Route path='/admin/restaurantes' element={ <Restaurants /> } />
            <Route path='/admin/pedidos' element={ <AdminOrders /> } />
          </Route>
        </Route>

        <Route path='/unauthorized' element={ <Unauthorized /> } />
      </Routes>
    </BrowserRouter>
  )
}