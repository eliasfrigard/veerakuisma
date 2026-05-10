import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCart } from '../context/CartContext'
import { IoClose } from 'react-icons/io5'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { HiPlus, HiMinus, HiTrash } from 'react-icons/hi2'

function formatPrice(amount: number) {
  return new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount / 100)
}

const CartWidget = () => {
  const router = useRouter()
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // Close panel on route change
  useEffect(() => {
    const handleRouteChange = () => setOpen(false)
    router.events.on('routeChangeStart', handleRouteChange)
    return () => router.events.off('routeChangeStart', handleRouteChange)
  }, [router])

  // Close on click outside
  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const handleCheckout = async () => {
    if (items.length === 0) return
    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            priceId: i.priceId,
            quantity: i.quantity,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Checkout failed')
      }

      clearCart()
      window.location.href = data.url
    } catch (err) {
      console.error('Checkout error:', err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Don't render the floating button if cart is empty
  if (totalItems === 0 && !open) return null

  return (
    <>
      {/* Floating cart button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary-950 text-primary-100 shadow-2xl flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
        aria-label="Open cart"
      >
        <HiOutlineShoppingBag className="text-2xl" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent-500 text-white text-xs font-bold flex items-center justify-center">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-primary-950/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Slide-out panel */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-primary-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-primary-200">
          <h2 className="text-xl font-khorla font-semibold text-primary-950 tracking-wide">
            Cart
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-primary-700 hover:bg-primary-200 transition-colors"
            aria-label="Close cart"
          >
            <IoClose className="text-xl" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-primary-500">
              <HiOutlineShoppingBag className="text-5xl mb-3 opacity-40" />
              <p className="tracking-wide">Your cart is empty</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li
                  key={item.priceId}
                  className="flex gap-4 bg-white rounded-lg p-3 shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-primary-200">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary-400 text-xs">
                        No img
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary-950 truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-primary-600">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-auto">
                      <button
                        onClick={() =>
                          updateQuantity(item.priceId, item.quantity - 1)
                        }
                        className="w-6 h-6 rounded flex items-center justify-center text-primary-700 hover:bg-primary-200 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <HiMinus className="text-xs" />
                      </button>
                      <span className="text-sm font-medium text-primary-950 w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.priceId, item.quantity + 1)
                        }
                        className="w-6 h-6 rounded flex items-center justify-center text-primary-700 hover:bg-primary-200 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <HiPlus className="text-xs" />
                      </button>
                    </div>
                  </div>

                  {/* Line total + remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.priceId)}
                      className="text-primary-400 hover:text-accent-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <HiTrash className="text-sm" />
                    </button>
                    <span className="text-sm font-medium text-primary-950">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-primary-200 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between text-primary-950">
              <span className="font-medium tracking-wide">Total</span>
              <span className="text-lg font-semibold">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-3 bg-primary-950 text-primary-100 font-medium rounded-lg tracking-wide transition-colors duration-200 hover:bg-accent-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Redirecting...' : 'Checkout'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartWidget
