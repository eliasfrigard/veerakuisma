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
          id: 123
        },
        fields: {
          dateTime: Date.now(),
          venue: 'Some Venue',
          address: 'Some Address Somewhere',
          country: 'Finland',
          urlLink: 'https://veerakuisma.vercel.app'
        },
      },
      {
        sys: {
          id: 123
        },
        fields: {
          dateTime: Date.now(),
          venue: 'Some Venue',
          address: 'Some Address Somewhere',
          country: 'Finland',
          urlLink: 'https://veerakuisma.vercel.app'
        },
      }
    ],
    previous: [
      {
        sys: {
          id: 123
        },
        fields: {
          dateTime: Date.now(),
          venue: 'Some Venue',
          address: 'Some Address Somewhere',
          country: 'Finland',
          urlLink: 'https://veerakuisma.vercel.app'
        },
      },
      {
        sys: {
          id: 123
        },
        fields: {
          dateTime: Date.now(),
          venue: 'Some Venue',
          address: 'Some Address Somewhere',
          country: 'Finland',
          urlLink: 'https://veerakuisma.vercel.app'
        },
      }
    ]
  }

  const hero = {
    fields: {
      file: {
        url: '/veera-3367.jpg'
      }
    }
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

export default function Concerts({ }) {
  return (
    <Layout
      pageTitle='Concerts'
      pageDescription='Concerts'
      imageUrl={`/veera-3367.jpg`}
      pageUrl='/concerts'
    >
      <Hero
        altText="Hero Image"
        heroPosition="center"
        desktopImg="/veera-3367.jpg"
        mobileImg="/veera-3367.jpg"
        overlay={false}
      >
        <div className='relative pt-[85px] w-screen h-screen z-10'>
          <div className='absolute bg-primary-950 w-screen h-screen -mt-[85px] opacity-70'></div>
          <AnimateIn animationType='slide' classes='delay-[1000ms] py-16 h-full container centerContent z-30'>
            <div className='absolute w-1/2 aspect-video bg-primary-950 backdrop-blur opacity-90 rounded shadow-lg'></div>
          </AnimateIn>
        </div>
      </Hero>
    </Layout>
  )
}
