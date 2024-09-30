import { NextRequest, NextResponse } from "next/server";
import { getCookiesServer } from "./lib/cookieServer";
import { api } from "./services/api";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname === "/")
    return NextResponse.next();

  const token = getCookiesServer();

  if (pathname.startsWith("/order-management")) {
    if (!token) return NextResponse.redirect(new URL("/", req.url));

    const isValid = await validateToken(token);

    if (!isValid) return NextResponse.redirect(new URL("/", req.url));

    return NextResponse.next();
  }
}

async function validateToken(token: string) {
  if (!token) return false;

  try {
    await api.get("/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
}
