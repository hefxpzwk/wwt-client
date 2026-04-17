import { NextResponse } from "next/server";

export function success<T>(payload: T, status = 200): NextResponse<T> {
  return NextResponse.json(payload, { status });
}

export function noContent(): NextResponse {
  return new NextResponse(null, { status: 204 });
}

export function apiError(
  statusCode: number,
  code: string,
  message: string,
  path: string
): NextResponse<{ statusCode: number; code: string; message: string; timestamp: string; path: string }> {
  return NextResponse.json(
    {
      statusCode,
      code,
      message,
      timestamp: new Date().toISOString(),
      path
    },
    { status: statusCode }
  );
}
