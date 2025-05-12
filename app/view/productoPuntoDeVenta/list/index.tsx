"use client";
import * as React from "react";
import { DataTable } from "@mappnext/ds-tw/molecules/DataTable";
import { ActionButton } from "@mappnext/ds-tw/atoms/ActionButton";
import TableButton from "./ButtonTable";
import { useRouter } from "next/navigation";
import { Props } from "./types";
import { toast } from "sonner";
import { deleteProductoPuntoVenta } from "@/app/actions/producto-puntoventa-actions";
import { Productos, Puntodeventa } from "@mappnext/client";
import { GetProducto } from "@/app/actions/producto-actions";
import { GetPuntoVenta } from "@/app/actions/punto-venta-actions";

const columns = [
  {
    accessorKey: "producto",
    headerStyle: { fontWeight: "bold" },
    label: "Producto",
  },
  {
    accessorKey: "puntodeventa",
    headerStyle: { fontWeight: "bold" },
    label: "Punto de venta",
  },
  {
    accessorKey: "pasillo",
    headerStyle: { fontWeight: "bold" },
    label: "Pasillo",
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

export default function ProductoPuntoVentaDataTable({
  productoPuntoDeVenta,
}: Props) {
  const [productoPuntoVentaList, setProductoPuntoVentaList] =
    React.useState(productoPuntoDeVenta);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const previousProductoPuntoVentas = productoPuntoVentaList;
    setProductoPuntoVentaList((prevProductoPuntoVenta) =>
      prevProductoPuntoVenta.filter(
        (productoPuntoDeVenta) => productoPuntoDeVenta.id !== Number(id)
      )
    );
    try {
      await deleteProductoPuntoVenta(id);
    } catch {
      toast.error("Error al crear el producto punto de venta");
      setProductoPuntoVentaList(previousProductoPuntoVentas);
    }
  };

  React.useEffect(() => {
    const enrichData = async () => {
      const enriched = await Promise.all(
        productoPuntoVentaList.map(async (item) => {
          const productoNombre = item.producto
            ? await GetProducto(item.producto.toString())
            : null;
          const puntoVentaNombre = item.puntodeventa
            ? await GetPuntoVenta(item.puntodeventa.toString())
            : null;
          return {
            ...item,
            producto: productoNombre as (number & Productos) | undefined,
            puntodeventa: puntoVentaNombre as
              | (number & Puntodeventa)
              | undefined,
          };
        })
      );
      setProductoPuntoVentaList(enriched);
    };

    enrichData();
  }, []);

  console.log(343445, productoPuntoVentaList);

  const productoPuntoVentaData = productoPuntoVentaList.map((item) => ({
    ...item,
    producto: item.producto?.nombre,
    puntodeventa: item.puntodeventa?.nombre,
    actions: (
      <div className="flex space-x-2">
        <ActionButton
          icon="edit"
          onClick={() =>
            router.push(`/view/productoPuntoDeVenta/update/${item.id}`)
          }
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
        <DataTable columns={columns} data={productoPuntoVentaData} showRows={5}>
          <TableButton />
        </DataTable>
      </div>
    </div>
  );
}
