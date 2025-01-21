import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query";
import { authenticate } from "@/api/authenticate";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";

const authenticateForm = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Senha inválida')
})

type AuthenticateForm = z.infer<typeof authenticateForm>

export function Login() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<AuthenticateForm>({
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const { mutateAsync: authenticateFn } = useMutation({
    mutationFn: authenticate
  })

  async function handleAuthenticateForm(data: AuthenticateForm) {
    if (data.email === "" || data.password === "") {
      return toast.error('Digite um email ou senha válida.', {
        position: 'top-center'
      })
    }

    try {
      const { user } = await authenticateFn({
        email: data.email,
        password: data.password,
      })

      if (user) {
        localStorage.setItem('@foodbox.scala:auth', JSON.stringify(user))
        setUser(user)
      }

      if (user.role === 'restaurant') {
        navigate('/restaurante/dashboard', {
          replace: true,
        })
      } else if (user.role === 'rh') {
        navigate('/rh/dashboard', {
          replace: true,
        }) 
      }
    } catch {
      toast.error('Não foi possível se autenticar, tente novamente.', {
        position: 'top-center'
      })
    }
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-primary-foreground">
      <div className="w-[300px] flex flex-col gap-2 text-center">
        <h1>Acessar painel</h1>
        <p className="text-sm text-muted-foreground">
          Entre com seu e-mail e senha, e acompanhe os pedidos e detalhes das marmitas.
        </p>

        <form
          onSubmit={handleSubmit(handleAuthenticateForm)}
          className="space-y-10 mt-8"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input
              className="border-blue-500"
              id="email"
              type="email"
              {...register('email')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Sua senha</Label>
            <Input
              className="border-blue-500"
              id="password"
              type="password"
              {...register('password')}
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <Button disabled={isSubmitting} type='submit' className="w-full">Entrar</Button>
            <Button disabled={isSubmitting} asChild variant="destructive" className="w-full">
              <a href="/">Voltar para pedidos</a>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}