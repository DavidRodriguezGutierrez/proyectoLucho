import { TipoMarca } from "@mappnext/client";
export interface Props {
  tipoMarca: TipoMarca[];
}

export interface TipoMarcaFormateado
  extends Omit<TipoMarca, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}
