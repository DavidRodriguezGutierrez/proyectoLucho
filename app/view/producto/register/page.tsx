import Typography from "@mappnext/ds-tw/atoms/Typography";
import { getFamilias } from "@/app/actions/familia-action";
import { getMarcas } from "@/app/actions/marca-actions";
import { getPresentaciones } from "@/app/actions/presentacion-actions";
import ProductoCreate from "./index";

export default async function ProductoRegisterPage() {
  const presentaciones = await getPresentaciones()
    .then((data) =>
      data.map((presentaciones) => ({
        value: presentaciones?.id?.toString() ?? "",
        label: presentaciones.nombre ?? "",
      }))
    )
    .catch(() => []);
  const families = await getFamilias()
    .then((data) =>
      data.map((familia) => ({
        value: familia?.id?.toString() ?? "",
        label: familia.nombre ?? "",
      }))
    )
    .catch(() => []);

  const marcas = await getMarcas()
    .then((data) =>
      data.map((marca) => ({
        value: marca?.id?.toString() ?? "",
        label: marca.nombre ?? "",
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
        Crear producto
      </Typography>
      <ProductoCreate
        presentaciones={presentaciones}
        families={families}
        marcas={marcas}
      />
    </div>
  );
}
