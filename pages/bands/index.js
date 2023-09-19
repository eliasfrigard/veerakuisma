import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../components/Layouts/default'
import AnimateIn from '../../components/AnimateIn'

import { AiOutlineMail } from 'react-icons/ai'
import { BsFacebook, BsInstagram, BsYoutube, BsSpotify } from 'react-icons/bs'

const bands = [
  {
    name: 'ALDA',
    image: '/P1110768.jpg',
    description: 'ALDA’s contemporary instrumental music is full of energetic grooves, majestic harmonies, improvisation and satisfying melodies. Based on traditional Nordic types of tunes such as polskas, schottisches and waltzes, they have created a mind-blowing piece of art for five-string violin, soprano saxophone and piano that transcends borders and genres. Hearing them perform will make you smile and dance, bring tears to your eyes and might even make you go a bit crazy. Immerse yourself in the furiously groovy world of ALDA! '
  },
  {
    name: 'Polenta',
    image: '/Polenta-8__c__Tommi_Ahonen.webp',
    description: 'Polenta, a wholehearted ensemble of three fiddles and one guitar, will knock your socks off with its thrilling and soulful renditions of both original and traditional Nordic tunes. The band’s debut album Kaustinen Turbo (released in August 2021) consists of music from the Kaustinen area, strikingly reworked and renewed. Their new material brings out their own voices as composers. The light-footed live performances of Polenta give out instantaneous energy, radiating the joy of music and togetherness!'
  },
  {
    name: 'Veera Kuisma Ensemble',
    image: '',
    description: ''
  },
  {
    name: 'Veera Kuisma & Johanna Juhola',
    image: '',
    description: ''
  },
  {
    name: 'Polskatroikka',
    image: '',
    description: ''
  }
]

const ListItem = ({ name, active, onClick }) => {
  return (
    <div onClick={() => onClick(name)} className={`h-8 ${!active ? 'cursor-pointer' : 'cursor-default'} flex justify-end items-center w-[280px]`}>
      <h3 className={`${!active ? 'opacity-30 hover:text-lg' : 'text-2xl drop-shadow-xl'} hover:opacity-100 duration-500 text-right`}>{name}</h3>
    </div>
  )
}

const BandHeader = ({ band }) => {
  return (
    <AnimateIn classes='w-full max-w-[60vw] flex flex-col justify-center items-center'>
      <div className='flex gap-12 items-center'>
        <h1 className='text-[4rem] drop-shadow-2xl leading-[4.5rem] tracking-wider'>{band.name}</h1>
        <div className='flex justify-center items-center mr-6 gap-6'>
          <a className='opacity-50 hover:opacity-100 duration-500' href='mailto:polentamusic@gmail.com?subject=Polenta Music Website'>
            <AiOutlineMail className='soMeIcon text-[1.5rem] antialiased' />
          </a>

          <a className='opacity-50 hover:opacity-100 duration-500' href='https://www.facebook.com/Polentamusic' target='_blank' rel='noopener noreferrer'>
            <BsFacebook className='soMeIcon text-xl' />
          </a>

          <a className='opacity-50 hover:opacity-100 duration-500' href='https://www.instagram.com/polentamusic/' target='_blank' rel='noopener noreferrer'>
            <BsInstagram className='soMeIcon text-xl' />
          </a>

          <a className='opacity-50 hover:opacity-100 duration-500'
            href='https://open.spotify.com/artist/6LCSzEXMsFKhWkOAp1wP4E?si=SunHecGiSISfPt1Zmv2W3A'
            target='_blank'
            rel='noopener noreferrer'
          >
            <BsSpotify className='soMeIcon text-xl' />
          </a>

          <a className='opacity-50 hover:opacity-100 duration-500' href='https://www.youtube.com/@polentamusic650' target='_blank' rel='noopener noreferrer'>
            <BsYoutube className='soMeIcon text-[1.5rem] translate-y-[1px]' />
          </a>
        </div>
      </div>

      <div className='border-b w-full opacity-20 mt-8'></div>
    </AnimateIn>
  )
}

const BandInfo = ({ band }) => {
  return (
    <AnimateIn animationType='slide' slideDirection='right' classes='w-full'>
      <div className='prose prose-2xl max-w-2xl leading-[2rem] tracking-wide font-sans font-medium -mt-[0.25em]'>
        {band.description}
      </div>
    </AnimateIn>
  )
}

export default function Band() {
  const imageRef = React.useRef(null)

  const [currentImg, setCurrentImg] = React.useState(bands[0].image)
  const [currentBand, setCurrentBand] = React.useState(bands[0])

  const handleImageChange = (newImage) => {
    if (imageRef.current) {
      // Fade out the image by setting opacity to 0
      imageRef.current.style.opacity = 0

      setTimeout(() => {
        setCurrentImg(newImage)

        void imageRef.current.offsetWidth

        imageRef.current.style.opacity = 1
      }, 500)
    }
  }

  const handleChangeBand = (bandName) => {
    const newBand = bands.find(b => b.name === bandName)
    setCurrentBand(newBand)
    handleImageChange(newBand.image)
  }

  React.useEffect(() => {
    handleImageChange(currentBand.image);
  }, [])

  return (
    <Layout>
      <div className='font-khorla w-screen h-screen flex flex-col justify-center font-medium text-primary tracking-wide'>
        <div className='absolute bg-[#07080D] w-full h-full opacity-90' />

        {/* Background Image */}
        <AnimateIn>
          <Image
            fill
            priority
            ref={imageRef}
            src={currentImg}
            alt={`${currentBand.name}`}
            className={`block object-cover object-center fade-in-out`}
          />
        </AnimateIn>

        {/* Overlay */}
        <div className='absolute w-full h-full bg-[#07080D] bg-opacity-70 backdrop-blur-sm' />

        {/* Content */}
        <div className='container text-[#F2EEEB] flex flex-col justify-center items-center gap-10 z-10'>
          <BandHeader band={currentBand} />

          <div className='flex justify-center items-start mt-4'>
            <AnimateIn animationType='slide' slideDirection='left' classes='flex flex-col gap-6 tracking-wider mr-14'>
              {
                bands.map((band) => (
                  <ListItem
                    key={band.name}
                    name={band.name}
                    active={band.name === currentBand.name}
                    onClick={handleChangeBand}
                  />
                ))
              }
            </AnimateIn>

            <BandInfo band={currentBand} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
