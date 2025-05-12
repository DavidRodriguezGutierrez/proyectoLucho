"use server";
import "@/lib/sdk";
import { safeApiCall } from "@mappnext/sdk";
import { Ciudad, CiudadService } from "@mappnext/client";
import { userToken } from '@/constants/user-token';


export async function getCiudad() {
  const { data } = await safeApiCall(
    () => CiudadService.findAllAdminCiudad({}),
    { userToken }
  );
  return data?.docs || [];
}

export async function createCiudad(ciudad: Ciudad) {
  const { data } = await safeApiCall(
    () => CiudadService.addAdminCiudad(ciudad),
    { userToken }
  );
  return data;
}

export async function deleteCiudad(id: string) {
  const { data } = await safeApiCall(
    () => CiudadService.deleteAdminCiudad(id),
    { userToken }
  );
  return data;
}

export async function editCiudad(id: string, requestBody: Ciudad) {
  const { data } = await safeApiCall(
    () => CiudadService.updateAdminCiudad(id, requestBody),
    { userToken }
  );
  return data;
}

export async function GetCiudad(id: string) {
  const { data } = await safeApiCall(() => CiudadService.getadminciudad(id), {
    userToken,
  });
  return data;
}
