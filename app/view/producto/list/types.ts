import { Productos } from "@mappnext/client";
export interface Props {
  productos: Productos[];
}

export interface ProductoFormateado
  extends Omit<Productos, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}
