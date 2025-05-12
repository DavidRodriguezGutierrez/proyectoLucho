import { Ciudad } from "@mappnext/client";
export interface Props {
  ciudad: Ciudad[];
}

export interface CiudadFormateado
  extends Omit<Ciudad, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}
