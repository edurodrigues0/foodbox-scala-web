import { UtensilsCrossed } from "lucide-react"

interface Menu {
  menu_name: string
  service_date: string
  menu_description: string[]
  menu_allergens: string | null
}

export interface MenuDescriptionProps {
  data: Menu
}

export function MenuDescription({
  data
}: MenuDescriptionProps) {
  if (!data) {
    return (
      <div className="mt-10  flex flex-col gap-4 items-center justify-center">
        <UtensilsCrossed size={32} />
        <h1 className="text-xl">Ops, cardapio não disponivel!</h1>
      </div>
    )
  }
  const fomattedDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(data.service_date))
  
  return (
    <div className="flex flex-col gap-6 mt-2">
      <p>Data: {fomattedDate}</p>

      <div className="flex flex-col gap-0.5">
        <p className="font-bold">Prato Principal</p>
        <p>{data.menu_name.toUpperCase()}</p>
      </div>

      <ul className="flex flex-col gap-0.5 list-disc">
        <p className="font-bold">Acompanhamentos</p>
        <div className="ml-6">
          {data.menu_description?.map((sideDishes, index) => (
            <li
              key={`${index}-${sideDishes}`}
              className="text-sm"
            >
              { sideDishes.toUpperCase() }
            </li>
          ))}
        </div>
      </ul>

      <div className="flex flex-col gap-0.5">
        <p className="font-bold">Alergenicos</p>
        <p className="text-sm mt-0.5">{data.menu_allergens ? data.menu_allergens.toUpperCase() : 'NÃO POSSUI'}</p>
      </div>
    </div>
  )
}