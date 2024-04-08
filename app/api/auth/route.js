// import {auth} from "firebase-admin";
// import {customInitApp} from "../../../lib/firebase/firebase-admin";
// import {cookies, headers} from "next/headers";
// import {NextResponse} from "next/server";
//
// customInitApp();
//
// export async function POST(request, response) {
//     const authorization = headers().get("Authorization");
//     console.log(`post hit`, authorization)
//
//
//     if (authorization?.startsWith("Bearer ")) {
//         const idToken = authorization.split("Bearer ")[1];
//         const decodedToken = await auth().verifyIdToken(idToken);
//
//         if (decodedToken) {
//             const expiresIn = 60 * 60 * 24 * 5 * 1000;
//             const sessionCookie = await auth().createSessionCookie(idToken, {
//                 expiresIn,
//             });
//             const options = {
//                 name: "session",
//                 value: sessionCookie,
//                 maxAge: expiresIn,
//                 httpOnly: true,
//                 secure: true,
//             };
//
//             //Add the cookie to the browser
//             cookies().set(options);
//         }
//     }
//
//     return NextResponse.json({}, { status: 200 });
// }
//
// export async function GET(request) {
//     const session = cookies().get("session")?.value || "";
//
//
//     if (!session) {
//         return NextResponse.json({ isLogged: false }, { status: 401 });
//     }
//
//     const decodedClaims = await auth().verifySessionCookie(session, true);
//
//     if (!decodedClaims) {
//         return NextResponse.json({ isLogged: false }, { status: 401 });
//     }
//     return NextResponse.json({ isLogged: true, user :decodedClaims }, { status: 200 });
// }
