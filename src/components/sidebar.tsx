import { Home, Utensils, SquareMenu, LucideProps, Users2, Building2, ClipboardList } from "lucide-react";
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
    { to: "/rh/dashboard/unidades-e-setores", title: "Unidades e Setores", icon: Building2 },
    { to: "/rh/dashboard/supervisores", title: "Supervisores", icon: ClipboardList },
  ],
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