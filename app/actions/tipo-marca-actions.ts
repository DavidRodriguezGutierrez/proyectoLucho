"use server";
import "@/lib/sdk";
import { safeApiCall } from "@mappnext/sdk";
import { TipoMarca, TipoMarcaService } from "@mappnext/client";
import { userToken } from "@/constants/user-token";

export async function getTipo_marca() {
  const { data } = await safeApiCall(
    () => TipoMarcaService.findAllAdminTipomarca({}),
    { userToken }
  );
  return data?.docs || [];
}

export async function createTipo_marca(tipo_marca: TipoMarca) {
  const { data } = await safeApiCall(
    () => TipoMarcaService.addAdminTipomarca(tipo_marca),
    { userToken }
  );
  return data;
}

export async function deleteTipo_marca(id: string) {
  const { data } = await safeApiCall(
    () => TipoMarcaService.deleteAdminTipomarca(id),
    { userToken }
  );

  return data;
}

export async function editTipo_marca(id: string, requestBody: TipoMarca) {
  const { data } = await safeApiCall(
    () => TipoMarcaService.updateAdminTipomarca(id, requestBody),
    { userToken }
  );

  return data;
}

export async function GetTipo_marca(id: string) {
  const { data } = await safeApiCall(
    () => TipoMarcaService.getadmintipoMarca(id),
    { userToken }
  );

  return data;
}
