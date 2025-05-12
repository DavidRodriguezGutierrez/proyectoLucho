import Typography from "@mappnext/ds-tw/atoms/Typography";
import TipoMarcaCrear from "./index";

export default function TipoMarcaRegistroPage() {
  return (
    <div className="container mx-auto py-4">
      <Typography
        color="primary"
        size="xl"
        weight="light"
        style={{ marginBottom: "1rem", margin: "10px" }}
      >
        Crear tipo marca
      </Typography>
      <TipoMarcaCrear />
    </div>
  );
}
