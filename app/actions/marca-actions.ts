"use server";
import "@/lib/sdk";
import { safeApiCall } from "@mappnext/sdk";
import { Marca, MarcaService } from "@mappnext/client";
import { userToken } from "@/constants/user-token";

export async function getMarcas() {
  const { data } = await safeApiCall(() => MarcaService.findAllAdminMarca({}), {
    userToken,
  });

  return data?.docs || [];
}

export async function createMarca(family: Marca) {
  const { data } = await safeApiCall(() => MarcaService.addAdminMarca(family), {
    userToken,
  });
  return data;
}

export async function deleteMarca(id: string) {
  const { data } = await safeApiCall(() => MarcaService.deleteAdminMarca(id), {
    userToken,
  });

  return data;
}

export async function editMarca(id: string, requestBody: Marca) {
  const { data } = await safeApiCall(
    () => MarcaService.updateAdminMarca(id, requestBody),
    { userToken }
  );

  return data;
}

export async function GetMarca(id: string) {
  const { data } = await safeApiCall(() => MarcaService.getadminmarca(id), {
    userToken,
  });
  return data;
}
