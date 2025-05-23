import { useTheme } from "@/components/theme/theme-provider";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme('light')
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <h1 className="text-2xl text-primary-foreground font-bold select-none">
          Scala
        </h1>

        <div className="flex items-center gap-4">
          <Button asChild variant="secondary">
            <a href="/login">Painel Administrativo</a>
          </Button>
          <Button asChild variant="secondary">
            <a href="/historico">Historico</a>
          </Button>
        </div>
      </header>

      <Outlet />


      <footer className="bg-secondary w-full h-16 flex items-center justify-center border-t-2 border-primary">
        <span className="text-xs text-secondary-foreground font-semibold">
          Desenvolvido com 💙 por Eduardo Rodrigues
        </span>
      </footer>
    </div>
  )
}