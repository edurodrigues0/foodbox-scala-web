import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Unit {
  name: string;
  sectors: {
    name: string;
    lunchboxesOfMorningAmount?: number;
    lunchboxesOfAfternoonAmount?: number;
    lunchboxesOfNightAmount?: number;
  }[];
}

export interface OrdersCardProps {
  unit: Unit;
}

export function OrdersCard({ unit }: OrdersCardProps) {
  const totalPerTurn = unit.sectors.reduce(
    (acc, sector) => ({
      morningAmount: acc.morningAmount + (sector.lunchboxesOfMorningAmount ?? 0),
      afternoonAmount: acc.afternoonAmount + (sector.lunchboxesOfAfternoonAmount ?? 0),
      nightAmount: acc.nightAmount + (sector.lunchboxesOfNightAmount ?? 0),
    }),
    { morningAmount: 0, afternoonAmount: 0, nightAmount: 0 }
  );

  const total =
    totalPerTurn.morningAmount +
    totalPerTurn.afternoonAmount +
    totalPerTurn.nightAmount;

  return (
    <Card>
      <CardHeader>{unit.name}</CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Setor</TableHead>
              <TableHead className="text-right">Manhã</TableHead>
              <TableHead className="text-right">Tarde</TableHead>
              <TableHead className="text-right">Noite</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {unit.sectors.map((sector) => {
              const sectorTotal =
                (sector.lunchboxesOfMorningAmount ?? 0) +
                (sector.lunchboxesOfAfternoonAmount ?? 0) +
                (sector.lunchboxesOfNightAmount ?? 0);

              return (
                <TableRow key={sector.name}>
                  <TableCell>{sector.name}</TableCell>
                  <TableCell className="text-right">
                    {sector.lunchboxesOfMorningAmount ?? 0}
                  </TableCell>
                  <TableCell className="text-right">
                    {sector.lunchboxesOfAfternoonAmount ?? 0}
                  </TableCell>
                  <TableCell className="text-right">
                    {sector.lunchboxesOfNightAmount ?? 0}
                  </TableCell>
                  <TableCell className="text-right">{sectorTotal}</TableCell>
                </TableRow>
              );
            })}

            <TableRow className="font-bold">
              <TableCell>Total</TableCell>
              <TableCell className="text-right">
                {totalPerTurn.morningAmount}
              </TableCell>
              <TableCell className="text-right">
                {totalPerTurn.afternoonAmount}
              </TableCell>
              <TableCell className="text-right">
                {totalPerTurn.nightAmount}
              </TableCell>
              <TableCell className="text-right">{total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
