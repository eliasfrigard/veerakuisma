import Image from 'next/image'
import Layout from '../components/Layouts/Default'
import AnimateIn from '../components/AnimateIn'

import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { url, fileName, contentType } = node.data.target.fields.file
      return (
        <Image
          src={`https:${url}`}
          alt={fileName}
          width={node.data.target.fields.file.details.image.width}
          height={node.data.target.fields.file.details.image.height}
        />
      )
    },
  },
}

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const pageRes = await contentful.getEntries({
    content_type: 'aboutPage',
  })

  const page = pageRes.items[0].fields

  return {
    props: {
      hero: page.hero,
      mobileHero: page?.mobileHero || null,
      biography: page.biography,
    },
  }
}

const About = ({
  hero,
  mobileHero = undefined,
  biography,
}) => {
  const TwoColumnLayout = ({ text }) => {
    let textLength = 0

    text?.content.forEach(t => {
      if (t.nodeType !== 'paragraph') return

      t.content.forEach((v) => {
        const value = v?.value?.length

        if (typeof value === 'number') {
          textLength = textLength + value
        }
      })
    })

    const maxLengthForTwoColumns = 1500

    if (textLength < maxLengthForTwoColumns) {
      return (
        <div className='prose prose-2xl max-w-3xl prose-img:roundedShadow prose-img:shadow-md leading-[2rem]'>
          {documentToReactComponents(biography, options)}
        </div>
      )
    }

    return (
      <div className='prose prose-2xl max-w-7xl lg:columns-2 gap-10 prose-img:roundedShadow prose-img:shadow-md leading-[2rem]'>
        {documentToReactComponents(biography, options)}
      </div>
    )
  }

  return (
    <Layout pageTitle='About'>
      <div className='-mt-[85px] pt-[85px] min-h-screen'>
        <div className='container centerContent flex-col gap-6 md:gap-16 p-6 md:py-16'>
          <AnimateIn className='relative w-full aspect-[9/16] md:aspect-video'>
            <Image
              alt={hero.fields?.title}
              src={'https:' + hero.fields?.file?.url}
              fill
              className={`object-cover object-center rounded shadow`}
            />
          </AnimateIn>

          <AnimateIn className='text-center md:text-justify leading-[2rem] tracking-wide font-sans font-medium z-10 md:px-10'>
            <TwoColumnLayout text={biography} />
          </AnimateIn>
        </div>
      </div>
    </Layout>
  )
}

export default About
