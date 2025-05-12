import Typography from "@mappnext/ds-tw/atoms/Typography";
import { formatFullDate } from "@/lib";
import MedidaDataTable from "./index";
import { getMedidas } from "@/app/actions/medida-action";
import { MedidaFormateado } from "./types";

export default async function MedidaListPage() {
  const data = await getMedidas();

  const medida: MedidaFormateado[] = (data || []).map((medida) => ({
    ...medida,
    createdAt: formatFullDate(medida.createdAt || ""),
    updatedAt: formatFullDate(medida.updatedAt || ""),
  }));

  return (
    <div className="container mx-auto py-4">
      <Typography
        color="primary"
        size="xl"
        weight="light"
        style={{ marginBottom: "1rem", margin: "10px" }}
      >
        Lista de medida
      </Typography>
      <MedidaDataTable medida={medida} />
    </div>
  );
}
