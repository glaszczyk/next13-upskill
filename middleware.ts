import { NextResponse, type NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/cart")) {
		const userId = request.cookies.get("access-token");
		if (!userId) {
			console.log("Redirect from middleware");
			return NextResponse.rewrite(new URL("/login", request.url));
		}
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/cart/:path*"],
};
