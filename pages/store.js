import Image from 'next/image'
import Layout from '../components/Layouts/Default'
import { AnimateIn } from 'eliasfrigard-reusable-components/dist/app'
import { useCart } from '../context/CartContext'
import { fetchSocialMedia } from '../util/contentful'
import Stripe from 'stripe'

function formatPrice(amount) {
  return new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount / 100)
}

function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="group flex flex-col bg-primary-50 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-primary-200">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary-400">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 gap-2">
        <h2 className="text-lg font-semibold text-primary-950 tracking-wide font-khorla">
          {product.name}
        </h2>

        {product.description && (
          <p className="text-sm text-primary-700 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-lg font-medium text-primary-950">
            {formatPrice(product.price)}
          </span>

          <button
            onClick={() =>
              addToCart({
                priceId: product.priceId,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            }
            className="px-4 py-2 bg-primary-950 text-primary-100 text-sm font-medium rounded-lg tracking-wide transition-colors duration-200 hover:bg-accent-500 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Store({ products, socialMedia }) {
  return (
    <Layout pageTitle="Store" pageUrl="/store" socialMedia={socialMedia}>
      <div className="min-h-screen -mt-[85px] pt-[85px]">
        <div className="container px-6 md:px-8 py-10 md:py-16">
          <AnimateIn threshold={0} className="text-center mb-10 md:mb-14">
            <h1 className="text-4xl md:text-5xl font-khorla font-medium tracking-wide text-primary-950">
              Store
            </h1>
            <p className="mt-3 text-primary-700 tracking-wide">
              Physical albums and merchandise
            </p>
          </AnimateIn>

          {products.length === 0 ? (
            <p className="text-center text-primary-600 tracking-wide py-20">
              No products available at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {products.map((product, i) => (
                <AnimateIn key={product.priceId} delay={i * 100}>
                  <ProductCard product={product} />
                </AnimateIn>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('STRIPE_SECRET_KEY not set — store page will have no products')
    const socialMedia = await fetchSocialMedia()
    return { props: { products: [], socialMedia }, revalidate: 60 }
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-04-30.basil',
  })

  const { data } = await stripe.products.list({
    active: true,
    expand: ['data.default_price'],
  })

  const products = data
    .filter((p) => p.default_price && typeof p.default_price === 'object')
    .map((product) => {
      const price = product.default_price
      return {
        name: product.name,
        description: product.description || null,
        image: product.images?.[0] || null,
        price: price.unit_amount,
        priceId: price.id,
      }
    })

  const socialMedia = await fetchSocialMedia()

  return {
    props: { products, socialMedia },
    revalidate: 60,
  }
}
