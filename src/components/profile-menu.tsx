import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Building, LogOut } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";
import { signOut } from "@/api/sign-out";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";

export function ProfileMenu() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  const { mutateAsync: signOutFn, isPending: isSignOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      localStorage.removeItem('@foodbox.scala:auth')
      setUser(null)
      navigate('/login', { replace: true })
    }
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="flex items-center gap-2 select-none"
        >
          {
            !user ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              user?.name
            )
          }
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>
          {
            !user ? (
              <Skeleton className="h-4 w-32" />
            ) : (
              <span className="text-xs font-normal text-muted-foreground">
                { user?.email }
              </span>
            )
          }
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Building className="w-4 h-4 mr-2" />
          <span>Perfil</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          disabled={isSignOut}
          className="text-rose-500 dark:text-rose-400"
        >
          <button className="w-full" onClick={() => signOutFn()}>
            <LogOut className="w-4 h-4 mr-2" />
            <span>Sair</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}