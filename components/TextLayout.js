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

const TextLayout = ({
  text,
  type = 'dynamic',
  className
}) => {
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

  const textContent = text.content.filter((v) => {
    if (v.nodeType !== 'paragraph') return true

    return v.content[0].value.length > 0
  })

  const textDocument = {
    ...text,
    content: textContent
  }

  const maxLengthForTwoColumns = 1500

  if (textLength < maxLengthForTwoColumns || type === 'single') {
    return (
      <div className={`prose prose-lg max-w-4xl prose-img:roundedShadow prose-img:shadow-md leading-loose tracking-wide font-sans font-medium text-center prose-headings:font-khorla prose-blockquote:border-primary-500 prose-blockquote:border-opacity-10 prose-blockquote:opacity-80 prose-blockquote:rounded prose-a:text-accent-500 flex flex-col items-center justify-center prose-blockquote:my-0 ${className}`}>
        {documentToReactComponents(textDocument, options)}
      </div>
    )
  }

  return (
    <div className={`prose max-w-7xl lg:columns-2 gap-10 prose-img:rounded prose-img:shadow-md leading-loose text-center md:text-justify prose-headings:underline prose-a:text-accent-500 ${className}`}>
      {documentToReactComponents(textDocument, options)}
    </div>
  )
}

export default TextLayout
