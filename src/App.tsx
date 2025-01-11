import { RouterProvider } from "react-router-dom"
import { ThemeProvider } from "./components/theme/theme-provider"
import { router } from "./routes"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/react-query"
import { Toaster } from "sonner"

function App() {
  return (
    <ThemeProvider storageKey="foodbox-scala-theme" defaultTheme="system">
      <Toaster richColors />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
