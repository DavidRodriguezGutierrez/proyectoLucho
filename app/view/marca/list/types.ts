import { Marca } from "@mappnext/client";
export interface Props {
  marca: Marca[];
}

export interface MarcaFormateado
  extends Omit<Marca, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}
