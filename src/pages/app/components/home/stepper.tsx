import { MapPin, User, UtensilsCrossed } from "lucide-react";

interface StepperProps {
  step: number
}

export function Stepper({ step }: StepperProps) {
  return (
    <div className = "flex justify-center mb-8" >
      <div className="flex items-center">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
        >
          <MapPin size={20} />
        </div>
        <div className={`h-1 w-12 ${step > 1 ? "bg-primary" : "bg-muted"}`}></div>
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
        >
          <UtensilsCrossed size={20} />
        </div>
        <div className={`h-1 w-12 ${step > 2 ? "bg-primary" : "bg-muted"}`}></div>
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
        >
          <User size={20} />
        </div>
      </div>
        </div >
  )
}