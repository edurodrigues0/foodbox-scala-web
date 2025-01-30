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
    { to: "/restaurante/dashboard", title: "Início", icon: Home },
    { to: "/restaurante/dashboard/pedidos", title: "Pedidos", icon: Utensils },
    { to: "/restaurante/dashboard/cardapio", title: "Cardápio", icon: SquareMenu },
  ],
  rh: [
    { to: "/rh/dashboard", title: "Início", icon: Home },
    { to: "/rh/dashboard/colaboradores", title: "Colaboradores", icon: Users2 },
    { to: "/rh/dashboard/usuarios", title: "Usuários", icon: ClipboardList },
    { to: "/rh/dashboard/unidades", title: "Unidades", icon: Building2 },
    { to: "/rh/dashboard/setores", title: "Setores", icon: LayoutDashboard },
    { to: "/rh/dashboard/restaurantes", title: "Restaurantes", icon: Utensils },
    { to: "/rh/dashboard/pedidos", title: "Pedidos", icon: UtensilsCrossed },
  ],
  supervisor: [
    { to: "/colaboradores", title: "Colaboradores", icon: Users2 },
    { to: "/pedidos", title: "Pedidos", icon: UtensilsCrossed },
  ]
}

interface SiderbarProps {
  role: keyof typeof linksByRole
}

export function Sidebar({ role }: SiderbarProps) {
  const links = linksByRole[role] || []

  return (
    <nav className="h-full w-52 flex flex-col justify-start p-6 space-y-8">
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