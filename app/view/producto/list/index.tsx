"use client";
import * as React from "react";
import { DataTable } from "@mappnext/ds-tw/molecules/DataTable";
import { ActionButton } from "@mappnext/ds-tw/atoms/ActionButton";
import TableButton from "./ButtonTable";
import { useRouter } from "next/navigation";
import { ProductoFormateado } from "./types";
import { toast } from "sonner";
import { deleteProducto } from "@/app/actions/producto-actions";

interface Props {
  productos: ProductoFormateado[];
}

const columns = [
  {
    accessorKey: "nombre",
    headerStyle: { fontWeight: "bold" },
    label: "Nombre",
  },
  {
    accessorKey: "codigo_barra",
    headerStyle: { fontWeight: "bold" },
    label: "Código de barras",
  },
  {
    accessorKey: "descripcion_referencia",
    headerStyle: { fontWeight: "bold" },
    label: "Descripción",
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

export default function ProductoDataTable({ productos }: Props) {
  const [productoList, setProductList] = React.useState(productos);

  const router = useRouter();

  const handleDelete = async (id: string) => {
    const previousProductos = productoList;
    setProductList((prevProductos) =>
      prevProductos.filter((Productos) => Productos.id !== Number(id))
    );
    try {
      await deleteProducto(id);
    } catch {
      toast.error("Error al eliminar el producto");
      setProductList(previousProductos);
    }
  };

  const productosData = productoList.map((item) => ({
    ...item,
    actions: (
      <div className="flex space-x-2">
        <ActionButton
          icon="edit"
          onClick={() => router.push(`/view/producto/update/${item.id}`)}
        />
        <ActionButton
          icon="trash"
          iconColor=""
          size="sm"
          variant="destructive"
          onClick={() => item.id && handleDelete(item.id.toString())}
        />
      </div>
    ),
  }));

  return (
    <div className="p-4 border rounded-lg">
      <div className="mt-6">
        <DataTable columns={columns} data={productosData} showRows={5}>
          <TableButton />
        </DataTable>
      </div>
    </div>
  );
}
