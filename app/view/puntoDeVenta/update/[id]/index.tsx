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
  editPuntoVenta,
  GetPuntoVenta,
} from "@/app/actions/punto-venta-actions";
import { IPuntoVentaUpdateProps } from "./types";

const validationSchema = yup.object({
  nombre: yup.string().required("Campo requerido"),
  almacen: yup.string().required("Campo requerido"),
});

export default function PuntoDeVentaEdit({ almacens }: IPuntoVentaUpdateProps) {
  const { id } = useParams();
  const router = useRouter();

  const [initialValues, setInitialValues] = React.useState({
    nombre: "",
    almacen: "",
  });

  React.useEffect(() => {
    if (id) {
      GetPuntoVenta(id.toString()).then((data) => {
        if (data) {
          setInitialValues({
            nombre: data.nombre || "",
            almacen: data.almacen ? String(data.almacen) : "",
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
        await editPuntoVenta(id.toString(), {
          ...values,
          almacen: Number(values.nombre),
        });
      } else {
        throw new Error("ID no definido");
      }
      toast.success("Punto de venta actualizado con éxito");
      await new Promise((res) => setTimeout(res, 1000));
      router.push("/view/puntoDeVenta/list");
    } catch {
      toast.error("Error al actualizar el punto de venta");
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

          <div className="flex justify-end mt-4">
            <Button
              type="button"
              color="red"
              icon="arrow-left"
              variant="destructive"
              onClick={() => router.push("/view/puntoDeVenta/list")}
              style={{ marginRight: "10px" }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              icon="save"
              title="Actualizar punto de venta"
            >
              Guardar
            </Button>
          </div>
        </GenericForm>
      </CardContent>
    </Card>
  );
}
