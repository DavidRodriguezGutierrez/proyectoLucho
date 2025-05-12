import Typography from "@mappnext/ds-tw/atoms/Typography";
import MarcaCreate from "./index";
import { getTipo_marca } from "@/app/actions/tipo-marca-actions";

export default async function MarcaRegisterPage() {
  const tiposMarcas = await getTipo_marca()
    .then((data) =>
      data.map((tipoMarca) => ({
        value: tipoMarca?.id?.toString() ?? "",
        label: tipoMarca.nombre ?? "",
      }))
    )
    .catch(() => []);
  return (
    <div className="container mx-auto py-4">
      <Typography
        color="primary"
        size="xl"
        weight="light"
        style={{ marginBottom: "1rem", margin: "10px" }}
      >
        Crear Marca
      </Typography>
      <MarcaCreate tiposMarcas={tiposMarcas} />
    </div>
  );
}
