import StyledComponentsRegistry from '@/lib/registry'
import Header from "@/components/navigation/Header";
import {AuthContextProvider} from "@/context/AuthContext";
import Providers from "@/app/providers";
import dayjs from "dayjs";
import {CookiesProvider} from 'next-client-cookies/server';
import {AppContextProvider} from "@/context/AppContext";
import {theme} from "@/styles/themes";
import './globals.css'
import "animate.css/animate.compat.css"

import FloatingCreateButton from "@/components/FloatingCreateButton";


const  advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)


export const metadata = {
    title: 'Checkoffs',
}
export default function AuthedLayout({ children }) {

    return (
        <html >
        <head>

            <meta name='viewport' content='width=device-width, initial-scale=1.0, viewport-fit=cover' />
            <meta name='theme-color' content={theme.TIMBERWOLF} />
            <meta name='apple-mobile-web-app-status-bar-style' content={theme.TIMBERWOLF} />
        </head>
        <body>

        <StyledComponentsRegistry>
            <Providers>
                <CookiesProvider>
                    <AuthContextProvider>
                       <AppContextProvider>

                              <Header />
                              {children}

                              <FloatingCreateButton/>

                       </AppContextProvider>

                    </AuthContextProvider>
                </CookiesProvider>
            </Providers>
        </StyledComponentsRegistry>
        </body>
        </html>
    )
}
