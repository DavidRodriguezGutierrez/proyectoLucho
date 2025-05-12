import Typography from "@mappnext/ds-tw/atoms/Typography";
import { formatFullDate } from "@/lib";
import { PuntoDeVentaFormateado } from "./types";
import AlmacenDataTable from "./index";
import { getPuntoVentas } from "@/app/actions/punto-venta-actions";

export default async function PuntoDeVentaListPage() {
  const data = await getPuntoVentas();

  const puntoDeVenta: PuntoDeVentaFormateado[] = (data || []).map(
    (puntoDeVenta) => ({
      ...puntoDeVenta,
      createdAt: formatFullDate(puntoDeVenta.createdAt || ""),
      updatedAt: formatFullDate(puntoDeVenta.updatedAt || ""),
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
        Lista de puntos de venta
      </Typography>
      <AlmacenDataTable puntoDeVenta={puntoDeVenta} />
    </div>
  );
}
