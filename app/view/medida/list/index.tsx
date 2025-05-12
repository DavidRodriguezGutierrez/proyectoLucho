"use client";
import * as React from "react";
import { DataTable } from "@mappnext/ds-tw/molecules/DataTable";
import { ActionButton } from "@mappnext/ds-tw/atoms/ActionButton";
import TableButton from "./ButtonTable";
import { useRouter } from "next/navigation";
import { Props } from "./types";
import { toast } from "sonner";
import { deleteMedida } from "@/app/actions/medida-action";

const columns = [
  {
    accessorKey: "nombre",
    headerStyle: { fontWeight: "bold" },
    label: "Nombre",
  },
  {
    accessorKey: "simbolo",
    headerStyle: { fontWeight: "bold" },
    label: "Simbolo",
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

export default function MedidaDataTable({ medida }: Props) {
  const [medidaList, setMedidaList] = React.useState(medida);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const previousMedidas = medidaList;
    setMedidaList((prevMedida) =>
      prevMedida.filter((medida) => medida.id !== Number(id))
    );
    try {
      await deleteMedida(id);
    } catch {
      toast.error("Error al crear el medida");
      setMedidaList(previousMedidas);
    }
  };
  const medidaData = medidaList.map((item) => ({
    ...item,
    actions: (
      <div className="flex space-x-2">
        <ActionButton
          icon="edit"
          onClick={() => router.push(`/view/medida/update/${item.id}`)}
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
        <DataTable columns={columns} data={medidaData} showRows={5}>
          <TableButton />
        </DataTable>
      </div>
    </div>
  );
}
