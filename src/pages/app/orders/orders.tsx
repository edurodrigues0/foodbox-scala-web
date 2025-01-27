import { OrdersCard } from "./orders-card"

const units = [
  {
    name: "Unidade II",
    sectors: [
      {
        name: "Higienização",
        lunchboxesOfMorningAmount: 10,
        lunchboxesOfAfternoonAmount: 8,
        lunchboxesOfNightAmount: 4
      },
      {
        name:"Embalagem Secundária",
        lunchboxesOfMorningAmount: 8,
        lunchboxesOfAfternoonAmount: 3,
        lunchboxesOfNightAmount: 5
      },
      {
        name: "Maturação de Parmesão",
        lunchboxesOfMorningAmount: 34,
      },
      {
        name: "Maturação de Colonial",
        lunchboxesOfMorningAmount: 22,
      },
    ],
  },
  {
    name: "SCL",
    sectors: [
      {
        name: "Produção",
        lunchboxesOfMorningAmount: 40,
        lunchboxesOfAfternoonAmount: 35,
        lunchboxesOfNightAmount: 25
      },
      { name: "Administrativo",
        lunchboxesOfMorningAmount: 15,
        lunchboxesOfAfternoonAmount: 10,
        lunchboxesOfNightAmount: 3
      },
      { name: "Logística",
        lunchboxesOfMorningAmount: 25,
        lunchboxesOfAfternoonAmount: 20,
        lunchboxesOfNightAmount: 15
      },
    ],
  },
]

export function Orders() {
  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold tracking-tighter">
          Pedidos
        </h1>

        <div className="grid grid-cols-2 gap-4">
          { units.map((unit) => {
            return (
              <OrdersCard key={unit.name} unit={unit} />
            )
          })}
        </div>
      </div>
    </div>
  )
}