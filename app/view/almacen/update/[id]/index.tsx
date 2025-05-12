"use client";
import * as React from "react";
import * as yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Input from "@mappnext/ds-tw/atoms/Input";
import GenericForm from "@mappnext/ds-tw/templates/GenericForm";
import { Card, CardContent } from "@mappnext/ds-tw/molecules/Card";
import { Button } from "@mappnext/ds-tw/atoms/Button";
import { editAlmacen, GetAlmacen } from "@/app/actions/almacen-actions";
import { IAlmacenUpdateProps } from "./types";

const validationSchema = yup.object({
  nombre: yup.string().required("Campo requerido"),
  direccion: yup.string().required("Campo requerido"),
  coordenada: yup.string().required("Campo requerido"),
  ciudad: yup.string().required("Campo requerido"),
});

export default function AlmacenEdit({ ciudades }: IAlmacenUpdateProps) {
  const { id } = useParams();
  const router = useRouter();

  const [initialValues, setInitialValues] = React.useState({
    nombre: "",
    direccion: "",
    coordenada: "",
    ciudad: "",
  });

  React.useEffect(() => {
    if (id) {
      GetAlmacen(id.toString()).then((data) => {
        if (data) {
          setInitialValues({
            nombre: data.nombre || "",
            direccion: data.direccion || "",
            coordenada: data.coordenada || "",
            ciudad: data.ciudad ? String(data.ciudad) : "",
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
        await editAlmacen(id.toString(), {
          ...values,
          ciudad: Number(values.ciudad),
        });
      } else {
        throw new Error("ID no definido");
      }
      toast.success("Almacén actualizado con éxito");
      await new Promise((res) => setTimeout(res, 1000));
      router.push("/view/almacen/list");
    } catch {
      toast.error("Error al actualizar el almacén");
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

          <div className="flex justify-end mt-4">
            <Button
              type="button"
              color="red"
              icon="arrow-left"
              variant="destructive"
              onClick={() => router.push("/view/almacen/list")}
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
