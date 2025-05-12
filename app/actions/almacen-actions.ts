"use server";
import "@/lib/sdk";
import { safeApiCall } from "@mappnext/sdk";
import { Almacen, AlmacenService } from "@mappnext/client";
import { userToken } from '@/constants/user-token';


export async function getAlmacen() {
  const { data } = await safeApiCall(
    () => AlmacenService.findAllAdminAlmacen({}),
    { userToken }
  );
  return data?.docs || [];
}

export async function createAlmacen(almacen: Almacen) {
  const { data } = await safeApiCall(
    () => AlmacenService.addAdminAlmacen(almacen),
    { userToken }
  );
  return data;
}

export async function deleteAlmacen(id: string) {
  const { data } = await safeApiCall(
    () => AlmacenService.deleteAdminAlmacen(id),
    { userToken }
  );
  return data;
}

export async function editAlmacen(id: string, requestBody: Almacen) {
  const { data } = await safeApiCall(
    () => AlmacenService.updateAdminAlmacen(id, requestBody),
    { userToken }
  );
  return data;
}

export async function GetAlmacen(id: string) {
  const { data } = await safeApiCall(
    () => AlmacenService.getadminalmacen(id),
    { userToken }
  );
  return data;
}
