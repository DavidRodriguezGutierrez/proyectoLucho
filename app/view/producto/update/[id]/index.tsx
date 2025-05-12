"use client";
import * as React from "react";
import * as yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Input from "@mappnext/ds-tw/atoms/Input";
import GenericForm from "@mappnext/ds-tw/templates/GenericForm";
import { Card, CardContent } from "@mappnext/ds-tw/molecules/Card";
import { Button } from "@mappnext/ds-tw/atoms/Button";
import { GetProducto, editProducto } from "@/app/actions/producto-actions";
import { IProductoUpdateProps } from "./types";

const validationSchema = yup.object({
  nombre: yup.string().required("Campo requerido"),
  codigo_barra: yup.string().required("Campo requerido"),
  descripcion_referencia: yup.string().required("Campo requerido"),
  presentacion: yup.string().required("Campo requerido"),
  familia: yup.string().required("Campo requerido"),
  marca: yup.string().required("Campo requerido"),
});

export default function ProductoEdit({
  presentaciones,
  families,
  marcas,
}: IProductoUpdateProps) {
  const { id } = useParams();
  const router = useRouter();

  const [initialValues, setInitialValues] = React.useState({
    nombre: "",
    codigo_barra: "",
    descripcion_referencia: "",
    presentacion: "",
    familia: "",
    marca: "",
  });

  React.useEffect(() => {
    if (id) {
      GetProducto(id.toString()).then((data) => {
        if (data) {
          setInitialValues({
            nombre: data.nombre || "",
            codigo_barra: data.codigo_barra || "",
            descripcion_referencia: data.descripcion_referencia || "",
            presentacion: data.presentacion ? String(data.presentacion) : "",
            familia: data.familia ? String(data.familia) : "",
            marca: data.marca ? String(data.marca) : "",
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
        await editProducto(id.toString(), {
          ...values,
          presentacion: Number(values.presentacion),
          familia: Number(values.familia),
          marca: Number(values.marca),
        });
      } else {
        throw new Error("ID no definido");
      }
      toast.success("Producto actualizado con éxito");
      await new Promise((res) => setTimeout(res, 1000));
      router.push("/view/producto/list");
    } catch {
      toast.error("Error al actualizar el producto");
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
                label="Nombre del producto"
                name="nombre"
                placeholder="Ingrese el nombre"
              />
            </div>
            <div className="flex-1 min-w-[390px] mr-6">
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

          <div className="flex justify-end mt-4">
            <Button
              type="button"
              color="red"
              icon="arrow-left"
              variant="destructive"
              onClick={() => router.push("/view/producto/list")}
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
