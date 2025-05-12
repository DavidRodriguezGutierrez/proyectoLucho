import Typography from "@mappnext/ds-tw/atoms/Typography";
import { formatFullDate } from "@/lib";
import { getAlmacen } from "@/app/actions/almacen-actions";
import { AlmacenFormateado } from "./types";
import AlmacenDataTable from "./index";

export default async function AlmacenListPage() {
  const data = await getAlmacen();

  const almacen: AlmacenFormateado[] = (data || []).map((almacen) => ({
    ...almacen,
    createdAt: formatFullDate(almacen.createdAt || ""),
    updatedAt: formatFullDate(almacen.updatedAt || ""),
  }));

  return (
    <div className="container mx-auto py-4">
      <Typography
        color="primary"
        size="xl"
        weight="light"
        style={{ marginBottom: "1rem", margin: "10px" }}
      >
        Lista de Almacenes
      </Typography>
      <AlmacenDataTable almacen={almacen} />
    </div>
  );
}
