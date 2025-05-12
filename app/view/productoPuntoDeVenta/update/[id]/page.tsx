import Typography from "@mappnext/ds-tw/atoms/Typography";
import ProductoPuntoDeVentaEdit from "./index";
import { getProductos } from "@/app/actions/producto-actions";
import { getPuntoVentas } from "@/app/actions/punto-venta-actions";

export default async function PuntoDeVentaUpdatePage() {
  const productos = await getProductos()
    .then((data) =>
      data.map((producto) => ({
        value: producto?.id?.toString() ?? "",
        label: producto.nombre ?? "",
      }))
    )
    .catch(() => []);
  const puntoVentas = await getPuntoVentas()
    .then((data) =>
      data.map((puntoVentas) => ({
        value: puntoVentas?.id?.toString() ?? "",
        label: puntoVentas.nombre ?? "",
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
        Actualizar producto por punto
      </Typography>
      <ProductoPuntoDeVentaEdit
        productos={productos}
        puntoVentas={puntoVentas}
      />
    </div>
  );
}
