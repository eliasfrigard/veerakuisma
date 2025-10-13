import { FaPlay, FaPause } from "react-icons/fa";

import React from 'react'

interface RowProps {
  id: string,
  title: string
  band: string
  index: number
  duration: string
  isPlaying?: boolean
  handleClick: (id: string) => void
}

const Row: React.FC<RowProps> = ({ 
  id,
  title,
  band,
  index,
  duration,
  handleClick,
  isPlaying = false,
}) => {
  return (
    <div className='group text-white flex justify-between items-center p-3 w-full bg-primary-900 hover:bg-accent-500 duration-150 rounded' onClick={() => handleClick(id)}>
      <div className='flex justify-center items-center gap-4'>
          <p className='group-hover:hidden text-sm'>{index+1}</p>
          {
            isPlaying ? (
              <FaPause className='hidden group-hover:block text-xl cursor-pointer' />
            ) : (
              <FaPlay className='hidden group-hover:block text-xl cursor-pointer' />
            )
          }
        <div>
          <p className='font-bold'>{title}</p>
          <p className='text-xs'>{band}</p>
        </div>
      </div>
      <p className='font-semibold text-md'>{duration}</p>
    </div>
  )
}

export default Row
