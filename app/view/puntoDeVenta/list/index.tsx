"use client";
import * as React from "react";
import { DataTable } from "@mappnext/ds-tw/molecules/DataTable";
import { ActionButton } from "@mappnext/ds-tw/atoms/ActionButton";
import TableButton from "./ButtonTable";
import { useRouter } from "next/navigation";
import { Props } from "./types";
import { toast } from "sonner";
import { deletePuntoVenta } from "@/app/actions/punto-venta-actions";
import { GetAlmacen } from "@/app/actions/almacen-actions";
import { Almacen } from "@mappnext/client";

const columns = [
  {
    accessorKey: "almacen",
    headerStyle: { fontWeight: "bold" },
    label: "Almacen",
  },
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

export default function PuntoDeVentaDataTable({ puntoDeVenta }: Props) {
  const [puntoDeventaList, setPuntoDeVentaList] = React.useState(puntoDeVenta);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const previousPuntoDeVentas = puntoDeventaList;
    setPuntoDeVentaList((prevPuntoDeVenta) =>
      prevPuntoDeVenta.filter((puntoDeVenta) => puntoDeVenta.id !== Number(id))
    );
    try {
      await deletePuntoVenta(id);
    } catch {
      toast.error("Error al crear el punto de venta");
      setPuntoDeVentaList(previousPuntoDeVentas);
    }
  };

  React.useEffect(() => {
    const enrichWithCityName = async () => {
      const enriched = await Promise.all(
        puntoDeventaList.map(async (item) => {
          const almacenNombre = item.almacen
            ? await GetAlmacen(item.almacen.toString())
            : null;
          return {
            ...item,
            almacen: almacenNombre as (number & Almacen) | undefined,
          };
        })
      );
      setPuntoDeVentaList(enriched);
    };

    enrichWithCityName();
  }, []);

  const puntoDeVentaData = puntoDeventaList.map((item) => ({
    ...item,
    almacen: item.almacen?.nombre,
    actions: (
      <div className="flex space-x-2">
        <ActionButton
          icon="edit"
          onClick={() => router.push(`/view/puntoDeVenta/update/${item.id}`)}
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
        <DataTable columns={columns} data={puntoDeVentaData} showRows={5}>
          <TableButton />
        </DataTable>
      </div>
    </div>
  );
}
