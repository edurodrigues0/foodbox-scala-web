import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Building, LogOut } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { Skeleton } from "./ui/skeleton";
import { signOut } from "@/api/sign-out";
import { useNavigate } from "react-router-dom";

export function ProfileMenu() {
  const navigate = useNavigate()

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity
  })

  const { mutateAsync: signOutFn, isPending: isSignOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
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
            isProfileLoading ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              profile?.user.name
            )
          }
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>
          {
            isProfileLoading ? (
              <Skeleton className="h-4 w-32" />
            ) : (
              <span className="text-xs font-normal text-muted-foreground">
                { profile?.user.email }
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