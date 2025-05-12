import Typography from "@mappnext/ds-tw/atoms/Typography";
import { formatFullDate } from "@/lib";
import FamiliaDataTable from "./index";
import { getFamilias } from "@/app/actions/familia-action";
import { FamiliaFormateado } from "./types";

export default async function FamiliaListPage() {
  const data = await getFamilias();

  const familia: FamiliaFormateado[] = (data || []).map((familia) => ({
    ...familia,
    createdAt: formatFullDate(familia.createdAt || ""),
    updatedAt: formatFullDate(familia.updatedAt || ""),
  }));

  return (
    <div className="container mx-auto py-4">
      <Typography
        color="primary"
        size="xl"
        weight="light"
        style={{ marginBottom: "1rem", margin: "10px" }}
      >
        Lista de Familias
      </Typography>
      <FamiliaDataTable familia={familia} />
    </div>
  );
}
