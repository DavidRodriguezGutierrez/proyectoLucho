"use client";
import * as React from "react";
import * as yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Input from "@mappnext/ds-tw/atoms/Input";
import GenericForm from "@mappnext/ds-tw/templates/GenericForm";
import { Card, CardContent } from "@mappnext/ds-tw/molecules/Card";
import { Button } from "@mappnext/ds-tw/atoms/Button";
import { editFamilia, GetFamilia } from "@/app/actions/familia-action";

const validationSchema = yup.object({
  nombre: yup.string().required("Campo requerido"),
});

export default function FamiliaEdit() {
  const { id } = useParams();
  const router = useRouter();
  const [initialValues, setInitialValues] = React.useState({
    nombre: "",
  });

  React.useEffect(() => {
    if (id) {
      GetFamilia(id.toString()).then((data) => {
        if (data) {
          setInitialValues({
            nombre: data.nombre || "",
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
        await editFamilia(id.toString(), values);
      } else {
        throw new Error("ID no definido");
      }
      toast.success("Familia actualizado con éxito");
      await new Promise((res) => setTimeout(res, 1000));
      router.push("/view/familia/list");
    } catch {
      toast.error("Error al actualizar el familia");
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
          <div className="flex flex-wrap gap-y-4">
            <div className="flex-2 min-w-[400px] mr-6">
              <Input
                label="Nombre del familia"
                name="nombre"
                type="text"
                placeholder="Ingrese el nombre"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              type="button"
              color="red"
              icon="arrow-left"
              variant="destructive"
              onClick={() => router.push("/view/familia/list")}
              style={{ marginRight: "10px" }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              icon="save"
              title="Actualizar familia"
            >
              Guardar
            </Button>
          </div>
        </GenericForm>
      </CardContent>
    </Card>
  );
}
