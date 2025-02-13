import { ProfileMenu } from "./profile-menu";
import { ThemeToggle } from "./theme/theme-toggle";

export function Header() {
  return (
    <header className="bg-primary p-4 text-primary-foreground flex items-center justify-between flex-wrap">
      <h1 className="text-4xl text-primary-foreground font-bold select-none w-full sm:w-auto text-center sm:text-left">
        Scala
      </h1>

      <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-end mt-4 sm:mt-0">
        <ProfileMenu />
        <ThemeToggle />
      </div>
    </header>
  )
}
