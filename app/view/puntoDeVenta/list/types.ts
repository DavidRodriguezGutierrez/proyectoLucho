import { Puntodeventa } from "@mappnext/client";
export interface Props {
  puntoDeVenta: Puntodeventa[];
}

export interface PuntoDeVentaFormateado
  extends Omit<Puntodeventa, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}
