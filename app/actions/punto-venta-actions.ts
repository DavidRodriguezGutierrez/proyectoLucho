"use server";
import "@/lib/sdk";
import { safeApiCall } from "@mappnext/sdk";
import { Puntodeventa, PuntodeventaService } from "@mappnext/client";
import { userToken } from '@/constants/user-token';


export async function getPuntoVentas() {
  const { data } = await safeApiCall(
    () => PuntodeventaService.findAllAdminPuntodeventa({}),
    { userToken }
  );
  return data?.docs || [];
}

export async function createPuntoVenta(puntoVenta: Puntodeventa) {
  const { data } = await safeApiCall(
    () => PuntodeventaService.addAdminPuntodeventa(puntoVenta),
    { userToken }
  );
  return data;
}

export async function deletePuntoVenta(id: string) {
  const { data } = await safeApiCall(
    () => PuntodeventaService.deleteAdminPuntodeventa(id),
    { userToken }
  );
  return data;
}

export async function editPuntoVenta(id: string, requestBody: Puntodeventa) {
  const { data } = await safeApiCall(
    () => PuntodeventaService.updateAdminPuntodeventa(id, requestBody),
    { userToken }
  );
  return data;
}

export async function GetPuntoVenta(id: string) {
  const { data } = await safeApiCall(
    () => PuntodeventaService.getadminpuntodeventa(id),
    {
      userToken,
    }
  );
  return data;
}
