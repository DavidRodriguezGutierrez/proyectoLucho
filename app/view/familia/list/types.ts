import { Familia } from "@mappnext/client";
export interface Props {
  familia: Familia[];
}

export interface FamiliaFormateado
  extends Omit<Familia, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}
