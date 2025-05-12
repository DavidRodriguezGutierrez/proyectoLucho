"use client";
import * as React from "react";
import * as yup from "yup";
import { toast } from "sonner";
import Input from "@mappnext/ds-tw/atoms/Input";
import GenericForm from "@mappnext/ds-tw/templates/GenericForm";
import { Card, CardContent } from "@mappnext/ds-tw/molecules/Card";
import { Button } from "@mappnext/ds-tw/atoms/Button";
import { useRouter } from "next/navigation";
import { createPuntoVenta } from "@/app/actions/punto-venta-actions";
import { IPuntoVentaCreateProps } from "./types";

// Validación Yup
const validationSchema = yup.object({
  nombre: yup.string().required("Campo requerido"),
  almacen: yup.string().required("Campo requerido"),
});

export default function PuntoDeVentaCreate({
  almacens,
}: IPuntoVentaCreateProps) {
  const router = useRouter();

  const handleSubmit = async (
    values: yup.InferType<typeof validationSchema>
  ) => {
    try {
      const result = await createPuntoVenta({
        ...values,
        almacen: parseInt(values.almacen),
      });
      if (!result) throw new Error("Error al crear");
      toast.success("Punto de venta creado con éxito");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/view/puntoDeVenta/list");
    } catch {
      toast.error("Error al crear el punto de venta");
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
                label="Nombre del punto de venta"
                name="nombre"
                placeholder="Ingrese el nombre"
              />
            </div>
            <div className="flex-1 min-w-[390px]">
              <Input
                label="Almacen"
                className="w-full"
                name="almacen"
                options={almacens}
                placeholder="Ingrese la almacen"
              />
            </div>
          </div>

          <div className="flex justify-end" style={{ marginTop: "15px" }}>
            <Button
              color="red"
              icon="delete"
              variant="destructive"
              iconPosition="left"
              onClick={() => router.push("/view/puntoDeVenta/list")}
              style={{ marginRight: "10px" }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              icon="save"
              title="Crear punto de venta"
            >
              Guardar
            </Button>
          </div>
        </GenericForm>
      </CardContent>
    </Card>
  );
}
