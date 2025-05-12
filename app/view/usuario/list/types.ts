import { User } from "@mappnext/client";
export interface Props {
  usuario: User[];
}

export interface UsuarioFormateado
  extends Omit<User, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}
