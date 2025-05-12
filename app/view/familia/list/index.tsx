"use client";
import * as React from "react";
import { DataTable } from "@mappnext/ds-tw/molecules/DataTable";
import { ActionButton } from "@mappnext/ds-tw/atoms/ActionButton";
import TableButton from "./ButtonTable";
import { useRouter } from "next/navigation";
import { Props } from "./types";
import { toast } from "sonner";
import { deleteFamilia } from "@/app/actions/familia-action";

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

export default function FamiliaDataTable({ familia }: Props) {
  const [familiaList, setFamiliaList] = React.useState(familia);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const previousFamilias = familiaList;
    setFamiliaList((prevFamilia) =>
      prevFamilia.filter((familia) => familia.id !== Number(id))
    );
    try {
      await deleteFamilia(id);
    } catch {
      toast.error("Error al crear el familia");
      setFamiliaList(previousFamilias);
    }
  };
  const familiaData = familiaList.map((item) => ({
    ...item,
    actions: (
      <div className="flex space-x-2">
        <ActionButton
          icon="edit"
          onClick={() => router.push(`/view/familia/update/${item.id}`)}
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
        <DataTable columns={columns} data={familiaData} showRows={5}>
          <TableButton />
        </DataTable>
      </div>
    </div>
  );
}
