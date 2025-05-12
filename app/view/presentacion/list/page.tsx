import Typography from "@mappnext/ds-tw/atoms/Typography";
import { formatFullDate } from "@/lib";
import PresentacionDataTable from "./index";
import { getPresentacions } from "@/app/actions/presentacion-actions";
import { PresentacionFormateado } from "./types";

export default async function PresentacionListPage() {
  const data = await getPresentacions();

  const presentacion: PresentacionFormateado[] = (data || []).map(
    (presentacion) => ({
      ...presentacion,
      createdAt: formatFullDate(presentacion.createdAt || ""),
      updatedAt: formatFullDate(presentacion.updatedAt || ""),
    })
  );

  return (
    <div className="container mx-auto py-4">
      <Typography
        color="primary"
        size="xl"
        weight="light"
        style={{ marginBottom: "1rem", margin: "10px" }}
      >
        Lista de Presentaciones
      </Typography>
      <PresentacionDataTable presentacion={presentacion} />
    </div>
  );
}
