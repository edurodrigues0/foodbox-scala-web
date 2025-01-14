import { ProfileMenu } from "./profile-menu";
import { ThemeToggle } from "./theme/theme-toggle";

export function Header() {
  return (
    <header className="bg-primary p-4 text-primary-foreground flex items-center justify-between">
      <h1 className="text-4xl text-primary-foreground font-bold select-none">
        Scala
      </h1>

      <div className="flex items-center gap-4">
        <ProfileMenu />
        <ThemeToggle />
      </div>
    </header>
  )
}