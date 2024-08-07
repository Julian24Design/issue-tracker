import { auth } from "./auth"

export default auth((req) => {
  if (!req.auth) {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return Response.json("Unauthorized request", { status: 401 })
    } else {
      const newUrl = new URL("/api/auth/signin", req.nextUrl.origin)
      return Response.redirect(newUrl)
    }
  }
})

export const config = {
  matcher: ["/issues/new", "/issues/:id/edit", "/api/issues/:path*"],
}
