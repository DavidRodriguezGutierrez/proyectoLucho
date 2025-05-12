import { ProductoPuntodeventa } from "@mappnext/client";
export interface Props {
  productoPuntoDeVenta: ProductoPuntodeventa[];
}

export interface ProductoPuntoDeVentaFormateado
  extends Omit<ProductoPuntodeventa, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}
