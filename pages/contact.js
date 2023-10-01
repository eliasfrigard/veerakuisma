import Layout from '../components/Layouts/Default'
import Event from '../components/Event'
import Image from 'next/image'
import Title from '../components/Title'
import AnimateIn from '../components/AnimateIn'
import Hero from '../components/Hero'

// import { createClient } from 'contentful'

export async function getStaticProps() {
  // const contentful = createClient({
  //   space: process.env.SPACE_ID,
  //   accessToken: process.env.ACCESS_TOKEN,
  // })

  // var currentDate = new Date().toISOString()

  // const upcomingConcertsRes = await contentful.getEntries({
  //   content_type: 'concert',
  //   order: 'fields.dateTime',
  //   'fields.dateTime[gte]': currentDate,
  // })

  // const previousConcertsRes = await contentful.getEntries({
  //   content_type: 'concert',
  //   order: '-fields.dateTime',
  //   'fields.dateTime[lte]': currentDate,
  // })

  // const pageRes = await contentful.getEntries({
  //   content_type: 'concertsPage',
  // })

  // const page = pageRes.items[0].fields

  const concerts = {
    upcoming: [
      {
        sys: {
          id: 123,
        },
        fields: {
          dateTime: Date.now(),
          venue: 'Some Venue',
          address: 'Some Address Somewhere',
          country: 'Finland',
          urlLink: 'https://veerakuisma.vercel.app',
        },
      },
      {
        sys: {
          id: 123,
        },
        fields: {
          dateTime: Date.now(),
          venue: 'Some Venue',
          address: 'Some Address Somewhere',
          country: 'Finland',
          urlLink: 'https://veerakuisma.vercel.app',
        },
      },
    ],
    previous: [
      {
        sys: {
          id: 123,
        },
        fields: {
          dateTime: Date.now(),
          venue: 'Some Venue',
          address: 'Some Address Somewhere',
          country: 'Finland',
          urlLink: 'https://veerakuisma.vercel.app',
        },
      },
      {
        sys: {
          id: 123,
        },
        fields: {
          dateTime: Date.now(),
          venue: 'Some Venue',
          address: 'Some Address Somewhere',
          country: 'Finland',
          urlLink: 'https://veerakuisma.vercel.app',
        },
      },
    ],
  }

  const hero = {
    fields: {
      file: {
        url: '/veera-3367.jpg',
      },
    },
  }

  const page = null
  const upcomingConcertsRes = null
  const previousConcertsRes = null

  return {
    props: {
      hero: page?.heroImage || hero,
      mobileHero: page?.mobileHeroImage || hero,
      heroPosition: page?.heroPosition || 'center',
      heroImageActive: page?.heroImageActive || true,
      pageTitle: page?.name || 'concerts',
      pageDescription: page?.description || 'concerts',
      concerts: {
        upcoming: upcomingConcertsRes?.items || concerts.upcoming,
        previous: previousConcertsRes?.items || concerts.previous,
      },
    },
  }
}

export default function Contact({}) {
  return (
    <Layout
      pageTitle='Contact'
      pageDescription='Concerts'
      imageUrl={`/veera-3367.jpg`}
      pageUrl='/concerts'
      footer={false}
    >
      <Hero
        altText='Hero Image'
        heroPosition='center'
        desktopImg='/veera-3367.jpg'
        mobileImg='/veera-3367.jpg'
      >
        <div className='relative pt-[85px] w-screen h-screen z-10'>
          <AnimateIn
            delay={1000}
            className='w-full h-full centerContent flex-col text-primary-50 font-khorla tracking-wider gap-3 text-center'
          >
            <p className='text-6xl leading-tight'>Veera Kuisma</p>
            <p className='text-2xl'>mais.kuis@gmail.com</p>
            <p className='text-2xl'>+358(0)45-1234567</p>
          </AnimateIn>
        </div>
      </Hero>
    </Layout>
  )
}
