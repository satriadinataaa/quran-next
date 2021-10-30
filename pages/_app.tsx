// @ts-nocheck
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import NProgress from 'nprogress'
import "tailwindcss/tailwind.css"
Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <>
    <link rel="stylesheet" type="text/css" href="/nprogress.css" />
    <Component {...pageProps} />
    </>
  ) 
}
export default MyApp
