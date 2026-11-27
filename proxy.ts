import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

function unauthorized() {
  return new NextResponse("Acesso restrito ao proprietário.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Prospects privados", charset="UTF-8"',
      "Cache-Control": "no-store, private",
    },
  });
}

function matches(actual: string, expected: string) {
  const a = Buffer.from(actual);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function proxy(request: NextRequest) {
  const expectedUser = process.env.PROSPECTS_USER;
  const expectedPassword = process.env.PROSPECTS_PASSWORD;

  // Fail closed until the owner configures both secrets in Vercel.
  if (!expectedUser || !expectedPassword) {
    return new NextResponse("Área privada ainda não configurada.", {
      status: 503,
      headers: { "Cache-Control": "no-store, private" },
    });
  }

  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Basic ")) return unauthorized();

  try {
    const decoded = Buffer.from(authorization.slice(6), "base64").toString("utf8");
    const separator = decoded.indexOf(":");
    const user = decoded.slice(0, separator);
    const password = decoded.slice(separator + 1);
    if (separator < 1 || !matches(user, expectedUser) || !matches(password, expectedPassword)) {
      return unauthorized();
    }
  } catch {
    return unauthorized();
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  return response;
}

export const config = {
  matcher: "/prospects-privado.html",
};
