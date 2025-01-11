import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <h1 className="text-4xl text-primary-foreground font-bold select-none">
          Scala
        </h1>

        <div className="flex items-center gap-4">
          <Button asChild variant="secondary">
            <a href="/login">Painel Administrativo</a>
          </Button>
          <Button asChild variant="secondary">
            <a href="/login">Historico</a>
          </Button>

          <ThemeToggle />
        </div>
      </header>

      <Outlet />
    </div>
  )
}