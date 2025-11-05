import Image from 'next/image'
import Layout from '../components/Layouts/Default'
import Events from '../components/Events'

import { createClient } from 'contentful'
import { getPlaiceholder } from 'plaiceholder'
import { getImageBuffer } from "../util/getImageBuffer"

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  });

  const currentDate = new Date().toISOString();

  const [upcomingConcertsRes, previousConcertsRes, pageRes, socialRes] = await Promise.all([
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
    contentful.getEntries({
      content_type: 'homePage',
      select: 'fields.email, fields.facebook, fields.instagram, fields.spotify, fields.youTube, fields.phone',
    }),
  ]);

  const page = pageRes.items[0].fields;
  const socialPage = socialRes?.items[0]?.fields;
  const heroUrl = 'https:' + page.hero.fields.file.url;
  const mobileHeroUrl = page?.mobileHero ? 'https:' + page?.mobileHero?.fields?.file?.url : heroUrl;

  const [heroPlaiceholder, mobilePlaiceholder] = await Promise.all([
    getImageBuffer(heroUrl).then(getPlaiceholder),
    getImageBuffer(mobileHeroUrl).then(getPlaiceholder),
  ]);

  return {
    props: {
      hero: {
        altText: page?.hero?.fields?.title,
        blur: heroPlaiceholder,
        url: heroUrl,
      },
      mobileHero: {
        altText: page?.mobileHero ? page?.mobileHero?.fields?.title : page?.hero?.fields?.title,
        blur: mobilePlaiceholder,
        url: mobileHeroUrl,
      },
      pageTitle: page?.title,
      concerts: {
        upcoming: upcomingConcertsRes?.items ?? [],
        previous: previousConcertsRes?.items ?? [],
      },
      socialMedia: {
        email: socialPage?.email ?? null,
        facebook: socialPage?.facebook ?? null,
        instagram: socialPage?.instagram ?? null,
        spotify: socialPage?.spotify ?? null,
        youTube: socialPage?.youTube ?? null,
        phone: socialPage?.phone ?? null,
      },
    },
    revalidate: 300
  };
}

export default function Concerts({
  hero,
  concerts,
  pageDescription,
  socialMedia
}) {
  return (
    <Layout
      pageTitle='Concerts'
      pageDescription={pageDescription}
      pageUrl='/concerts'
      socialMedia={socialMedia}
    >
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

      <Events concerts={concerts} email='mais.kuis@gmail.com' titleColor="text-white" />
    </Layout>
  )
}
