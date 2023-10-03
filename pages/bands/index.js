import React from 'react'
import Layout from '../../components/Layouts/Default'
import Band from '../../components/Band'

import { createClient } from 'contentful'

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const bandRes = await contentful.getEntries({
    content_type: 'band',
  })

  return {
    props: {
      bands: bandRes.items
    },
  }
}

const Bands = ({ bands }) => {
  return (
    <Layout pageTitle='Bands'>
      <div className='flex flex-col container justify-center items-center w-screen bg-primary-100 -mt-[85px] pt-[85px] min-h-screen'>
        <div className='my-6 md:my-16 w-full flex flex-col gap-12 md:gap-16'>
          {
            bands.map((band) => (
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
            ))
          }
        </div>
      </div>
    </Layout>
  )
}

export default Bands
