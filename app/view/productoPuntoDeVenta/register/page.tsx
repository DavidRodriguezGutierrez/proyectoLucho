import Typography from "@mappnext/ds-tw/atoms/Typography";
import ProductoPuntoVenta from "./index";
import { getProductos } from "@/app/actions/producto-actions";
import { getPuntoVentas } from "@/app/actions/punto-venta-actions";

export default async function ProductoPuntoDeVentaRegisterPage() {
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
        Crear Punto de Venta
      </Typography>
      <ProductoPuntoVenta puntoVentas={puntoVentas} productos={productos} />
    </div>
  );
}
