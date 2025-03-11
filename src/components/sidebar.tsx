import {
  Home,
  Utensils,
  SquareMenu,
  LucideProps,
  Users2,
  Building2,
  ClipboardList,
  LayoutDashboard,
  UtensilsCrossed,
} from "lucide-react";
import { NavLink } from "./nav-link";

interface LinkProps {
  to: string
  title: string
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

interface LinksByRole {
  [role: string]: LinkProps[]
}

const linksByRole: LinksByRole = {
  restaurant: [
    // { to: "/restaurante/dashboard", title: "Início", icon: Home },
    { to: "/restaurante/cardapio", title: "Cardápio", icon: SquareMenu },
    { to: "/restaurante/pedidos", title: "Pedidos", icon: Utensils },
  ],
  rh: [
    // { to: "/rh/dashboard", title: "Início", icon: Home },
    { to: "/admin/colaboradores", title: "Colaboradores", icon: Users2 },
    { to: "/admin/usuarios", title: "Usuários", icon: ClipboardList },
    { to: "/admin/unidades", title: "Unidades", icon: Building2 },
    { to: "/admin/setores", title: "Setores", icon: LayoutDashboard },
    { to: "/admin/restaurantes", title: "Restaurantes", icon: Utensils },
    { to: "/admin/pedidos", title: "Pedidos", icon: UtensilsCrossed },
  ],
  supervisor: [
    { to: "/supervisor/colaboradores", title: "Colaboradores", icon: Users2 },
    { to: "/supervisor/pedidos", title: "Pedidos", icon: UtensilsCrossed },
  ]
}

interface SiderbarProps {
  role: keyof typeof linksByRole
}

export function Sidebar({ role }: SiderbarProps) {
  const links = linksByRole[role] || []

  return (
    <nav className="h-full w-44 flex flex-col justify-start p-6 space-y-8">
      {links.map((link) => {
        return (
          <NavLink
            key={link.to}
            to={link.to}
            title={link.title}
            icon={link.icon}
          />
        )
      })}
    </nav>
  )
}