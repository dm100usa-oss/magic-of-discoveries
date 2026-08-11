import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Голый адрес сайта отправляем на английскую версию. */
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/en", request.url));
}

export const config = { matcher: "/" };
