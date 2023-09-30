import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'

import Header from '../Header.js'

export default function Layout({
  children,
  pageTitle,
  pageDescription,
  imageUrl,
  pageUrl
}) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  const title = `${pageTitle} | Veera Kuisma`
  // TODO: Correct urls.
  const baseUrl = 'https://www.veerakuisma.com'
  const faviconUrl = '/path/to/favicon.ico'

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>{title}</title>
        <link rel="icon" href={faviconUrl} />
        <link rel='canonical' href={baseUrl + pageUrl} />
        <meta name='description' content={pageDescription} />
        <meta name='author' content='Elias Frigård' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='robots' content='index,follow' />
        <meta itemProp='image' content={imageUrl} />
        <meta property='og:title' content={pageTitle} key='title' />
        <meta property='og:description' content={pageDescription} />
        <meta property='og:image' content={imageUrl} />
        <meta property='og:url' content={baseUrl + pageUrl} />
        <meta property="og:type" content="website" />
      </Head>
      <Header
        transparent
        uppercaseLinks={false}
      />
      <main
        style={{ transition: 'opacity 200ms ease-out' }}
        className={`bg-primary-500 pt-[85px] fade-in ${loading ? 'opacity-0' : 'opacity-100'}`}
      >
        {children}
      </main>
      {/* <Footer /> */}
    </>
  )
}
