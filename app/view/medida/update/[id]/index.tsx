"use client";
import * as React from "react";
import * as yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Input from "@mappnext/ds-tw/atoms/Input";
import GenericForm from "@mappnext/ds-tw/templates/GenericForm";
import { Card, CardContent } from "@mappnext/ds-tw/molecules/Card";
import { Button } from "@mappnext/ds-tw/atoms/Button";
import { editMedida, GetMedida } from "@/app/actions/medida-action";

const validationSchema = yup.object({
  nombre: yup.string().required("Campo requerido"),
  simbolo: yup.string().required("Campo requerido"),
});

export default function MedidaEdit() {
  const { id } = useParams();
  const router = useRouter();
  const [initialValues, setInitialValues] = React.useState({
    nombre: "",
    simbolo: "",
  });

  React.useEffect(() => {
    if (id) {
      GetMedida(id.toString()).then((data) => {
        if (data) {
          setInitialValues({
            nombre: data.nombre || "",
            simbolo: data.simbolo || "",
          });
        }
      });
    }
  }, [id]);

  const handleSubmit = async (
    values: yup.InferType<typeof validationSchema>
  ) => {
    try {
      if (id) {
        await editMedida(id.toString(), values);
      } else {
        throw new Error("ID no definido");
      }
      toast.success("Medida actualizado con éxito");
      await new Promise((res) => setTimeout(res, 1000));
      router.push("/view/medida/list");
    } catch {
      toast.error("Error al actualizar el medida");
    }
  };

  return (
    <Card>
      <CardContent className="w-full max-w-7xl mx-auto p-4">
        <GenericForm
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialData={initialValues}
          className="space-y-6"
        >
          <div className="flex flex-wrap gap-y-6" style={{ gap: "2%" }}>
            <div className="flex-1 min-w-[390px] mr-6">
              <Input
                label="Nombre de medida"
                name="nombre"
                type="text"
                placeholder="Ingrese el nombre"
              />
            </div>
            <div className="flex-1 min-w-[390px] mr-6">
              <Input
                label="Símbolo"
                type="text"
                name="simbolo"
                placeholder="Ingrese el símbolo"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              type="button"
              color="red"
              icon="arrow-left"
              variant="destructive"
              onClick={() => router.push("/view/medida/list")}
              style={{ marginRight: "10px" }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              icon="save"
              title="Actualizar medida"
            >
              Guardar
            </Button>
          </div>
        </GenericForm>
      </CardContent>
    </Card>
  );
}
