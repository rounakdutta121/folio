import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED = [
  "/desk",
  "/clients",
  "/quotes",
  "/invoices",
  "/settings",
  "/notifications",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const needsAuth = PROTECTED.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  if (!needsAuth) return NextResponse.next();

  const token = request.cookies.get("folio_session")?.value;
  const secret = process.env.AUTH_SECRET;
  if (!token || !secret) {
    const url = request.nextUrl.clone();
    url.pathname = "/enter";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return NextResponse.next();
  } catch {
    const url = request.nextUrl.clone();
    url.pathname = "/enter";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/desk",
    "/desk/:path*",
    "/clients",
    "/clients/:path*",
    "/quotes",
    "/quotes/:path*",
    "/invoices",
    "/invoices/:path*",
    "/notifications",
    "/notifications/:path*",
    "/settings",
    "/settings/:path*",
  ],
};
