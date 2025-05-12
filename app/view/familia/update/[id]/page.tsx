import Typography from "@mappnext/ds-tw/atoms/Typography";
import FamiliaEdit from "./index";

export default function FamiliaUpdatePage() {
  return (
    <div className="container mx-auto py-4">
      <Typography
        color="primary"
        size="xl"
        weight="light"
        style={{ marginBottom: "1rem", margin: "10px" }}
      >
        Actualizar familia
      </Typography>
      <FamiliaEdit />
    </div>
  );
}
