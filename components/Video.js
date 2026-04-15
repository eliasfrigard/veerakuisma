import React from 'react'
import { getYouTubeId } from '../util/helpers'
import { AnimateIn } from 'eliasfrigard-reusable-components/dist/app'

const Video = ({ title, link, prominent = false, className }) => {
  return (
    <AnimateIn className={`w-full centerContent flex-col ${className}`}>
      <iframe
        title={title}
        src={`https://www.youtube.com/embed/${getYouTubeId(link)}`}
        {...(prominent ? { itemProp: 'video' } : null)}
        className="video shadow-lg rounded"
        allowFullScreen
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </AnimateIn>
  )
}

export default Video
