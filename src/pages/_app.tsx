import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { QueryClientProvider, QueryClient } from "react-query"
import {ReactQueryDevtools} from "react-query/devtools"
const queryClient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
      <title>Generate Advice</title>
      </Head>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
  )
}
