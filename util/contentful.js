import { createClient } from 'contentful'
import { getPlaiceholder } from 'plaiceholder'
import { getImageBuffer } from './getImageBuffer'

let client

export function getContentfulClient() {
  if (!client) {
    client = createClient({
      space: process.env.SPACE_ID,
      accessToken: process.env.ACCESS_TOKEN,
    })
  }
  return client
}

export async function fetchSocialMedia() {
  const contentful = getContentfulClient()

  const socialRes = await contentful.getEntries({
    content_type: 'homePage',
    select:
      'fields.email,fields.facebook,fields.instagram,fields.spotify,fields.youTube,fields.phone',
  })

  const fields = socialRes?.items[0]?.fields

  return {
    email: fields?.email ?? null,
    facebook: fields?.facebook ?? null,
    instagram: fields?.instagram ?? null,
    spotify: fields?.spotify ?? null,
    youTube: fields?.youTube ?? null,
    phone: fields?.phone ?? null,
  }
}

export async function processHeroImage(page) {
  const heroUrl = 'https:' + page.hero.fields.file.url
  const mobileHeroUrl = page?.mobileHero
    ? 'https:' + page.mobileHero.fields.file.url
    : heroUrl

  const [heroBuffer, mobileHeroBuffer] = await Promise.all([
    getImageBuffer(heroUrl),
    mobileHeroUrl !== heroUrl ? getImageBuffer(mobileHeroUrl) : null,
  ])

  const [{ base64: heroBlur }, { base64: mobileHeroBlur }] = await Promise.all([
    getPlaiceholder(heroBuffer),
    getPlaiceholder(mobileHeroBuffer ?? heroBuffer),
  ])

  return {
    hero: {
      altText: page?.hero?.fields?.title ?? '',
      blur: heroBlur,
      url: heroUrl,
    },
    mobileHero: {
      altText:
        page?.mobileHero?.fields?.title ?? page?.hero?.fields?.title ?? '',
      blur: mobileHeroBlur,
      url: mobileHeroUrl,
    },
  }
}
