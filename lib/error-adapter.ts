import { NextResponse } from "next/server";

interface CustomError {
  message?: string;
  status?: number;
}

export const errorAdapter = (error: unknown) => {
  const { message, status } = (error as CustomError) ?? {};

  const errorMessage = typeof message === 'string' ? message : "Ocurrió un error inesperado";
  const errorStatus = typeof status === 'number' ? status : 500;

  return NextResponse.json({ error: errorMessage }, { status: errorStatus });
};