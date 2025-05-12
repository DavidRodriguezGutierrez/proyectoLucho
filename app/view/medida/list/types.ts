import {Medida } from "@mappnext/client";
export interface Props {
  medida:Medida[];
}

export interface MedidaFormateado
  extends Omit<Medida, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}
