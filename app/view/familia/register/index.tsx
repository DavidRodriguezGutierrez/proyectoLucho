"use client";
import * as React from "react";
import * as yup from "yup";
import { toast } from "sonner";
import Input from "@mappnext/ds-tw/atoms/Input";
import GenericForm from "@mappnext/ds-tw/templates/GenericForm";
import { Card, CardContent } from "@mappnext/ds-tw/molecules/Card";
import { Button } from "@mappnext/ds-tw/atoms/Button";
import { useRouter } from "next/navigation";
import { createFamilia } from "@/app/actions/familia-action";

// Validación Yup
const validationSchema = yup.object({
  nombre: yup.string().required("Campo requerido"),
});

export default function FamiliaCrear() {
  const router = useRouter();
  const handleSubmit = async (
    values: yup.InferType<typeof validationSchema>
  ) => {
    try {
      const result = await createFamilia(values);
      if (!result) throw new Error("Error al crear");
      toast.success(" Familia creado con éxito");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/view/familia/list");
    } catch {
      toast.error("Error al crear el familia");
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
          <div className="flex flex-wrap gap-y-4">
            <div className="flex-2 min-w-[400px] mr-6">
              <Input
                label="Nombre del familia"
                name="nombre"
                type="text"
                placeholder="Ingrese el nombre"
              />
            </div>
          </div>

          <div className="flex justify-end" style={{ marginTop: "15px" }}>
            <Button
              color="red"
              icon="delete"
              variant="destructive"
              iconPosition="left"
              onClick={() => router.push("/view/familia/list")}
              style={{ marginRight: "10px" }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              icon="save"
              title="Crear familia"
            >
              Guardar
            </Button>
          </div>
        </GenericForm>
      </CardContent>
    </Card>
  );
}
