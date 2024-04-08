import {customInitApp} from "@/lib/firebase/firebase-admin";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {getAuth} from "firebase-admin/auth";

customInitApp();

export async function POST(request, response) {
    console.log(`logout hit`)
    const sessionCookie = request.cookies.get?.session;
    const sCookie = cookies().get("session", sessionCookie);
    console.log(sCookie, 'sCookie', sessionCookie, 333)
    if (!sCookie) {
        return NextResponse.json({}, { status: 400 })

    }

    getAuth()
        .verifySessionCookie(sCookie.value)
        .then((decodedClaims) => {
            // response.setHeader('Set-Cookie', `session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
            // cookies().delete('session')

            return getAuth().revokeRefreshTokens(decodedClaims.sub);
        })
        .then(() => {
            cookies().delete(sCookie.name)

            return NextResponse.json({}, { status: 200 })
        })
        .catch((error) => {
            console.log(`Error attempting to revoke tokens: ${error.message}`)
            // return NextResponse.json({}, { status: 200 })
        });

    return NextResponse.json({}, { status: 200 })

}


