"use client";
import * as React from "react";
import * as yup from "yup";
import { toast } from "sonner";
import Input from "@mappnext/ds-tw/atoms/Input";
import GenericForm from "@mappnext/ds-tw/templates/GenericForm";
import { Card, CardContent } from "@mappnext/ds-tw/molecules/Card";
import { Button } from "@mappnext/ds-tw/atoms/Button";
import { useRouter } from "next/navigation";
import { createAlmacen } from "@/app/actions/almacen-actions";
import { IAlmacenCreateProps } from "./types";

// Validación Yup
const validationSchema = yup.object({
  nombre: yup.string().required("Campo requerido"),
  direccion: yup.string().required("Campo requerido"),
  coordenada: yup.string().required("Campo requerido"),
  ciudad: yup.string().required("Campo requerido"),
});

export default function AlmacenCreate({ ciudades }: IAlmacenCreateProps) {
  const router = useRouter();

  const handleSubmit = async (
    values: yup.InferType<typeof validationSchema>
  ) => {
    try {
      const result = await createAlmacen({
        ...values,
        ciudad: parseInt(values.ciudad),
      });
      if (!result) throw new Error("Error al crear");
      toast.success("Almacen creado con éxito");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/view/almacen/list");
    } catch {
      toast.error("Error al crear el almacen");
      return { success: false };
    }
  };

  return (
    <Card>
      <CardContent className="w-full max-w-7xl mx-auto p-4">
        <GenericForm
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="flex flex-wrap gap-y-6" style={{ gap: "2%" }}>
            <div className="flex-1 min-w-[390px] mr-6">
              <Input
                label="Nombre del almacen"
                name="nombre"
                placeholder="Ingrese el nombre"
              />
            </div>
            <div className="flex-1 min-w-[390px] mr-6">
              <Input
                label="Dirección"
                name="direccion"
                placeholder="Ingrese la dirección"
              />
            </div>
            <div className="flex-1 min-w-[390px]">
              <Input
                label="Coordenada"
                name="coordenada"
                placeholder="Ingrese la coordenada"
              />
            </div>
            <div className="flex-1 min-w-[390px]">
              <Input
                label="Ciudad"
                className="w-full"
                name="ciudad"
                options={ciudades}
                placeholder="Ingrese la coordenada"
              />
            </div>
          </div>

          <div className="flex justify-end" style={{ marginTop: "15px" }}>
            <Button
              color="red"
              icon="delete"
              variant="destructive"
              iconPosition="left"
              onClick={() => router.push("/view/almacen/list")}
              style={{ marginRight: "10px" }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              icon="save"
              title="Crear almacen"
            >
              Guardar
            </Button>
          </div>
        </GenericForm>
      </CardContent>
    </Card>
  );
}
