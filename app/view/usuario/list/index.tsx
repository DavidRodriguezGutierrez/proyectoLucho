"use client";
import * as React from "react";
import { DataTable } from "@mappnext/ds-tw/molecules/DataTable";
import { ActionButton } from "@mappnext/ds-tw/atoms/ActionButton";
import TableButton from "./ButtonTable";
import { useRouter } from "next/navigation";
import { Props } from "./types";
import { toast } from "sonner";
import { deleteUsuario } from "@/app/actions/usuario-actions";

const columns = [
  {
    accessorKey: "name",
    headerStyle: { fontWeight: "bold" },
    label: "Nombre",
  },
  {
    accessorKey: "email",
    headerStyle: { fontWeight: "bold" },
    label: "Email",
  },
  {
    accessorKey: "username",
    headerStyle: { fontWeight: "bold" },
    label: "Usuario",
  },
  {
    accessorKey: "password",
    headerStyle: { fontWeight: "bold" },
    label: "Contraseña",
  },
  {
    accessorKey: "createdAt",
    headerStyle: { fontWeight: "bold" },
    label: "Fecha de creación",
  },
  {
    accessorKey: "updatedAt",
    headerStyle: { fontWeight: "bold" },
    label: "Fecha de actualización",
  },
  {
    accessorKey: "actions",
    headerStyle: { fontWeight: "bold" },
    label: "Acciones",
  },
];

export default function UsuarioDataTable({ usuario }: Props) {
  const [usuarioList, setUsuarioList] = React.useState(usuario);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const previousUsuarios = usuarioList;
    setUsuarioList((prevUsuario) =>
      prevUsuario.filter((usuario) => usuario.id !== Number(id))
    );
    try {
      await deleteUsuario(id);
    } catch {
      toast.error("Error al crear el usuario");
      setUsuarioList(previousUsuarios);
    }
  };
  const usuarioData = usuarioList.map((item) => ({
    ...item,
    actions: (
      <div className="flex space-x-2">
        <ActionButton
          icon="edit"
          onClick={() => router.push(`/view/usuario/update/${item.id}`)}
        />
        <ActionButton
          icon="trash"
          iconColor=""
          size="sm"
          variant="destructive"
          onClick={() =>
            item.id !== undefined && handleDelete(item.id.toString())
          }
        />
      </div>
    ),
  }));

  return (
    <div className="p-4 border rounded-lg">
      <div className="mt-6">
        <DataTable columns={columns} data={usuarioData} showRows={5}>
          <TableButton />
        </DataTable>
      </div>
    </div>
  );
}
