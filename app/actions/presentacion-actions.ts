"use server";
import "@/lib/sdk";
import { safeApiCall } from "@mappnext/sdk";
import { userToken } from "@/constants/user-token";
import { Presentacion, PresentacionService } from "@mappnext/client";

export async function getPresentaciones() {
  const { data } = await safeApiCall(
    () => PresentacionService.findAllAdminPresentacion({}),
    { userToken }
  );
  return data?.docs || [];
}

export async function createPresentacion(presentacion: Presentacion) {
  const { data } = await safeApiCall(
    () => PresentacionService.addAdminPresentacion(presentacion),
    { userToken }
  );
  return data;
}

export async function deletePresentacion(id: string) {
  const { data } = await safeApiCall(
    () => PresentacionService.deleteAdminPresentacion(id),
    { userToken }
  );
  return data;
}

export async function editPresentacion(id: string, requestBody: Presentacion) {
  const { data } = await safeApiCall(
    () => PresentacionService.updateAdminPresentacion(id, requestBody),
    { userToken }
  );
  return data;
}

export async function GetPresentacion(id: string) {
  const { data } = await safeApiCall(
    () => PresentacionService.getadminpresentacion(id),
    { userToken }
  );
  return data;
}
