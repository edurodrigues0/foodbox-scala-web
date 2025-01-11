import { ReactNode } from "react";
import { Card as CardShadcn, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export interface CardProps {
  children: ReactNode,
  title: string
  description: string
}

export function Card({ title, description, children }: CardProps) {
  return (
    <CardShadcn className="h-[600px] w-[350px]">
      <CardHeader>
        <CardTitle>{ title }</CardTitle>
        <CardDescription>{ description }</CardDescription>
      </CardHeader>
      <CardContent>
        { children }
      </CardContent>
    </CardShadcn>
  )
}