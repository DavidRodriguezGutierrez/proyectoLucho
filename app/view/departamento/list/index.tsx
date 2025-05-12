"use client";
import * as React from "react";
import { DataTable } from "@mappnext/ds-tw/molecules/DataTable";
import { ActionButton } from "@mappnext/ds-tw/atoms/ActionButton";
import TableButton from "./ButtonTable";
import { useRouter } from "next/navigation";
import { Props } from "./types";
import { toast } from "sonner";
import { deleteDepartamento } from "@/app/actions/departamento-actions";

const columns = [
  {
    accessorKey: "nombre",
    headerStyle: { fontWeight: "bold" },
    label: "Nombre",
  },
  {
    accessorKey: "codigo",
    headerStyle: { fontWeight: "bold" },
    label: "Código",
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

export default function DepartamentoDataTable({ departamento }: Props) {
  const [departamentoList, setDepartamentoList] = React.useState(departamento);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const previousDepartamentos = departamentoList;
    setDepartamentoList((prevDepartamento) =>
      prevDepartamento.filter((departamento) => departamento.id !== Number(id))
    );
    try {
      await deleteDepartamento(id);
    } catch {
      toast.error("Error al crear el departamento");
      setDepartamentoList(previousDepartamentos);
    }
  };
  const departamentoData = departamentoList.map((item) => ({
    ...item,
    actions: (
      <div className="flex space-x-2">
        <ActionButton
          icon="edit"
          onClick={() => router.push(`/view/departamento/update/${item.id}`)}
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
        <DataTable columns={columns} data={departamentoData} showRows={5}>
          <TableButton />
        </DataTable>
      </div>
    </div>
  );
}
