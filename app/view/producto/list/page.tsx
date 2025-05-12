import Typography from "@mappnext/ds-tw/atoms/Typography";
import ProductoDataTable from "./index";
import { formatFullDate } from "@/lib";
import { getProductos } from "@/app/actions/producto-actions";
import { ProductoFormateado } from "./types";

export default async function ProductoListPage() {
  const data = await getProductos();

  const productos: ProductoFormateado[] = (data || []).map((producto) => ({
    ...producto,
    createdAt: formatFullDate(producto.createdAt || ""),
    updatedAt: formatFullDate(producto.updatedAt || ""),
  }));

  return (
    <div className="container mx-auto py-4">
      <Typography
        color="primary"
        size="xl"
        weight="light"
        style={{ marginBottom: "1rem", margin: "10px" }}
      >
        Lista de productos
      </Typography>
      <ProductoDataTable productos={productos} />
    </div>
  );
}
