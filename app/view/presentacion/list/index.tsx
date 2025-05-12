"use client";
import * as React from "react";
import { DataTable } from "@mappnext/ds-tw/molecules/DataTable";
import { ActionButton } from "@mappnext/ds-tw/atoms/ActionButton";
import TableButton from "./ButtonTable";
import { useRouter } from "next/navigation";
import { Props } from "./types";
import { toast } from "sonner";
import { deletePresentacion } from "@/app/actions/presentacion-actions";

const columns = [
  {
    accessorKey: "nombre",
    headerStyle: { fontWeight: "bold" },
    label: "Nombre",
  },
  {
    accessorKey: "cantidad",
    headerStyle: { fontWeight: "bold" },
    label: "Cantidad",
  },
  {
    accessorKey: "medida",
    headerStyle: { fontWeight: "bold" },
    label: "Medida",
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

export default function PresentacionDataTable({ presentacion }: Props) {
  const [presentacionList, setPresentacionList] = React.useState(presentacion);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const previousPresentacion = presentacionList;
    setPresentacionList((prevPresentacion) =>
      prevPresentacion.filter((presentacion) => presentacion.id !== Number(id))
    );
    try {
      await deletePresentacion(id);
    } catch {
      toast.error("Error al eliminar el presentación");
      setPresentacionList(previousPresentacion);
    }
  };

  const presentacionData = presentacionList.map((item) => ({
    ...item,
    actions: (
      <div className="flex space-x-2">
        <ActionButton
          icon="edit"
          onClick={() => router.push(`/view/presentacion/update/${item.id}`)}
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
        <DataTable columns={columns} data={presentacionData} showRows={5}>
          <TableButton />
        </DataTable>
      </div>
    </div>
  );
}
