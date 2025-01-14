import { X } from "lucide-react";

export interface AccompanimentsProps {
  title: string
  onRemoveAccompaniment: (accompaniment: string) => void
}

export function Accompaniments({
  title,
  onRemoveAccompaniment,
}: AccompanimentsProps) {
  const formattedTitle = title[0].toUpperCase() + title.substring(1)

  return (
    <div className="px-2 py-1 flex items-center justify-center bg-primary text-primary-foreground rounded-md">
      <span className="text-xs font-bold">
        { formattedTitle }
      </span>

      <button onClick={() => onRemoveAccompaniment(title)}>
        <X className="w-4 h-4 ml-2" />
      </button>
    </div>
  )
}