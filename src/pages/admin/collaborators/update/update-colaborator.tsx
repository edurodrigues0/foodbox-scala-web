import { UpdateColaboratorForm } from "./update-collaborators-form";

export function UpdateColaborator() {
  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold tracking-tighter">
          Editar colaborador
        </h1>

        <UpdateColaboratorForm />
      </div>
    </div>
  );
}

