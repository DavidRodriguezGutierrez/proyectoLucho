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
  editProductoPuntoVenta,
  GetProductoPuntoVenta,
} from "@/app/actions/producto-puntoventa-actions";
import { IProductoPuntoVentaUpdateProps } from "./types";

const validationSchema = yup.object({
  producto: yup.string().required("El nombre del producto es requerido"),
  puntodeventa: yup.string().required("El punto de venta es requerido"),
  pasillo: yup.string().required("El pasillo es requerido"),
});

export default function ProductoPuntoDeVentaEdit({
  productos,
  puntoVentas,
}: IProductoPuntoVentaUpdateProps) {
  const { id } = useParams();
  const router = useRouter();

  const [initialValues, setInitialValues] = React.useState({
    producto: "",
    puntodeventa: "",
    pasillo: "",
  });

  React.useEffect(() => {
    if (id) {
      GetProductoPuntoVenta(id.toString()).then((data) => {
        if (data) {
          setInitialValues({
            producto: data.producto ? String(data.producto) : "",
            puntodeventa: data.puntodeventa ? String(data.puntodeventa) : "",
            pasillo: data.pasillo || "",
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
        await editProductoPuntoVenta(id.toString(), {
          ...values,
          producto: Number(values.producto),
          puntodeventa: Number(values.puntodeventa),
        });
      } else {
        throw new Error("ID no definido");
      }
      toast.success("Producto Punto de venta actualizado con éxito");
      await new Promise((res) => setTimeout(res, 1000));
      router.push("/view/productoPuntoDeVenta/list");
    } catch {
      toast.error("Error al actualizar el producto por punto de venta");
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
          <div className="flex justify-end mt-4">
            <Button
              type="button"
              color="red"
              icon="arrow-left"
              variant="destructive"
              onClick={() => router.push("/view/productoPuntoDeVenta/list")}
              style={{ marginRight: "10px" }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              icon="save"
              title="Actualizar producto por punto"
            >
              Guardar
            </Button>
          </div>
        </GenericForm>
      </CardContent>
    </Card>
  );
}
