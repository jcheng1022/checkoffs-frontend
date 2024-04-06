import StyledComponentsRegistry from '@/lib/registry'
import Header from "@/components/Header";
import {AuthContextProvider} from "@/context/AuthContext";
import Providers from "@/app/providers";
import dayjs from "dayjs";
import {CookiesProvider} from 'next-client-cookies/server';
import {AppContextProvider} from "@/context/AppContext";

const  advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)
export default function AuthedLayout({ children }) {
    // const {data: user, isFetching, isLoading } = useCurrentUser()
    // const router = useRouter();
    // console.log(`re`)
    //
    // useEffect(() => {
    //     if (!isFetching && !isLoading) {
    //         if (!user) {
    //             router.replace('/')
    //         }
    //     }
    // }, [])

    return (
        <html>
        <head>
            <meta name='viewport' content='width=device-width, initial-scale=1.0, viewport-fit=cover' />

        </head>
        <body>
        <StyledComponentsRegistry>
            {/*<QueryClientProvider client={client}>*/}
            <Providers>
                <CookiesProvider>
                    <AuthContextProvider>
                       <AppContextProvider>
                           <Header />
                           {children}
                       </AppContextProvider>

                    </AuthContextProvider>
                </CookiesProvider>
            </Providers>
            {/*</QueryClientProvider>*/}
        </StyledComponentsRegistry>
        </body>
        </html>
    )
}
