import Layout from '../../components/Layouts/Default'
import Band from '../../components/Band'
import { getContentfulClient, fetchSocialMedia } from '../../util/contentful'

export async function getStaticProps() {
  const contentful = getContentfulClient()

  const [pageRes, socialMedia] = await Promise.all([
    contentful.getEntries({ content_type: 'bandPage' }),
    fetchSocialMedia(),
  ])

  const page = pageRes.items[0].fields

  return {
    props: {
      bands: page.bands,
      socialMedia,
    },
    revalidate: 3600,
  }
}

const Bands = ({ bands, socialMedia }) => {
  return (
    <Layout socialMedia={socialMedia} pageTitle="Bands">
      <div className="flex flex-col container justify-center items-center w-screen bg-primary-100 -mt-[85px] pt-[85px] min-h-screen">
        <div className="my-6 lg:my-16 w-full flex flex-col gap-6 p-2 py-1 lg:gap-10">
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
