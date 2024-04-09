import {NextResponse} from "next/server";

export async function middleware(request, response) {
    // console.log(`middleware hit`)
    // const session = request.cookies.get("session");
    // console.log(session, 'Middleware session')
    //
    // // NOTE: temp
    // if (request.nextUrl.pathname.includes('/api')) {
    //     return NextResponse.next();
    // }
    // //Return to /login if don't have a session
    // if (!session) {
    //     return NextResponse.next();
    //
    //     return NextResponse.redirect(new URL("/", request.url));
    // }
    //
    // //Call the authentication endpoint
    // const responseAPI = await fetch(`${request.nextUrl.origin}/api/auth`, {
    //     headers: {
    //         Cookie: `session=${session?.value}`,
    //     },
    // });
    //
    // //Return to /login if token is not authorized
    // if (responseAPI.status !== 200) {
    //     console.log(`exiting not 200`)
    //     return NextResponse.redirect(new URL("/", request.url));
    // }
    //
    // if (request.nextUrl.pathname.startsWith('/user')) {
    //     const authData = await responseAPI.json()
    //     if (authData.user) {
    //         console.log(authData.user, 'user')
    //         const responsek = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/me?isAdmin=true`, {
    //             headers: {
    //                 Authorization: `Bearer ${session?.value}`,
    //             },
    //
    //         });
    //         const {data} = await responsek.json()
    //
    //         const userUUID = data.id;
    //         const requestUUID = request.nextUrl.pathname.split('/').pop(); // Extract UUID from the URL
    //         if (userUUID !== requestUUID) {
    //             console.log(`exiting: not same user, UserID :${userUUID} RequestID: ${requestUUID}`)
    //             return NextResponse.redirect(new URL('/', request.url)); // Redirect to the home page or another appropriate page
    //         }
    //     }
    //     // return NextResponse.rewrite(new URL('/about-2', request.url))
    // }

    return NextResponse.next();
}

//Add your protected routes
// export const config = {
//     matcher: ["/user/:path*"],
// };
