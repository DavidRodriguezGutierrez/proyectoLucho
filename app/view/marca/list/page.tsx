import Typography from "@mappnext/ds-tw/atoms/Typography";
import { formatFullDate } from "@/lib";
import { MarcaFormateado } from "./types";
import AlmacenDataTable from "./index";
import { getMarcas } from "@/app/actions/marca-actions";

export default async function MarcaListPage() {
  const data = await getMarcas();

  const marca: MarcaFormateado[] = (data || []).map((marca) => ({
    ...marca,
    createdAt: formatFullDate(marca.createdAt || ""),
    updatedAt: formatFullDate(marca.updatedAt || ""),
  }));

  return (
    <div className="container mx-auto py-4">
      <Typography
        color="primary"
        size="xl"
        weight="light"
        style={{ marginBottom: "1rem", margin: "10px" }}
      >
        Lista de Marcas
      </Typography>
      <AlmacenDataTable marca={marca} />
    </div>
  );
}
