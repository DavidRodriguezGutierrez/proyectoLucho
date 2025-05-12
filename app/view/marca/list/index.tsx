"use client";
import * as React from "react";
import { DataTable } from "@mappnext/ds-tw/molecules/DataTable";
import { ActionButton } from "@mappnext/ds-tw/atoms/ActionButton";
import TableButton from "./ButtonTable";
import { useRouter } from "next/navigation";
import { Props } from "./types";
import { toast } from "sonner";
import { deleteMarca } from "@/app/actions/marca-actions";
import { GetTipo_marca } from "@/app/actions/tipo-marca-actions";
import { TipoMarca } from "@mappnext/client";

const columns = [
  {
    accessorKey: "nombre",
    headerStyle: { fontWeight: "bold" },
    label: "Nombre",
  },
  {
    accessorKey: "tipo_marca",
    headerStyle: { fontWeight: "bold" },
    label: "Tipo de marca",
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

export default function MarcaDataTable({ marca }: Props) {
  const [productMarca, setMarcaList] = React.useState(marca);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const previousMarcas = productMarca;
    setMarcaList((preMarca) =>
      preMarca.filter((marca) => marca.id !== Number(id))
    );
    try {
      await deleteMarca(id);
    } catch {
      toast.error("Error al crear el  marca");
      setMarcaList(previousMarcas);
    }
  };

  React.useEffect(() => {
    const enrichWithTipoMarcaName = async () => {
      const enriched = await Promise.all(
        productMarca.map(async (item) => {
          const tipoMarcaNombre = item.tipo_marca
            ? await GetTipo_marca(item.tipo_marca.toString())
            : null;
          return {
            ...item,
            tipo_marca: tipoMarcaNombre as (number & TipoMarca) | undefined,
          };
        })
      );
      setMarcaList(enriched);
    };

    enrichWithTipoMarcaName();
  }, []);

  const marcasData = productMarca.map((item) => ({
    ...item,
    tipo_marca: item.tipo_marca?.nombre,
    actions: (
      <div className="flex space-x-2">
        <ActionButton
          icon="edit"
          onClick={() => router.push(`/view/marca/update/${item.id}`)}
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
        <DataTable columns={columns} data={marcasData} showRows={5}>
          <TableButton />
        </DataTable>
      </div>
    </div>
  );
}
