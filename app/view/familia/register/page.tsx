import Typography from "@mappnext/ds-tw/atoms/Typography";
import FamiliaCrear from "./index";

export default function FamiliaRegistroPage() {
  return (
    <div className="container mx-auto py-4">
      <Typography
        color="primary"
        size="xl"
        weight="light"
        style={{ marginBottom: "1rem", margin: "10px" }}
      >
        Crear familia
      </Typography>
      <FamiliaCrear />
    </div>
  );
}
