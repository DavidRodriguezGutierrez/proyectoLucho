"use client";
import * as React from "react";
import * as yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Input from "@mappnext/ds-tw/atoms/Input";
import GenericForm from "@mappnext/ds-tw/templates/GenericForm";
import { Card, CardContent } from "@mappnext/ds-tw/molecules/Card";
import { Button } from "@mappnext/ds-tw/atoms/Button";
import {
  editPresentacion,
  GetPresentacion,
} from "@/app/actions/presentacion-actions";
import { IPresentacionUpdateProps } from "./types";

const validationSchema = yup.object({
  nombre: yup.string().required("Campo requerido"),
  cantidad: yup.number().required("Campo requerido"),
});

export default function PresentacionEdit({
  medidas,
}: IPresentacionUpdateProps) {
  const { id } = useParams();
  const router = useRouter();

  const [initialValues, setInitialValues] = React.useState({
    nombre: "",
    cantidad: 0,
  });

  React.useEffect(() => {
    if (id) {
      GetPresentacion(id.toString()).then((data) => {
        if (data) {
          setInitialValues({
            nombre: data.nombre || "",
            cantidad: data.cantidad || 0,
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
        await editPresentacion(id.toString(), values);
      } else {
        throw new Error("ID no definido");
      }
      toast.success("Presentación actualizado con éxito");
      await new Promise((res) => setTimeout(res, 1000));
      router.push("/view/presentacion/list");
    } catch {
      toast.error("Error al actualizar el presentación");
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
                label="Nombre del presentación"
                name="nombre"
                placeholder="Ingrese el nombre"
              />
            </div>
            <div className="flex-1 min-w-[390px] mr-6">
              <Input
                label="Cantidad"
                name="cantidad"
                placeholder="Ingrese la cantidad"
              />
            </div>
            <div className="flex-1 min-w-[390px]">
              <Input
                label="Medida"
                className="w-full"
                name="medida"
                options={medidas}
                placeholder="Ingrese la medida"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              type="button"
              color="red"
              icon="arrow-left"
              variant="destructive"
              onClick={() => router.push("/view/presentacion/list")}
              style={{ marginRight: "10px" }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              icon="save"
              title="Actualizar producto"
            >
              Guardar
            </Button>
          </div>
        </GenericForm>
      </CardContent>
    </Card>
  );
}
