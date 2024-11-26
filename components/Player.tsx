import React from 'react'
import { BsMusicNoteList } from "react-icons/bs"

interface PlayerProps {
  name: string;
  score: number;
}

const Player: React.FC<PlayerProps> = ({ name, score }) => {
  const [open, setOpen] = React.useState(false)

  const url = 'https://open.spotify.com/album/55l6sD5fHVOuQmhuVb9dJ5?si=y4c7I90iQJWHX8V5HuL4Wg'

  return (
    <>
      <div
        className={`w-full max-w-[400px] max-h-[640px] h-[calc(100vh-60px)] mb-[60px] md:mb-[80px] fixed bottom-0 right-0 p-4 z-50 rounded-xl overflow-hidden transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <iframe
          className={`h-full w-full`}
          src={`https://open.spotify.com/embed/album/${url.split('/').pop()}`}
          allowFullScreen
          allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
          loading='lazy'
        />
      </div>
      <div onClick={() => setOpen(!open)} className='z-50 h-12 aspect-square rounded-full bg-primary-950 bg-opacity-60 backdrop-blur fixed bottom-3 md:bottom-6 right-3 md:right-6 shadow-xl flex justify-center items-center hover:bg-accent-500 cursor-pointer duration-150 hover:scale-105'>
        <BsMusicNoteList className='text-white text-xl' />
      </div>
    </>
  )
}

export default Player