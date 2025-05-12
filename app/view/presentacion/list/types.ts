import { Presentacion } from "@mappnext/client";
export interface Props {
  presentacion: Presentacion[];
}

export interface PresentacionFormateado
  extends Omit<Presentacion, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}
