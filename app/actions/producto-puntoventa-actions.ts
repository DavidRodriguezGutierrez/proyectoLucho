"use server";
import "@/lib/sdk";
import { safeApiCall } from "@mappnext/sdk";
import { userToken } from '@/constants/user-token';
import {
  ProductoPuntodeventa,
  ProductoPuntodeventaService,
} from "@mappnext/client";


export async function getProductoPuntoVentas() {
  const { data } = await safeApiCall(
    () => ProductoPuntodeventaService.findAllAdminProductopuntodeventa({}),
    { userToken }
  );
  return data?.docs || [];
}

export async function createProductoPuntoVenta(
  productoPuntoVenta: ProductoPuntodeventa
) {
  const { data } = await safeApiCall(
    () =>
      ProductoPuntodeventaService.addAdminProductopuntodeventa(
        productoPuntoVenta
      ),
    { userToken }
  );
  return data;
}

export async function deleteProductoPuntoVenta(id: string) {
  const { data } = await safeApiCall(
    () => ProductoPuntodeventaService.deleteAdminProductopuntodeventa(id),
    { userToken }
  );
  return data;
}

export async function editProductoPuntoVenta(
  id: string,
  requestBody: ProductoPuntodeventa
) {
  const { data } = await safeApiCall(
    () =>
      ProductoPuntodeventaService.updateAdminProductopuntodeventa(
        id,
        requestBody
      ),
    { userToken }
  );
  return data;
}

export async function GetProductoPuntoVenta(id: string) {
  const { data } = await safeApiCall(
    () => ProductoPuntodeventaService.getadminproductoPuntodeventa(id),
    {
      userToken,
    }
  );
  return data;
}
