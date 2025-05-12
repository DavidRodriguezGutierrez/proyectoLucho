import Typography from "@mappnext/ds-tw/atoms/Typography";
import AlmacenEdit from ".";
import { getCiudad } from "@/app/actions/ciudad-actions";

export default async function AlmacenUpdatePage() {
  const ciudades = await getCiudad()
    .then((data) =>
      data.map((ciudad) => ({
        value: ciudad?.id?.toString() ?? "",
        label: ciudad.nombre ?? "",
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
        Actualizar almacén
      </Typography>
      <AlmacenEdit ciudades={ciudades} />
    </div>
  );
}
