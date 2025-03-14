import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Unauthorized() {
  const navigate = useNavigate()

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-9xl text-primary">
        401
      </h1>
      <span className="text-gray-900 dark:text-gray-500">
        Unauthorized
      </span>
      <div className="w-56 h-0.5 bg-primary" />
      <Button
        onClick={() => {
          navigate(-1)
        }}
      >
          Voltar
      </Button>
    </div>
  )
}