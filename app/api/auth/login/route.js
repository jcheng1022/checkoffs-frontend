import {customInitApp} from "@/lib/firebase/firebase-admin";
// import {cookies, headers} from "next/headers";
import {NextResponse} from "next/server";
import {getAuth} from "firebase-admin/auth";

customInitApp();

export async function POST(request, response) {
    const body = await request.json()
    let { idToken, csrfToken } = body

    // idToken = idToken.toString();
    // csrfToken = request.body.csrfToken.toString();
    // Guard against CSRF attacks.
    // if (csrfToken !== request.cookies.csrfToken) {
    //     response.status(401).send('UNAUTHORIZED REQUEST!');
    //     return;
    // }
    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    // Create the session cookie. This will also verify the ID token in the process.
    // The session cookie will have the same claims as the ID token.
    // To only allow session cookie setting on recent sign-in, auth_time in ID token
    // can be checked to ensure user was recently signed in before creating a session cookie.
    getAuth()
        .createSessionCookie(idToken, { expiresIn })
        .then(
            (sessionCookie) => {
                // Set cookie policy for session cookie.


                const options = { name: "session", value: sessionCookie, maxAge: expiresIn, httpOnly: true, secure: true };
                const response = NextResponse.redirect(new URL("/", request.url), { status: 302 });

                response.cookies.set("session", sessionCookie , {
                    path: "/",
                    httpOnly: true,
                    secure: true,
                    maxAge: expiresIn
                });

                const cook = response.cookies.get('session')
                // console.log(cook, 'TEST IDK I GO SLEEP')

                // console.log(options, 'options')
                // // cookies().set(options)
                //
                // setCookie ('test', '123', {
                //     request,
                //     response,
                //     ...options
                // })
                // const kkm = getCookie('test')
                // setCookie('_session', sessionCookie, options)
                // const response = NextResponse.json({
                //     message: "Login successful",
                //     success: true,
                // });

                // cookies().set("session", sessionCookie, options);
                //
                // response.cookies.set("session", ses, {
                //     httpOnly: true,
                // });
                // response.cookie('session', sessionCookie, options);
                return NextResponse.json({ isLogged: true }, { status: 200 });

                // response.end(JSON.stringify({ status: 'success' }));
            },
            (error) => {
                console.log(`Error creating session cookie: ${error}`)
                return NextResponse.json({ isLogged: false }, { status: 401 });

                // response.status(401).send('UNAUTHORIZED REQUEST!');
            }
        );
    return NextResponse.json({ isLogged: true }, { status: 200 });



}


