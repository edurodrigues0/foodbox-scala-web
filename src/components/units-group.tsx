import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export interface Unit {
  unit_id: string
  unit_name: string
  unit_code: number
  restaurant_id: string | null
  restaurant_name: string | null
}

export interface UnitsGroupProps {
  units: Unit[]
  onSelectUnit: (unitId: string) => void
}

export function UnitsGroup({ units, onSelectUnit }: UnitsGroupProps) {
  const getIconForUnit = (unit: number) => {
    switch (unit) {
      case 1:
        return "I"
      case 2:
        return "II"
      case 3:
        return "III"
      case 4:
        return "IV"
      case 5:
        return "SCL"
      default:
        return null
    }
  }

  return (
    <ToggleGroup type="single" className="space-x-4">
      { units.map((unit) => {
        return (
          <ToggleGroupItem
            key={unit.unit_id}
            value={unit.unit_id}
            onClick={() => onSelectUnit(unit.unit_id)}
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <span className="text-sm">
              {getIconForUnit(unit.unit_code)}
            </span>
          </ToggleGroupItem>
        )
      })}
    </ToggleGroup>
  )
}