"use client";
import * as React from "react";
import * as yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Input from "@mappnext/ds-tw/atoms/Input";
import GenericForm from "@mappnext/ds-tw/templates/GenericForm";
import { Card, CardContent } from "@mappnext/ds-tw/molecules/Card";
import { Button } from "@mappnext/ds-tw/atoms/Button";
import { editCiudad, GetCiudad } from "@/app/actions/ciudad-actions";
import { ICiudadesUpdateProps } from "./types";

const validationSchema = yup.object({
  nombre: yup.string().required("Campo requerido"),
  departamento: yup.string().required("Campo requerido"),
  codigo: yup.string().required("Campo requerido"),
});

export default function CiudadEdit({ departamentos }: ICiudadesUpdateProps) {
  const { id } = useParams();
  const router = useRouter();

  const [initialValues, setInitialValues] = React.useState({
    nombre: "",
    departamento: "",
    codigo: "",
  });

  React.useEffect(() => {
    if (id) {
      GetCiudad(id.toString()).then((data) => {
        if (data) {
          setInitialValues({
            nombre: data.nombre || "",
            departamento: data.departamento ? String(data.departamento) : "",
            codigo: data.codigo || "",
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
        await editCiudad(id.toString(), {
          ...values,
          departamento: Number(values.departamento),
        });
      } else {
        throw new Error("ID no definido");
      }
      toast.success("Ciudad actualizada con éxito");
      await new Promise((res) => setTimeout(res, 1000));
      router.push("/view/ciudad/list");
    } catch {
      toast.error("Error al actualizar la ciudad");
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
                label="Nombre de la ciudad"
                name="nombre"
                placeholder="Ingrese el nombre"
              />
            </div>
            <div className="flex-1 min-w-[390px]">
              <Input
                label="Departamento"
                className="w-full"
                name="departamento"
                options={departamentos}
                placeholder="Ingrese el departamento"
              />
            </div>

            <div className="flex-1 min-w-[390px] mr-6">
              <Input
                label="Código de la ciudad"
                name="codigo"
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
              onClick={() => router.push("/view/ciudad/list")}
              style={{ marginRight: "10px" }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              icon="save"
              title="Actualizar ciudad"
            >
              Guardar
            </Button>
          </div>
        </GenericForm>
      </CardContent>
    </Card>
  );
}
