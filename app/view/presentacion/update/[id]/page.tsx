import Typography from "@mappnext/ds-tw/atoms/Typography";
import PresentationEdit from "./index";
import { getMedidas } from "@/app/actions/medida-action";

export default async function PresentacionUpdatePage() {
  const medidas = await getMedidas()
    .then((data) =>
      data.map((medida) => ({
        value: medida?.id?.toString() ?? "",
        label: medida.nombre ?? "",
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
        Actualizar presentación
      </Typography>
      <PresentationEdit medidas={medidas} />
    </div>
  );
}
