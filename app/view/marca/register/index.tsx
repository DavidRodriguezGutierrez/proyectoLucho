"use client";
import * as React from "react";
import * as yup from "yup";
import { toast } from "sonner";
import Input from "@mappnext/ds-tw/atoms/Input";
import GenericForm from "@mappnext/ds-tw/templates/GenericForm";
import { Card, CardContent } from "@mappnext/ds-tw/molecules/Card";
import { Button } from "@mappnext/ds-tw/atoms/Button";
import { useRouter } from "next/navigation";
import { createMarca } from "@/app/actions/marca-actions";
import { IMarcaCreateProps } from "./types";

// Validación Yup
const validationSchema = yup.object({
  nombre: yup.string().required("Campo requerido"),
  tipo_marca: yup.string().required("Campo requerido"),
});

export default function MarcaCreate({ tiposMarcas }: IMarcaCreateProps) {
  const router = useRouter();

  const handleSubmit = async (
    values: yup.InferType<typeof validationSchema>
  ) => {
    try {
      const result = await createMarca({
        ...values,
        tipo_marca: parseInt(values.tipo_marca),
      });
      if (!result) throw new Error("Error al crear");
      toast.success("Marca creado con éxito");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/view/marca/list");
    } catch {
      toast.error("Error al crear el marca");
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
                label="Nombre del marca"
                name="nombre"
                placeholder="Ingrese el nombre"
              />
            </div>
            <div className="flex-1 min-w-[390px]">
              <Input
                label="Tipo de marca"
                name="tipo_marca"
                className="w-full"
                options={tiposMarcas}
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
              onClick={() => router.push("/view/marca/list")}
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
