import { RouterProvider } from "react-router-dom"
import { ThemeProvider } from "./components/theme/theme-provider"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/react-query"
import { Toaster } from "sonner"
import { AuthProvider } from "./context/auth-context"
import { AppRoutes } from "./routes/routes"

function App() {
  return (
    <ThemeProvider storageKey="foodbox-scala-theme" defaultTheme="system">
      <Toaster richColors />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
