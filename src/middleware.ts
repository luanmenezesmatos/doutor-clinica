import { NextResponse, NextRequest } from "next/server";
import { NextRequestWithAuth } from "next-auth/middleware";

export function middleware(request: NextRequestWithAuth) {
  if (request.nextUrl.pathname.startsWith("/api/platform")) {
    const authorization = request.headers.get("authorization");
    const authToken = process.env.APP_API_AUTHORIZATION_TOKEN!;

    const bearerToken = authorization?.split(" ")[1];

    if (!authorization) {
      return Response.json(
        {
          success: false,
          error:
            "Access denied. You must be authorized to access this resource.",
        },
        {
          status: 401,
        }
      );
    }

    if (!bearerToken) {
      return Response.json(
        {
          success: false,
          error:
            "Please provide a valid bearer token in the authorization header.",
        },
        {
          status: 401,
        }
      );
    }

    if (bearerToken !== authToken) {
      return Response.json(
        {
          success: false,
          error: "The provided bearer token is invalid or has expired.",
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.next();
  }
}
