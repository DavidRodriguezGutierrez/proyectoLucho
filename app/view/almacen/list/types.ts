import { Almacen } from "@mappnext/client";
export interface Props {
  almacen: Almacen[];
}

export interface AlmacenFormateado
  extends Omit<Almacen, "createdAt" | "updatedAt" | "ciudad"> {
  createdAt: string;
  updatedAt: string;
}
