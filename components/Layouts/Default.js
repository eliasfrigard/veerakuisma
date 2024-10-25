import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'

import Header from '../Header'
// import { Header } from '../../../reusable-components/dist/app'

import Footer from '../Footer.js'

export default function Layout({
  children,
  pageTitle,
  pageDescription,
  imageUrl,
  pageUrl,
  footer = true,
  transparent = false,
  headerFadeIn = false,
  socialMedia,
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

  const author = 'Elias Frigård'
  const pageName = 'Veera Kuisma'

  const title = `${pageTitle} | ${pageName}`
  const baseUrl = 'https://www.veerakuisma.com'
  const faviconUrl = '/favicon.ico'

  const routes = [
    { href: '/', label: 'home' },
    { href: '/about', label: 'about' },
    { href: '/bands', label: 'bands' },
    { href: '/concerts', label: 'concerts' },
    { href: '/gallery', label: 'gallery' },
    { href: '/contact', label: 'contact' },
  ]

  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <title>{title}</title>
        <link rel='icon' href={faviconUrl} />
        <link rel='canonical' href={baseUrl + pageUrl} />
        <meta name='description' content={pageDescription} />
        <meta name='author' content={author} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='robots' content='index,follow' />
        <meta itemProp='image' content={imageUrl} />
        <meta property='og:title' content={title} key='title' />
        <meta property='og:description' content={pageDescription} />
        <meta property='og:image' content={imageUrl} />
        <meta property='og:url' content={baseUrl + pageUrl} />
        <meta property='og:type' content='website' />
      </Head>
      <Header currentRoute='/' router={router} routes={routes} pageName={pageName} socialMedia={socialMedia} transparent={transparent} fadeIn={headerFadeIn} uppercaseLinks={false} font='font-khorla' />
      <main
        style={{ transition: 'opacity-90 200ms ease-out' }}
        className={`bg-primary-100 pt-[85px] fade-in ${loading ? 'opacity-0' : 'opacity-100'}`}
      >
        {children}
      </main>

      {footer && <Footer author={author} pageName={pageName} />}
    </>
  )
}
