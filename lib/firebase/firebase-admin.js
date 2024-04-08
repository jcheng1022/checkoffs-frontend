// import {cert, getApps, initializeApp} from 'firebase-admin/app';
//
// const firebaseAdminConfig = {
//     credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_KEY))
// }
//
// export function customInitApp() {
//     if (getApps().length <= 0) {
//         initializeApp(firebaseAdminConfig);
//     }
// }
// //
// // export const authFirebase =
// //     getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0]
// // export const adminAuth = getAuth(authFirebase);
// // export const  serverUser = await adminAuth.currentUser
