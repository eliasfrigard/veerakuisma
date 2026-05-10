import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-04-30.basil',
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { items } = req.body

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' })
  }

  // Validate each item has the required fields
  for (const item of items) {
    if (
      !item.priceId ||
      typeof item.priceId !== 'string' ||
      !item.quantity ||
      typeof item.quantity !== 'number' ||
      item.quantity < 1 ||
      !Number.isInteger(item.quantity)
    ) {
      return res.status(400).json({ error: 'Invalid cart item' })
    }
  }

  try {
    const origin = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: items.map((item) => ({
        price: item.priceId,
        quantity: item.quantity,
      })),
      shipping_address_collection: {
        allowed_countries: [
          'FI',
          'US',
          'CA',
          'GB',
          'DE',
          'FR',
          'SE',
          'NO',
          'DK',
          'BE',
          'NL',
          'AT',
          'PT',
        ],
      },
      automatic_tax: { enabled: true },
      success_url: `${origin}/store?success=true`,
      cancel_url: `${origin}/store?canceled=true`,
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return res.status(500).json({ error: 'Failed to create checkout session' })
  }
}
