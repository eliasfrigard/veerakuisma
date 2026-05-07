import React from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { IoClose } from 'react-icons/io5'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': {
        'buy-button-id': string
        'publishable-key': string
        [key: string]: unknown
      }
    }
  }
}

const BuyWidget = () => {
  const router = useRouter()
  const [mounted, setMounted] = React.useState(false)
  const [dismissed, setDismissed] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Hidden on the homepage, before hydration, and once dismissed
  const isHome = router.pathname === '/'
  if (!mounted || isHome || dismissed) return null

  return (
    <>
      <Script
        src="https://js.stripe.com/v3/buy-button.js"
        strategy="lazyOnload"
      />

      {/* Mobile: backdrop */}
      <div className="fixed inset-0 z-30 bg-primary-950/30 backdrop-blur-sm md:hidden pointer-events-none" />

      <div className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none md:inset-auto md:bottom-6 md:right-6 md:z-50">
        <div className="bg-white rounded-xl shadow-2xl p-4 relative pointer-events-auto">
          <button
            onClick={() => setDismissed(true)}
            className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary-950 text-primary-100 flex items-center justify-center text-base hover:bg-accent-500 transition-colors"
            aria-label="Dismiss"
          >
            <IoClose />
          </button>
          <stripe-buy-button
            buy-button-id="buy_btn_1TUTjp1YFTPRRDSh1U3C9Ysg"
            publishable-key="pk_live_51TUT9q1YFTPRRDShJ3vZ7J3bBY0wswGRXcwOTitbK90CvrFyW3s3d0mdlqbkYMBYJGbnbP2ZFMrtEpKRGDWBHYph00ihSXQ6sq"
          />
        </div>
      </div>
    </>
  )
}

export default BuyWidget
