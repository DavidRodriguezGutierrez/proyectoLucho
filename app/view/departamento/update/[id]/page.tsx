import Typography from "@mappnext/ds-tw/atoms/Typography";
import DepartamentoEditar from ".";

export default function DepartamentoUpdatePage() {
  return (
    <div className="container mx-auto py-4">
      <Typography
        color="primary"
        size="xl"
        weight="light"
        style={{ marginBottom: "1rem", margin: "10px" }}
      >
        Actualizar departamento
      </Typography>
      <DepartamentoEditar />
    </div>
  );
}
