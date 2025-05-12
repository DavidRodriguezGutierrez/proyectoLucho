import Typography from "@mappnext/ds-tw/atoms/Typography";
import MedidaCrear from "./index";

export default function MedidaRegistroPage() {
  return (
    <div className="container mx-auto py-4">
      <Typography
        color="primary"
        size="xl"
        weight="light"
        style={{ marginBottom: "1rem", margin: "10px" }}
      >
        Crear medida
      </Typography>
      <MedidaCrear />
    </div>
  );
}
