"use client";
import * as React from "react";
import * as yup from "yup";
import { toast } from "sonner";
import Input from "@mappnext/ds-tw/atoms/Input";
import GenericForm from "@mappnext/ds-tw/templates/GenericForm";
import { Card, CardContent } from "@mappnext/ds-tw/molecules/Card";
import { Button } from "@mappnext/ds-tw/atoms/Button";
import { useRouter } from "next/navigation";
import { createProductoPuntoVenta } from "@/app/actions/producto-puntoventa-actions";
import { IProductoPuntoVentaCreateProps } from "./types";

// Validación Yup
const validationSchema = yup.object({
  producto: yup.string().required("El nombre del producto es requerido"),
  puntodeventa: yup.string().required("El punto de venta es requerido"),
  pasillo: yup.string().required("El pasillo es requerido"),
});

export default function ProductoPuntoVenta({
  productos,
  puntoVentas,
}: IProductoPuntoVentaCreateProps) {
  const router = useRouter();

  const handleSubmit = async (
    values: yup.InferType<typeof validationSchema>
  ) => {
    try {
      const result = await createProductoPuntoVenta({
        ...values,
        producto: parseInt(values.producto),
        puntodeventa: parseInt(values.puntodeventa),
      });
      if (!result) throw new Error("Error al crear");
      toast.success("Producto por Punto de venta creado con éxito");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/view/productoPuntoDeVenta/list");
    } catch {
      toast.error("Error al crear el producto por punto de venta");
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
            <div className="flex-1 min-w-[390px]">
              <Input
                label="Producto"
                className="w-full"
                name="producto"
                options={productos}
                placeholder="Ingrese la producto"
              />
            </div>
            <div className="flex-1 min-w-[390px]">
              <Input
                label="Punto de venta"
                className="w-full"
                name="puntodeventa"
                options={puntoVentas}
                placeholder="Ingrese la punto de venta"
              />
            </div>

            <div className="flex-1 min-w-[390px] mr-6">
              <Input
                label="Pasillo"
                name="pasillo"
                placeholder="Ingrese el pasillo"
              />
            </div>
          </div>

          <div className="flex justify-end" style={{ marginTop: "15px" }}>
            <Button
              color="red"
              icon="delete"
              variant="destructive"
              iconPosition="left"
              onClick={() => router.push("/view/productoPuntoDeVenta/list")}
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
