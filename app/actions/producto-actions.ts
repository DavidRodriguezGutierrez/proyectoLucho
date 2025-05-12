"use server";
import "@/lib/sdk";
import { safeApiCall } from "@mappnext/sdk";
import { Productos, ProductosService } from "@mappnext/client";
import { userToken } from "@/constants/user-token";

export async function getProductos() {
  const { data } = await safeApiCall(
    () => ProductosService.findAllAdminProductos({}),

    { userToken }
  );
  return data?.docs || [];
}

export async function createProducto(producto: Productos) {
  const { data } = await safeApiCall(
    () => ProductosService.addAdminProductos(producto),
    { userToken }
  );
  return data;
}

export async function deleteProducto(id: string) {
  const { data } = await safeApiCall(
    () => ProductosService.deleteAdminProductos(id),
    { userToken }
  );
  return data;
}

export async function editProducto(id: string, requestBody: Productos) {
  const { data } = await safeApiCall(
    () => ProductosService.updateAdminProductos(id, requestBody),
    { userToken }
  );
  return data;
}

export async function GetProducto(id: string) {
  const { data } = await safeApiCall(
    () => ProductosService.getadminproductos(id),
    { userToken }
  );
  return data;
}
