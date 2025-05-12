"use client";
import * as React from "react";
import * as yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Input from "@mappnext/ds-tw/atoms/Input";
import GenericForm from "@mappnext/ds-tw/templates/GenericForm";
import { Card, CardContent } from "@mappnext/ds-tw/molecules/Card";
import { Button } from "@mappnext/ds-tw/atoms/Button";
import { editMarca, GetMarca } from "@/app/actions/marca-actions";
import { IAlmacenUpdateProps } from "./types";

const validationSchema = yup.object({
  nombre: yup.string().required("Campo requerido"),
  tipo_marca: yup.string().required("Campo requerido"),
});

export default function MarcaEdit({ tiposMarcas }: IAlmacenUpdateProps) {
  const { id } = useParams();
  const router = useRouter();

  const [initialValues, setInitialValues] = React.useState({
    nombre: "",
    tipo_marca: "",
  });

  React.useEffect(() => {
    if (id) {
      GetMarca(id.toString()).then((data) => {
        if (data) {
          setInitialValues({
            nombre: data.nombre || "",
            tipo_marca: String(data.tipo_marca) || "",
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
        await editMarca(id.toString(), {
          ...values,
          tipo_marca: Number(values.tipo_marca),
        });
      } else {
        throw new Error("ID no definido");
      }
      toast.success("Marca actualizada con éxito");
      await new Promise((res) => setTimeout(res, 1000));
      router.push("/view/marca/list");
    } catch {
      toast.error("Error al actualizar el marca");
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

          <div className="flex justify-end mt-4">
            <Button
              type="button"
              color="red"
              icon="arrow-left"
              variant="destructive"
              onClick={() => router.push("/view/marca/list")}
              style={{ marginRight: "10px" }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              icon="save"
              title="Actualizar marca"
            >
              Guardar
            </Button>
          </div>
        </GenericForm>
      </CardContent>
    </Card>
  );
}
