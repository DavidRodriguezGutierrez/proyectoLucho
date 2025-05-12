"use server";
import "@/lib/sdk";
import { safeApiCall } from "@mappnext/sdk";
import { Familia, FamiliaService } from "@mappnext/client";
import { userToken } from '@/constants/user-token';



export async function getFamilias() {
  const { data } = await safeApiCall(
    () => FamiliaService.findAllAdminFamilia({}),
    { userToken }
  );
  return data?.docs || [];
}

export async function createFamilia(Familia: Familia) {
  const { data } = await safeApiCall(
    () => FamiliaService.addAdminFamilia(Familia),
    { userToken }
  );
  return data;
}

export async function deleteFamilia(id: string) {
  const { data } = await safeApiCall(
    () => FamiliaService.deleteAdminFamilia(id),
    { userToken }
  );
  return data;
}

export async function editFamilia(id: string, requestBody: Familia) {
  const { data } = await safeApiCall(
    () => FamiliaService.updateAdminFamilia(id, requestBody),
    { userToken }
  );
  return data;
}

export async function GetFamilia(id: string) {
  const { data } = await safeApiCall(() => FamiliaService.getadminfamilia(id), {
    userToken,
  });
  return data;
}
