import Typography from "@mappnext/ds-tw/atoms/Typography";
import { formatFullDate } from "@/lib";
import TipoMarcaDataTable from "./index";
import { getTipo_marca } from "@/app/actions/tipo-marca-actions";
import { TipoMarcaFormateado } from "./types";

export default async function TipoMarcaListPage() {
  const data = await getTipo_marca();

  const tipoMarca: TipoMarcaFormateado[] = (data || []).map((tipoMarca) => ({
    ...tipoMarca,
    createdAt: formatFullDate(tipoMarca.createdAt || ""),
    updatedAt: formatFullDate(tipoMarca.updatedAt || ""),
  }));

  return (
    <div className="container mx-auto py-4">
      <Typography
        color="primary"
        size="xl"
        weight="light"
        style={{ marginBottom: "1rem", margin: "10px" }}
      >
        Lista de tipo marcas
      </Typography>
      <TipoMarcaDataTable tipoMarca={tipoMarca} />
    </div>
  );
}
