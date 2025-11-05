import { useState, useEffect } from 'react'
import Layout from '../components/Layouts/Default'
import Video from '../components/Video'
import ImageLayout from '../components/ImageLayout'

import { createClient } from 'contentful'

import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const pageRes = await contentful.getEntries({
    content_type: 'galleryPage',
  })

  const socialRes = await contentful.getEntries({
    content_type: 'homePage',
    select: 'fields.email, fields.facebook, fields.instagram, fields.spotify, fields.youTube, fields.phone',
  })

  const page = pageRes.items[0].fields
  const socialPage = socialRes?.items[0]?.fields

  const videos = page.videos.map(video => video.fields)
  const images = page.images.map(image => image.fields.file)

  return {
    props: {
      pageTitle: page.title,
      videos,
      images,
      socialMedia: {
        email: socialPage?.email || null,
        facebook: socialPage?.facebook || null,
        instagram: socialPage?.instagram || null,
        spotify: socialPage?.spotify || null,
        youTube: socialPage?.youTube || null,
        phone: socialPage?.phone || null,
      }
    },
    // Revalidate once per day.
    revalidate: 86400,
  }
}

const Gallery = ({ pageTitle, videos, images, socialMedia }) => {
  const [selectedImage, setSelectedImage] = useState(null)

  const openModal = (index) => {
    setSelectedImage(index)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const goToNext = () => {
    setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }

  const downloadImage = () => {
    if (selectedImage !== null) {
      const imageUrl = 'https:' + images[selectedImage].url
      const link = document.createElement('a')
      link.href = imageUrl
      link.download = `image-${selectedImage + 1}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage === null) return

      if (e.key === 'Escape') {
        closeModal()
      } else if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  return (
    <Layout pageTitle={pageTitle} socialMedia={socialMedia}>
      <div className='-mt-[85px] pt-[85px] min-h-screen'>
        <div className='py-3 lg:py-16 flex flex-col gap-3 lg:gap-6'>
          <div className='container flex justify-center items-center flex-wrap'>
            <div className={`container grid grid-flow-row ${videos.length > 1 && 'lg:grid-cols-2'} gap-4 px-2`}>
              {videos.map((video, index) => (
                <Video
                  prominent={index === 0}
                  key={video.youTubeLink}
                  title={video.name}
                  link={video.youTubeLink}
                />
              ))}
            </div>
          </div>

          <div className='w-full grid grid-cols-2 md:grid-cols-3 gap-2 container px-2'>
            {images.map((image, index) => (
              <ImageLayout
                key={image.url}
                index={index}
                image={'https:' + image.url}
                onClick={() => openModal(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur p-4 pt-20' onClick={closeModal}>
          <div className='relative max-w-5xl w-full' onClick={(e) => e.stopPropagation()}>
            {/* Top Bar with Close and Download */}
            <div className='absolute -top-16 right-0 flex gap-2 z-10'>
              {/* Download Button */}
              <button
                onClick={downloadImage}
                className='w-12 h-12 rounded-full bg-secondary-500/70 hover:bg-accent-500 backdrop-blur-sm text-white flex items-center justify-center transition'
                aria-label='Download image'
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>

              {/* Close Button Desktop */}
              <button
                onClick={closeModal}
                className='w-12 h-12 rounded-full bg-secondary-500/70 hover:bg-accent-500 hover:scale-105 backdrop-blur-sm text-white flex items-center justify-center transition text-2xl'
                aria-label='Close modal'
              >
                <MdOutlineClose />
              </button>
            </div>

            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className='hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full
                        bg-secondary-500/70 hover:bg-accent-500 hover:scale-105 backdrop-blur-sm text-white
                        items-center justify-center transition text-2xl z-10'
              aria-label='Previous image'
            >
              <FaArrowLeft />
            </button>

            {/* Image Container */}
            <div className='w-full flex items-center justify-center'>
              <img
                src={'https:' + images[selectedImage].url}
                alt={`Gallery image ${selectedImage + 1}`}
                className='max-w-full max-h-[90vh] object-contain rounded-md shadow-lg'
              />
            </div>

            {/* Next Button Desktop */}
            <button
              onClick={goToNext}
              className='hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full
                        bg-secondary-500/70 hover:bg-accent-500 hover:scale-105 backdrop-blur-sm text-white
                        items-center justify-center transition text-2xl z-10'
              aria-label='Next image'
            >
              <FaArrowRight />
            </button>

            {/* Image Counter Desktop */}
            <div className='hidden md:flex absolute -bottom-12 left-1/2 transform -translate-x-1/2
                            text-white text-sm bg-secondary-500/70 px-4 py-2 rounded-full'>
              {selectedImage + 1} / {images.length}
            </div>

            {/* Bottom Controls (Mobile Only) */}
            <div className='flex md:hidden absolute bottom-4 left-0 w-full justify-between items-center px-6'>
              <button
                onClick={goToPrevious}
                className='w-10 h-10 bg-secondary-500/70 rounded-full flex items-center justify-center text-white hover:bg-accent-500 transition'
                aria-label='Previous image'
              >
                <FaArrowLeft />
              </button>

              <div className='text-white bg-secondary-500/70 px-4 py-2 rounded-full text-sm'>
                {selectedImage + 1} / {images.length}
              </div>

              <button
                onClick={goToNext}
                className='w-10 h-10 bg-secondary-500/70 rounded-full flex items-center justify-center text-white hover:bg-accent-500 transition'
                aria-label='Next image'
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Gallery