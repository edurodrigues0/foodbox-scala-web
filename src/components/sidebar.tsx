import {
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
  to: string;
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

interface LinksByRole {
  [role: string]: LinkProps[];
}

interface SidebarProps {
  role?: string; // Pode ser undefined inicialmente
}

export function Sidebar({ role }: SidebarProps) {
  // Normaliza a role para evitar problemas de formatação
  const normalizedRole = role?.toLowerCase().trim() || "";

  console.log("🔍 Role recebida:", role);
  console.log("🔄 Role normalizada:", normalizedRole);

  const linksByRole: LinksByRole = {
    restaurant: [
      { to: "/restaurante/cardapio", title: "Cardápio", icon: SquareMenu },
      { to: "/restaurante/pedidos", title: "Pedidos", icon: Utensils },
    ],
    rh: [
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
    ],
  };

  // Verifica se a role está no objeto
  if (!Object.keys(linksByRole).includes(normalizedRole)) {
    console.warn(`⚠️ Role inválida: "${normalizedRole}". Nenhum link carregado.`);
  }

  const links = linksByRole[normalizedRole] || [];

  console.log("📌 Links carregados:", links);

  return (
    <nav className="h-full w-44 flex flex-col justify-start p-6 space-y-8">
      {role === "admin" || role === 'rh' && (
        <>
          <NavLink to='/admin/colaboradores' title='Colaboradores' icon={Users2} />
          <NavLink to='/admin/usuarios' title='Usuários' icon={ClipboardList} />
          <NavLink to='/admin/unidades' title='Unidades' icon={Building2} />
          <NavLink to='/admin/setores' title='Setores' icon={LayoutDashboard} />
          <NavLink to='/admin/restaurantes' title='Restaurantes' icon={Utensils} />
          <NavLink to='/admin/pedidos' title='Pedidos' icon={UtensilsCrossed} />
        </>
      )}

      {role === "restaurant" && (
        <>
          <NavLink to='/restaurante/cardapio' title='Cardápio' icon={SquareMenu} />
          <NavLink to='/restaurante/pedidos' title='Pedidos' icon={Utensils} />
        </>
      )}
    </nav>
  );
}
