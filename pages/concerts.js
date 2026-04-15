import Image from 'next/image'
import Layout from '../components/Layouts/Default'
import Events from '../components/Events'

import {
  getContentfulClient,
  fetchSocialMedia,
  processHeroImage,
} from '../util/contentful'

export async function getStaticProps() {
  const contentful = getContentfulClient()
  const currentDate = new Date().toISOString()

  const [upcomingConcertsRes, previousConcertsRes, pageRes, socialMedia] =
    await Promise.all([
      contentful.getEntries({
        content_type: 'concert',
        order: 'fields.dateTime',
        'fields.dateTime[gte]': currentDate,
      }),
      contentful.getEntries({
        content_type: 'concert',
        order: '-fields.dateTime',
        'fields.dateTime[lte]': currentDate,
      }),
      contentful.getEntries({ content_type: 'concertsPage' }),
      fetchSocialMedia(),
    ])

  const page = pageRes.items[0].fields
  const { hero, mobileHero } = await processHeroImage(page)

  return {
    props: {
      hero,
      mobileHero,
      pageTitle: page?.title,
      concerts: {
        upcoming: upcomingConcertsRes?.items ?? [],
        previous: previousConcertsRes?.items ?? [],
      },
      socialMedia,
    },
    revalidate: 300,
  }
}

export default function Concerts({ hero, concerts, socialMedia }) {
  return (
    <Layout pageTitle="Concerts" pageUrl="/concerts" socialMedia={socialMedia}>
      <div className="fixed inset-0">
        <Image
          src={hero.url}
          alt={hero.altText}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary-900/30 backdrop-blur-sm" />
      </div>

      <Events
        concerts={concerts}
        email="mais.kuis@gmail.com"
        titleColor="text-white"
      />
    </Layout>
  )
}
