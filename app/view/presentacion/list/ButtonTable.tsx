"use client";
import React from "react";
import { ActionButton } from "@mappnext/ds-tw/atoms/ActionButton";
import { BadgeAlert } from "@mappnext/ds-tw/atoms/BadgeAlert";
import { Button } from "@mappnext/ds-tw/atoms/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@mappnext/ds-tw/molecules/DropDownMenu";
import { useRouter } from "next/navigation";

const TableButton = () => {
  const router = useRouter();
  return (
    <>
      <DropdownMenu>
        <Button
          iconPosition="left"
          onClick={() => {
            router.push("/view/presentacion/register");
          }}
        >
          Crear presentación
        </Button>
        <DropdownMenuTrigger asChild>
          <div>
            <BadgeAlert count={3}>
              <ActionButton capsule={false} variant="outline" icon="sailboat" />
            </BadgeAlert>
          </div>
        </DropdownMenuTrigger>
      </DropdownMenu>
      <ActionButton capsule={false} variant="outline" icon="copy" />
      <ActionButton capsule={false} variant="outline" icon="copy" />
    </>
  );
};

export default TableButton;
