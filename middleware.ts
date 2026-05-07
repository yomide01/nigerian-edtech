import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  // Create Supabase client
  const res = NextResponse.next();
  const supabase = createServerClient({ req, res });

  // Refresh session if expired
  await supabase.auth.getSession();

  // Protected routes
  const protectedRoutes = ["/dashboard", "/materials", "/ai-tutor", "/mock-test", "/profile"];
  const { pathname } = req.nextUrl;

  // Check if route is protected
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // Redirect to login
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Check email confirmation
    if (!user.email_confirmed_at) {
      const redirectUrl = new URL("/login", req.url);
      redirectUrl.searchParams.set("error", "Please verify your email before accessing this page.");
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/materials/:path*",
    "/ai-tutor/:path*",
    "/mock-test/:path*",
    "/profile/:path*",
  ],
};
