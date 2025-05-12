"use client";
import * as React from "react";
import * as yup from "yup";
import { toast } from "sonner";
import Input from "@mappnext/ds-tw/atoms/Input";
import GenericForm from "@mappnext/ds-tw/templates/GenericForm";
import { Card, CardContent } from "@mappnext/ds-tw/molecules/Card";
import { Button } from "@mappnext/ds-tw/atoms/Button";
import { useRouter } from "next/navigation";
import { IPresentacionCreateProps } from "./types";
import { createPresentacion } from "@/app/actions/presentacion-actions";

const validationSchema = yup.object({
  nombre: yup.string().required("Campo requerido"),
  cantidad: yup.number().required("Campo requerido"),
});

export default function PresentacionCreate({
  medidas,
}: IPresentacionCreateProps) {
  const router = useRouter();

  const handleSubmit = async (
    values: yup.InferType<typeof validationSchema>
  ) => {
    try {
      const result = await createPresentacion(values);
      if (!result) throw new Error("Error al crear");
      toast.success("Presentacion creado con éxito");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/view/presentacion/list");
    } catch {
      toast.error("Error al crear el presentacion");
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

          <div className="flex justify-end" style={{ marginTop: "10px" }}>
            <Button
              color="red"
              icon="delete"
              variant="destructive"
              iconPosition="left"
              onClick={() => router.push("/view/presentacion/list")}
              style={{ marginRight: "10px" }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              icon="save"
              title="Crear presentación"
            >
              Guardar
            </Button>
          </div>
        </GenericForm>
      </CardContent>
    </Card>
  );
}
