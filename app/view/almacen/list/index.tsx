"use client";
import * as React from "react";
import { DataTable } from "@mappnext/ds-tw/molecules/DataTable";
import { ActionButton } from "@mappnext/ds-tw/atoms/ActionButton";
import TableButton from "./ButtonTable";
import { useRouter } from "next/navigation";
import { deleteAlmacen } from "@/app/actions/almacen-actions";
import { Props } from "./types";
import { toast } from "sonner";
import { GetCiudad } from "@/app/actions/ciudad-actions";
import { Ciudad } from "@mappnext/client";

const columns = [
  {
    accessorKey: "nombre",
    headerStyle: { fontWeight: "bold" },
    label: "Nombre",
  },
  {
    accessorKey: "direccion",
    headerStyle: { fontWeight: "bold" },
    label: "Dirección",
  },
  {
    accessorKey: "coordenada",
    headerStyle: { fontWeight: "bold" },
    label: "Coordenada",
  },
  {
    accessorKey: "ciudad",
    headerStyle: { fontWeight: "bold" },
    label: "Ciudad",
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

export default function AlmacenDataTable({ almacen }: Props) {
  const [almacenList, setAlmacenList] = React.useState(almacen);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const previousAlmacens = almacenList;
    setAlmacenList((prevAlmacen) =>
      prevAlmacen.filter((almacen) => almacen.id !== Number(id))
    );
    try {
      await deleteAlmacen(id);
    } catch {
      toast.error("Error al crear el almacén");
      setAlmacenList(previousAlmacens);
    }
  };

  React.useEffect(() => {
    const enrichWithCityName = async () => {
      const enriched = await Promise.all(
        almacenList.map(async (item) => {
          const ciudadNombre = item.ciudad
            ? await GetCiudad(item.ciudad.toString())
            : null;
          return {
            ...item,
            ciudad: ciudadNombre as (number & Ciudad) | undefined,
          };
        })
      );
      setAlmacenList(enriched);
    };

    enrichWithCityName();
  }, []);

  const productsData = almacenList.map((item) => ({
    ...item,
    ciudad: item.ciudad?.nombre,
    actions: (
      <div className="flex space-x-2">
        <ActionButton
          icon="edit"
          onClick={() => router.push(`/view/almacen/update/${item.id}`)}
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
        <DataTable columns={columns} data={productsData} showRows={5}>
          <TableButton />
        </DataTable>
      </div>
    </div>
  );
}
