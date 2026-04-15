import Image from 'next/image'
import Layout from '../components/Layouts/Default'
import ContactForm from '../components/ContactForm'
import DownloadItem from '../components/DownloadItem'
import Title from '../components/Title'

import { Hero, AnimateIn } from 'eliasfrigard-reusable-components/dist/app'

import {
  getContentfulClient,
  fetchSocialMedia,
  processHeroImage,
} from '../util/contentful'

export async function getStaticProps() {
  const contentful = getContentfulClient()

  const [pageRes, fileDownloadRes, socialMedia] = await Promise.all([
    contentful.getEntries({ content_type: 'contactPage' }),
    contentful.getEntries({ content_type: 'fileDownload' }),
    fetchSocialMedia(),
  ])

  const page = pageRes.items[0].fields
  const { hero, mobileHero } = await processHeroImage(page)

  return {
    props: {
      hero,
      mobileHero,
      pageTitle: page.title,
      files: fileDownloadRes.items,
      socialMedia,
    },
  }
}

const Contact = ({ hero, mobileHero, pageTitle, socialMedia, files }) => {
  return (
    <Layout
      pageTitle={pageTitle}
      pageDescription={pageTitle}
      imageUrl={hero}
      pageUrl="/concerts"
      socialMedia={socialMedia}
    >
      <Hero
        Image={Image}
        heroPosition="center"
        desktopImg={hero}
        mobileImg={mobileHero}
      >
        <AnimateIn
          delay={1000}
          className="z-10 w-full h-full centerContent flex-col text-primary-50 font-khorla tracking-wider gap-2 px-3 text-center"
        >
          <p className="text-6xl leading-tight">Veera Kuisma</p>
          <div className="w-3/4 lg:w-1/2 my-4 h-[1px] bg-primary-100 bg-opacity-20 rounded-full"></div>
          <p className="text-xl tracking-wider">{socialMedia.email}</p>
          <p className="text-lg tracking-wider">{socialMedia.phone}</p>
        </AnimateIn>
      </Hero>

      <div className="py-6 lg:py-16 px-6 w-full bg-primary-950">
        <ContactForm></ContactForm>
      </div>

      {files.length > 0 && (
        <div className="flex flex-col py-6 lg:py-16 gap-2 md:gap-12 md:px-0">
          <Title
            title="Downloads"
            textColor="text-primary-950"
            borderColor="border-primary-500"
          />
          <div
            className={`container px-6 grid grid-flow-row gap-6 md:gap-8 ${
              files.length > 1 && 'md:grid-cols-2'
            }`}
          >
            {files.map((file) => (
              <DownloadItem
                key={file.sys.id}
                title={file.fields.description}
                filename={file.fields.file.fields.file.fileName}
                file={`https:${file.fields.file.fields.file.url}`}
              />
            ))}
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Contact
