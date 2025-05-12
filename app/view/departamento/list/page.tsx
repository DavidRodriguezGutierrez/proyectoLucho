import Typography from "@mappnext/ds-tw/atoms/Typography";
import { formatFullDate } from "@/lib";
import { getDepartamentos } from "@/app/actions/departamento-actions";
import { DepartamentoFormateado } from "./types";
import DepartamentoDataTable from "./index";

export default async function DepartamentoListPage() {
  const data = await getDepartamentos();

  const departamento: DepartamentoFormateado[] = (data || []).map(
    (departamento) => ({
      ...departamento,
      createdAt: formatFullDate(departamento.createdAt || ""),
      updatedAt: formatFullDate(departamento.updatedAt || ""),
    })
  );

  return (
    <div className="container mx-auto py-4">
      <Typography
        color="primary"
        size="xl"
        weight="light"
        style={{ marginBottom: "1rem", margin: "10px" }}
      >
        Lista de departamentos
      </Typography>
      <DepartamentoDataTable departamento={departamento} />
    </div>
  );
}
