"use client";
import * as React from "react";
import * as yup from "yup";
import { toast } from "sonner";
import Input from "@mappnext/ds-tw/atoms/Input";
import GenericForm from "@mappnext/ds-tw/templates/GenericForm";
import { Card, CardContent } from "@mappnext/ds-tw/molecules/Card";
import { Button } from "@mappnext/ds-tw/atoms/Button";
import { useRouter } from "next/navigation";
import { createUsuario } from "@/app/actions/usuario-actions";

// Validación Yup
const validationSchema = yup.object({
  name: yup.string().required("Campo requerido"),
  email: yup.string().email("Email inválido").required("Campo requerido"),
  username: yup.string().required("Campo requerido"),
  password: yup.string().required("Campo requerido"),
});

export default function UsuarioCrear() {
  const router = useRouter();
  const handleSubmit = async (
    values: yup.InferType<typeof validationSchema>
  ) => {
    try {
      const result = await createUsuario(values);
      if (!result) throw new Error("Error al crear");
      toast.success(" Usuario creado con éxito");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/view/usuario/list");
    } catch {
      toast.error("Error al crear el usuario");
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
                label="Nombre de usuario"
                name="name"
                type="text"
                placeholder="Ingrese el nombre"
              />
            </div>
            <div className="flex-1 min-w-[390px] mr-6">
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Ingrese el email"
              />
            </div>
            <div className="flex-1 min-w-[390px] mr-6">
              <Input
                label="Usuario"
                name="username"
                type="text"
                placeholder="Ingrese el usuario"
              />
            </div>
            <div className="flex-1 min-w-[390px] mr-6">
              <Input
                label="Contraseña"
                name="password"
                placeholder="Ingrese la contraseña"
              />
            </div>
          </div>

          <div className="flex justify-end" style={{ marginTop: "15px" }}>
            <Button
              color="red"
              icon="delete"
              variant="destructive"
              iconPosition="left"
              onClick={() => router.push("/view/usuario/list")}
              style={{ marginRight: "10px" }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              icon="save"
              title="Crear usuario"
            >
              Guardar
            </Button>
          </div>
        </GenericForm>
      </CardContent>
    </Card>
  );
}
