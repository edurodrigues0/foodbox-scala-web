import { api } from "@/lib/axios";

export async function deleteUser(userId: string): Promise<void> {
  try {
    const response = await api.delete(`/users/${userId}`)

    console.log(response.data)
  } catch (error: any) {
    if (error.response) {
      throw new Error(JSON.stringify({
        status: error.response.status,
        message: error.response.data?.message || "Erro ao deletar usuário"
      }));
    }
    throw new Error("Erro inesperado ao deletar usuário");
  }
}
