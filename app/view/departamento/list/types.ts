import { Departamento } from "@mappnext/client";
export interface Props {
  departamento: Departamento[];
}

export interface DepartamentoFormateado
  extends Omit<Departamento, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}
