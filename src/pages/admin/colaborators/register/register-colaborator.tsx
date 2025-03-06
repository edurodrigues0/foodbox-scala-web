import { RegisterColaboratorForm } from "./register-colaborator-form"

export function RegisterColaborator() {
  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold tracking-tighter">
          Cadastrar de colaboradores
        </h1>

        <RegisterColaboratorForm />
      </div>
    </div>
  );
}

