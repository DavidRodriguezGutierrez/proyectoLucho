import Typography from "@mappnext/ds-tw/atoms/Typography";
import CiudadEdit from "./index";
import { getDepartamentos } from "@/app/actions/departamento-actions";

export default async function CiudadUpdatePage() {
  const departamentos = await getDepartamentos()
    .then((data) =>
      data.map((departamento) => ({
        value: departamento?.id?.toString() ?? "",
        label: departamento.nombre ?? "",
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
        Actualizar ciudad
      </Typography>
      <CiudadEdit departamentos={departamentos} />
    </div>
  );
}
