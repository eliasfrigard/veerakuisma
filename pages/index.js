import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layouts/Default'

import Hero from '../components/Hero'
import { AnimateIn } from 'eliasfrigard-reusable-components/dist/app'

import {
  getContentfulClient,
  fetchSocialMedia,
  processHeroImage,
} from '../util/contentful'

export default function Home({
  pageTitle,
  slogan,
  hero,
  mobileHero,
  socialMedia,
}) {
  return (
    <Layout
      socialMedia={socialMedia}
      transparent
      footer={false}
      headerFadeIn
      pageTitle={pageTitle}
    >
      <Hero
        Image={Image}
        heroPosition="top"
        desktopImg={hero}
        mobileImg={mobileHero}
      >
        <div className="text-primary-100/90 flex flex-col font-khorla justify-center items-center tracking-wide">
          <div className="flex w-full justify-end pr-3 -mb-3 md:pr-6 md:-mb-5">
            <AnimateIn animationType="slide" delay={1000}>
              <h1 className="text-[2.6rem] md:text-[4.7rem] font-medium leading-none drop-shadow-2xl">
                Veera
              </h1>
            </AnimateIn>
          </div>

          <div className="text-[5rem] md:text-[11rem] leading-none">
            <AnimateIn
              delay={1000}
              className="drop-shadow-2xl"
              animationType="slide"
              slideDirection="right"
            >
              Kuisma
            </AnimateIn>
          </div>

          <div className="w-full">
            <AnimateIn
              animationType="slide"
              slideDirection="bottom"
              delay={1000}
            >
              <Link href="/about">
                <div className="text-sm md:text-2xl flex justify-end pr-4 -mt-1">
                  {slogan}
                </div>
              </Link>
            </AnimateIn>
          </div>
        </div>
      </Hero>
    </Layout>
  )
}

export async function getStaticProps() {
  const contentful = getContentfulClient()

  const pageRes = await contentful.getEntries({
    content_type: 'homePage',
  })

  const page = pageRes?.items[0]?.fields

  const [{ hero, mobileHero }, socialMedia] = await Promise.all([
    processHeroImage(page),
    fetchSocialMedia(),
  ])

  return {
    props: {
      hero,
      mobileHero,
      pageTitle: page?.title,
      slogan: page?.slogan,
      socialMedia,
    },
    revalidate: 86400,
  }
}
