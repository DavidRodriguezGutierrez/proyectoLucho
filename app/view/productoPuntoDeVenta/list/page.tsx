import Typography from "@mappnext/ds-tw/atoms/Typography";
import { formatFullDate } from "@/lib";
import { ProductoPuntoDeVentaFormateado } from "./types";
import ProductoPuntoVentaDataTable from "./index";
import { getProductoPuntoVentas } from "@/app/actions/producto-puntoventa-actions";

export default async function ProductoPuntoVentaListPage() {
  const data = await getProductoPuntoVentas();

  const productoPuntoDeVenta: ProductoPuntoDeVentaFormateado[] = (
    data || []
  ).map((productoPuntoDeVenta) => ({
    ...productoPuntoDeVenta,
    createdAt: formatFullDate(productoPuntoDeVenta.createdAt || ""),
    updatedAt: formatFullDate(productoPuntoDeVenta.updatedAt || ""),
  }));

  return (
    <div className="container mx-auto py-4">
      <Typography
        color="primary"
        size="xl"
        weight="light"
        style={{ marginBottom: "1rem", margin: "10px" }}
      >
        Lista de productos por punto de venta
      </Typography>
      <ProductoPuntoVentaDataTable
        productoPuntoDeVenta={productoPuntoDeVenta}
      />
    </div>
  );
}
