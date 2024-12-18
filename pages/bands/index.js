import React from 'react'
import Layout from '../../components/Layouts/Default'
import Band from '../../components/Band'

import { createClient } from 'contentful'
import { AnimateIn } from 'eliasfrigard-reusable-components'

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const pageRes = await contentful.getEntries({
    content_type: 'bandPage',
  })

  const page = pageRes.items[0].fields

  const socialRes = await contentful.getEntries({
    content_type: 'homePage',
    select: 'fields.email, fields.facebook, fields.instagram, fields.spotify, fields.youTube, fields.phone',
  })

  const socialPage = socialRes?.items[0]?.fields

  return {
    props: {
      bands: page.bands,
      socialMedia: {
        email: socialPage?.email || null,
        facebook: socialPage?.facebook || null,
        instagram: socialPage?.instagram || null,
        spotify: socialPage?.spotify || null,
        youTube: socialPage?.youTube || null,
        phone: socialPage?.phone || null,
      },
    },
  }
}

const Bands = ({ bands, socialMedia }) => {
  return (
    <Layout socialMedia={socialMedia} pageTitle='Bands'>
      <div className='flex flex-col container justify-center items-center w-screen bg-primary-100 -mt-[85px] pt-[85px] min-h-screen'>
        <div className='my-6 lg:my-16 w-full flex flex-col gap-6 p-2 py-1 lg:gap-10'>
          {bands.map((band) => (
            <Band
              key={band.sys.id}
              image={'https:' + band.fields.hero?.fields?.file?.url}
              name={band.fields.name}
              description={band.fields.description}
              spotify={band.fields.spotify}
              email={band.fields.email}
              youTube={band.fields.youTube}
              website={band.fields.website}
              instagram={band.fields.instagram}
              facebook={band.fields.facebook}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Bands
