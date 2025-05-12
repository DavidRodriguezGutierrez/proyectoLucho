"use client";
import * as React from "react";
import { DataTable } from "@mappnext/ds-tw/molecules/DataTable";
import { ActionButton } from "@mappnext/ds-tw/atoms/ActionButton";
import TableButton from "./ButtonTable";
import { useRouter } from "next/navigation";
import { Props } from "./types";
import { toast } from "sonner";
import { deleteTipo_marca } from "@/app/actions/tipo-marca-actions";

const columns = [
  {
    accessorKey: "nombre",
    headerStyle: { fontWeight: "bold" },
    label: "Nombre",
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

export default function TipoMarcaDataTable({ tipoMarca }: Props) {
  const [tipoMarcaList, setTipoMarcaList] = React.useState(tipoMarca);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const previousTipoMarcas = tipoMarcaList;
    setTipoMarcaList((prevTipoMarca) =>
      prevTipoMarca.filter((tipoMarca) => tipoMarca.id !== Number(id))
    );
    try {
      await deleteTipo_marca(id);
    } catch {
      toast.error("Error al crear el tipo marca");
      setTipoMarcaList(previousTipoMarcas);
    }
  };
  const tipoMarcaData = tipoMarcaList.map((item) => ({
    ...item,
    actions: (
      <div className="flex space-x-2">
        <ActionButton
          icon="edit"
          onClick={() => router.push(`/view/tipo_marca/update/${item.id}`)}
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
        <DataTable columns={columns} data={tipoMarcaData} showRows={5}>
          <TableButton />
        </DataTable>
      </div>
    </div>
  );
}
