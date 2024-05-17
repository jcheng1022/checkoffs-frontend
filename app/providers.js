'use client'


import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {AppProgressBar as ProgressBar} from "next-nprogress-bar";

export const defaultQueryProps = {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 5 * 60000
}

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    })
}

let browserQueryClient = undefined

function getQueryClient() {
    if (typeof window === 'undefined') {
        return makeQueryClient()
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient()
        return browserQueryClient
    }
}

export default function Providers({ children }) {

    const queryClient = getQueryClient()


    return (
        <QueryClientProvider client={queryClient}>

                    {children}
            <ProgressBar
                height="4px"
                color="#fffd00"
                options={{ showSpinner: false }}
                shallowRouting
            />

        </QueryClientProvider>
    )
}
