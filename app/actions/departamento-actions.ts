"use server";
import "@/lib/sdk";
import { safeApiCall } from "@mappnext/sdk";
import { Departamento, DepartamentoService } from "@mappnext/client";
import { userToken } from '@/constants/user-token';

export async function getDepartamentos() {
  const { data } = await safeApiCall(
    () => DepartamentoService.findAllAdminDepartamento({}),
    { userToken }
  );
  return data?.docs || [];
}

export async function createDepartamento(departamento: Departamento) {
  const { data } = await safeApiCall(
    () => DepartamentoService.addAdminDepartamento(departamento),
    { userToken }
  );
  return data;
}

export async function deleteDepartamento(id: string) {
  const { data } = await safeApiCall(
    () => DepartamentoService.deleteAdminDepartamento(id),
    { userToken }
  );
  return data;
}

export async function editDepartamento(id: string, requestBody: Departamento) {
  const { data } = await safeApiCall(
    () => DepartamentoService.updateAdminDepartamento(id, requestBody),
    { userToken }
  );
  return data;
}

export async function GetDepartamento(id: string) {
  const { data } = await safeApiCall(
    () => DepartamentoService.getadmindepartamento(id),
    {
      userToken,
    }
  );
  return data;
}
