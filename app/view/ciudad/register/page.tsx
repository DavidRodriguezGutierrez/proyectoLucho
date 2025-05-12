import Typography from "@mappnext/ds-tw/atoms/Typography";
import CiudadCreate from "./index";
import { getDepartamentos } from "@/app/actions/departamento-actions";

export default async function PuntoDeVentaRegisterPage() {
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
        Crear Ciudad
      </Typography>
      <CiudadCreate departamentos={departamentos} />
    </div>
  );
}
