import { DayOrdersAmountCard } from "@/components/day-orders-amount-card";
import { DayOrdersOnUnit } from "@/components/day-orders-on-unit";

export function Dashboard() {
  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold tracking-tighter">
          Dashboard
        </h1>

        <div className="grid grid-cols-4 gap-4">
          <DayOrdersAmountCard />
          <DayOrdersOnUnit />
          <DayOrdersOnUnit />
          <DayOrdersOnUnit />
        </div>
      </div>
    </div>
  )
}