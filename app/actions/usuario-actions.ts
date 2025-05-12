"use server";
import "@/lib/sdk";
import { safeApiCall } from "@mappnext/sdk";
import { UserService, User } from "@mappnext/client";
import { userToken } from "@/constants/user-token";

export async function getUsuarios() {
  const { data } = await safeApiCall(() => UserService.findAllAdminUser({}), {
    userToken,
  });
  return data?.docs || [];
}

export async function createUsuario(usuario: User) {
  const { data } = await safeApiCall(() => UserService.addAdminUser(usuario), {
    userToken,
  });
  return data;
}

export async function deleteUsuario(id: string) {
  const { data } = await safeApiCall(() => UserService.deleteAdminUser(id), {
    userToken,
  });

  return data;
}

export async function editUsuario(id: string, requestBody: User) {
  const { data } = await safeApiCall(
    () => UserService.updateAdminUser(id, requestBody),
    { userToken }
  );

  return data;
}

export async function GetUsuario(id: string) {
  const { data } = await safeApiCall(() => UserService.getadminuser(id), {
    userToken,
  });

  return data;
}
