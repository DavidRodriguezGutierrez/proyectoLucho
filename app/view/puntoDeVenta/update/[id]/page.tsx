import Typography from "@mappnext/ds-tw/atoms/Typography";
import PuntoDeVentaEdit from "./index";
import { getAlmacen } from "@/app/actions/almacen-actions";

export default async  function PuntoDeVentaUpdatePage() {
  const almacens = await getAlmacen()
    .then((data) =>
      data.map((almacen) => ({
        value: almacen?.id?.toString() ?? "",
        label: almacen.nombre ?? "",
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
        Actualizar punto de venta
      </Typography>
      <PuntoDeVentaEdit almacens={almacens} />
    </div>
  );
}
