import { Utensils } from "lucide-react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { CardHeader } from "./ui/card";

export function DayOrdersAmountCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Pedidos (dia)
        </CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          18
        </span>
        <p className="text-xs text-muted-foreground">Em todas as unidades</p>
      </CardContent>
    </Card>
  )
}