import React from 'react'
import Image from 'next/image'

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
      <div className='prose prose-lg max-w-4xl prose-img:roundedShadow prose-img:shadow-md leading-[2.4rem] tracking-wide font-sans font-medium text-center prose-headings:font-khorla prose-blockquote:border-primary-500 prose-blockquote:border-opacity-10 prose-blockquote:rounded'>
        {documentToReactComponents(text, options)}
      </div>
    )
  }

  return (
    <div className='prose max-w-7xl lg:columns-2 gap-10 prose-img:roundedShadow prose-img:shadow-md leading-[2.4rem] text-center md:text-justify prose-headings:underline'>
      {documentToReactComponents(text, options)}
    </div>
  )
}

export default TwoColumnLayout
