import NextAuth from "next-auth";
import { authConfig } from "./app/authconfig";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
  // matcher: [ "/protected", "/protected/:path*",] //use this to protect all child routes of '/protected' ],
};
