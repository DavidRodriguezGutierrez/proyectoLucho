import Typography from "@mappnext/ds-tw/atoms/Typography";
import UsuarioEdit from "./index";

export default function UsuarioUpdatePage() {
  return (
    <div className="container mx-auto py-4">
      <Typography
        color="primary"
        size="xl"
        weight="light"
        style={{ marginBottom: "1rem", margin: "10px" }}
      >
        Actualizar usuario
      </Typography>
      <UsuarioEdit />
    </div>
  );
}
