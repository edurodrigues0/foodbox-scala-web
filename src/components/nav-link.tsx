import { LucideProps } from "lucide-react";
import { Link, LinkProps, useLocation } from "react-router-dom";

interface NavLinkProps extends LinkProps {
  title: string
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

export function NavLink({ title, icon: Icon, ...rest}: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
    className="flex items-center gap-1.5 text-muted-foreground hover:text-primary data-[active=true]:text-primary"
    data-active={pathname === rest.to}
    {...rest}
  >
      <Icon className="w-4 h-4" />
      <span className="text-lg">{title}</span>
    </Link>
  )
}