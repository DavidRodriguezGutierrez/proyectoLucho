import Typography from "@mappnext/ds-tw/atoms/Typography";
import { formatFullDate } from "@/lib";
import UsuarioDataTable from "./index";
import { UsuarioFormateado } from "./types";
import { getUsuarios } from "@/app/actions/usuario-actions";

export default async function UsuarioListPage() {
  const data = await getUsuarios();

  const usuario: UsuarioFormateado[] = (data || []).map((usuario) => ({
    ...usuario,
    createdAt: formatFullDate(usuario.createdAt || ""),
    updatedAt: formatFullDate(usuario.updatedAt || ""),
  }));

  return (
    <div className="container mx-auto py-4">
      <Typography
        color="primary"
        size="xl"
        weight="light"
        style={{ marginBottom: "1rem", margin: "10px" }}
      >
        Lista de usuarios
      </Typography>
      <UsuarioDataTable usuario={usuario} />
    </div>
  );
}
