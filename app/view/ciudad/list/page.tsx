import Typography from "@mappnext/ds-tw/atoms/Typography";
import { formatFullDate } from "@/lib";
import { CiudadFormateado } from "./types";
import AlmacenDataTable from "./index";
import { getCiudad } from "@/app/actions/ciudad-actions";

export default async function CiudadListPage() {
  const data = await getCiudad();

  const ciudad: CiudadFormateado[] = (data || []).map((ciudad) => ({
    ...ciudad,
    createdAt: formatFullDate(ciudad.createdAt || ""),
    updatedAt: formatFullDate(ciudad.updatedAt || ""),
  }));

  return (
    <div className="container mx-auto py-4">
      <Typography
        color="primary"
        size="xl"
        weight="light"
        style={{ marginBottom: "1rem", margin: "10px" }}
      >
        Lista de ciudades
      </Typography>
      <AlmacenDataTable ciudad={ciudad} />
    </div>
  );
}
