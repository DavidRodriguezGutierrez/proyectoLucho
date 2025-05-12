"use client";
import * as React from "react";
import { DataTable } from "@mappnext/ds-tw/molecules/DataTable";
import { ActionButton } from "@mappnext/ds-tw/atoms/ActionButton";
import TableButton from "./ButtonTable";
import { useRouter } from "next/navigation";
import { Props } from "./types";
import { toast } from "sonner";
import { deleteCiudad } from "@/app/actions/ciudad-actions";
import { GetDepartamento } from "@/app/actions/departamento-actions";
import { Departamento } from "@mappnext/client";

const columns = [
  {
    accessorKey: "nombre",
    headerStyle: { fontWeight: "bold" },
    label: "nombre",
  },
  {
    accessorKey: "departamento",
    headerStyle: { fontWeight: "bold" },
    label: "Departamento",
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

export default function CiudadDataTable({ ciudad }: Props) {
  const [ciudadList, setCiudadList] = React.useState(ciudad);
  const router = useRouter();

  React.useEffect(() => {
    const enrichWithDepartamnetoName = async () => {
      const enriched = await Promise.all(
        ciudadList.map(async (item) => {
          const departamentoNombre = item.departamento
            ? await GetDepartamento(item.departamento.toString())
            : null;
          return {
            ...item,
            departamento: departamentoNombre as
              | (number & Departamento)
              | undefined,
          };
        })
      );
      setCiudadList(enriched);
    };

    enrichWithDepartamnetoName();
  }, []);

  const handleDelete = async (id: string) => {
    const previousCiudades = ciudadList;
    setCiudadList((prevCiudad) =>
      prevCiudad.filter((ciudad) => ciudad.id !== Number(id))
    );
    try {
      await deleteCiudad(id);
    } catch {
      toast.error("Error al crear la ciudad");
      setCiudadList(previousCiudades);
    }
  };

  const ciudadData = ciudadList.map((item) => ({
    ...item,
    departamento: item.departamento?.nombre,
    actions: (
      <div className="flex space-x-2">
        <ActionButton
          icon="edit"
          onClick={() => router.push(`/view/ciudad/update/${item.id}`)}
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
        <DataTable columns={columns} data={ciudadData} showRows={5}>
          <TableButton />
        </DataTable>
      </div>
    </div>
  );
}
