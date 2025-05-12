"use client";
import { toast } from "sonner";
import * as React from "react";
import Input from "@mappnext/ds-tw/atoms/Input";
import GenericForm from "@mappnext/ds-tw/templates/GenericForm";
import { Card, CardContent } from "@mappnext/ds-tw/molecules/Card";
import { Button } from "@mappnext/ds-tw/atoms/Button";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { IProductoCreateProps } from "./types";
import { createProducto } from "@/app/actions/producto-actions";

const validationSchema = yup.object({
  nombre: yup.string().required("Campo requerido"),
  codigo_barra: yup.string().required("Campo requerido"),
  descripcion_referencia: yup.string().required("Campo requerido"),
  presentacion: yup.string().required("Campo requerido"),
  familia: yup.string().required("Campo requerido"),
  marca: yup.string().required("Campo requerido"),
});

export default function ProductoCreate({
  presentaciones,
  families,
  marcas,
}: IProductoCreateProps) {
  const router = useRouter();

  const handleSubmit = async (
    values: yup.InferType<typeof validationSchema>
  ) => {
    try {
      const result = await createProducto({
        ...values,
        presentacion: parseInt(values.presentacion),
        familia: parseInt(values.familia),
        marca: parseInt(values.marca),
      });
      if (!result) throw new Error("Error al crear");
      toast.success("Producto creado con éxito");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/view/producto/list");
    } catch {
      toast.error("Error al crear el producto");
      return { success: false };
    }
  };

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardContent className="w-full max-w-7xl mx-auto p-4">
        <GenericForm
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="flex flex-wrap gap-y-6" style={{ gap: "2%" }}>
            <div className="flex-1 min-w-[390px]">
              <Input
                label="Nombre del producto"
                name="nombre"
                placeholder="Ingrese el nombre"
              />
            </div>
            <div className="flex-1 min-w-[390px]">
              <Input
                label="Código de barras"
                name="codigo_barra"
                placeholder="Ingrese el código"
              />
            </div>
            <div className="flex-1 min-w-[390px]">
              <Input
                label="Descripción"
                name="descripcion_referencia"
                placeholder="Ingrese la descripción"
              />
            </div>
          </div>
          <div
            className="flex flex-wrap gap-x-6 gap-y-4"
            style={{ gap: "2%", marginTop: "10px" }}
          >
            <div className="flex-1 min-w-[390px]">
              <Input
                label="Presentación"
                className="w-full"
                name="presentacion"
                options={presentaciones}
                placeholder="Seleccione una presentación"
              />
            </div>
            <div className="flex-1 min-w-[390px]">
              <Input
                label="Familia"
                className="w-full"
                name="familia"
                options={families}
                placeholder="Seleccione una presentación"
              />
            </div>
            <div className="flex-1 min-w-[390px]">
              <Input
                className="w-full"
                label="Marca"
                name="marca"
                options={marcas}
                placeholder="Seleccione una presentación"
              />
            </div>
          </div>

          <div className="flex justify-end" style={{ marginTop: "10px" }}>
            <Button
              color="red"
              icon="delete"
              variant="destructive"
              iconPosition="left"
              onClick={() => router.push("/view/producto/list")}
              style={{ marginRight: "10px" }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              icon="save"
              title="Crear producto"
            >
              Guardar
            </Button>
          </div>
        </GenericForm>
      </CardContent>
    </Card>
  );
}
