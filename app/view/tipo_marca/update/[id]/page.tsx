import Typography from "@mappnext/ds-tw/atoms/Typography";
import TipoDemarcaEdit from "./index";

export default function TipoDeMarcaUpdatePage() {
  return (
    <div className="container mx-auto py-4">
      <Typography
        color="primary"
        size="xl"
        weight="light"
        style={{ marginBottom: "1rem", margin: "10px" }}
      >
        Actualizar tipo marca
      </Typography>
      <TipoDemarcaEdit />
    </div>
  );
}
