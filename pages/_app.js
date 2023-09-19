import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

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

  return (
    <div id='__next' className='bg-[#F2EEEB]'>
      <main
        className={`fade-in ${loading ? 'opacity-0' : 'opacity-100'}`}
        style={{ transition: 'opacity 1s ease-out' }}
      >
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default MyApp
