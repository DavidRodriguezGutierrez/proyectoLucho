"use client";
import * as React from "react";
import * as yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Input from "@mappnext/ds-tw/atoms/Input";
import GenericForm from "@mappnext/ds-tw/templates/GenericForm";
import { Card, CardContent } from "@mappnext/ds-tw/molecules/Card";
import { Button } from "@mappnext/ds-tw/atoms/Button";
import { editUsuario, GetUsuario } from "@/app/actions/usuario-actions";

const validationSchema = yup.object({
  name: yup.string().required("Campo requerido"),
  email: yup.string().email("Email inválido").required("Campo requerido"),
  username: yup.string().required("Campo requerido"),
  password: yup.string().required("Campo requerido"),
});

export default function UsuarioEdit() {
  const { id } = useParams();
  const router = useRouter();
  const [initialValues, setInitialValues] = React.useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  React.useEffect(() => {
    if (id) {
      GetUsuario(id.toString()).then((data) => {
        if (data) {
          setInitialValues({
            name: data.name || "",
            email: data.email || "",
            username: data.username || "",
            password: data.password || "",
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
        await editUsuario(id.toString(), values);
      } else {
        throw new Error("ID no definido");
      }
      toast.success("Usuario actualizado con éxito");
      await new Promise((res) => setTimeout(res, 1000));
      router.push("/view/usuario/list");
    } catch {
      toast.error("Error al actualizar el usuario");
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

          <div className="flex justify-end mt-4">
            <Button
              type="button"
              color="red"
              icon="arrow-left"
              variant="destructive"
              onClick={() => router.push("/view/usuario/list")}
              style={{ marginRight: "10px" }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              icon="save"
              title="Actualizar tipo de marca"
            >
              Guardar
            </Button>
          </div>
        </GenericForm>
      </CardContent>
    </Card>
  );
}
