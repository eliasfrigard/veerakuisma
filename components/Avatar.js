import Image from 'next/image'
import Link from 'next/link'

import { Tooltip } from "@material-tailwind/react"

const Avatar = ({ imageUrl, bandName }) => {
  return (
    <Link href={`/bands/${bandName.toLowerCase()}`}    >
      <Tooltip content={bandName} className='bg-primary-950 border border-primary-100 font-khorla tracking-wider px-3 py-2'>
        <div className='relative overflow-hidden w-[35px] h-[35px] rounded-full shadow-lg'>
          <Image alt={bandName} src={imageUrl} fill className={`object-cover object-center`} />
        </div>
      </Tooltip>
    </Link>
  )
}

export default Avatar
