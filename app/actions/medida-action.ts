"use server";
import "@/lib/sdk";
import { safeApiCall } from "@mappnext/sdk";
import { Medida, MedidaService } from "@mappnext/client";
import { userToken } from '@/constants/user-token';


export async function getMedidas() {
  const { data } = await safeApiCall(
    () => MedidaService.findAllAdminMedida({}),
    { userToken }
  );
  return data?.docs || [];
}

export async function createMedida(medida: Medida) {
  const { data } = await safeApiCall(
    () => MedidaService.addAdminMedida(medida),
    { userToken }
  );
  return data;
}

export async function deleteMedida(id: string) {
  const { data } = await safeApiCall(
    () => MedidaService.deleteAdminMedida(id),
    { userToken }
  );

  return data;
}

export async function editMedida(id: string, requestBody: Medida) {
  const { data } = await safeApiCall(
    () => MedidaService.updateAdminMedida(id, requestBody),
    { userToken }
  );

  return data;
}

export async function GetMedida(id: string) {
  const { data } = await safeApiCall(() => MedidaService.getadminmedida(id), {
    userToken,
  });

  return data;
}
