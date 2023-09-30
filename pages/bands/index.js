import React from 'react'
import Image from 'next/image'
import Layout from '../../components/Layouts/Default'
import AnimateIn from '../../components/AnimateIn'

import SocialMediaIcons from '../../components/SocialMediaIcons'

const bands = [
  {
    name: 'ALDA',
    image: '/P1110768.jpg',
    description: 'ALDA’s contemporary instrumental music is full of energetic grooves, majestic harmonies, improvisation and satisfying melodies. Based on traditional Nordic types of tunes such as polskas, schottisches and waltzes, they have created a mind-blowing piece of art for five-string violin, soprano saxophone and piano that transcends borders and genres. Hearing them perform will make you smile and dance, bring tears to your eyes and might even make you go a bit crazy. Immerse yourself in the furiously groovy world of ALDA!'
  },
  {
    name: 'Polenta',
    image: '/Polenta-8__c__Tommi_Ahonen.webp',
    description: 'Polenta, a wholehearted ensemble of three fiddles and one guitar, will knock your socks off with its thrilling and soulful renditions of both original and traditional Nordic tunes. The band’s debut album Kaustinen Turbo (released in August 2021) consists of music from the Kaustinen area, strikingly reworked and renewed. Their new material brings out their own voices as composers. The light-footed live performances of Polenta give out instantaneous energy, radiating the joy of music and togetherness!'
  },
  {
    name: 'Veera Kuisma Ensemble',
    image: '',
    description: 'Polenta, a wholehearted ensemble of three fiddles and one guitar, will knock your socks off with its thrilling and soulful renditions of both original and traditional Nordic tunes. The band’s debut album Kaustinen Turbo (released in August 2021) consists of music from the Kaustinen area, strikingly reworked and renewed. Their new material brings out their own voices as composers. The light-footed live performances of Polenta give out instantaneous energy, radiating the joy of music and togetherness!'
  },
  {
    name: 'Veera Kuisma & Johanna Juhola',
    image: '',
    description: 'Polenta, a wholehearted ensemble of three fiddles and one guitar, will knock your socks off with its thrilling and soulful renditions of both original and traditional Nordic tunes. The band’s debut album Kaustinen Turbo (released in August 2021) consists of music from the Kaustinen area, strikingly reworked and renewed. Their new material brings out their own voices as composers. The light-footed live performances of Polenta give out instantaneous energy, radiating the joy of music and togetherness. The band’s debut album Kaustinen Turbo(released in August 2021) consists of music from the Kaustinen area, strikingly reworked and renewed.Their new material brings out their own voices as composers.The light- footed live performances of Polenta give out instantaneous energy, radiating the joy of music and togetherness! Polenta, a wholehearted ensemble of three fiddles and one guitar, will knock your socks off with its thrilling and soulful renditions of both original and traditional Nordic tunes. The band’s debut album Kaustinen Turbo (released in August 2021) consists of music from the Kaustinen ar'
  },
  {
    name: 'Polskatroikka',
    image: '',
    description: 'Polenta, a wholehearted ensemble of three fiddles and one guitar, will knock your socks off with its thrilling and soulful renditions of both original and traditional Nordic tunes. The band’s debut album Kaustinen Turbo (released in August 2021) consists of music from the Kaustinen area, strikingly reworked and renewed. Their new material brings out their own voices as composers. The light-footed live performances of Polenta give out instantaneous energy, radiating the joy of music and togetherness!'
  }
]

const ListItem = ({ name, active, onClick }) => {
  return (
    <div
      onClick={() => onClick(name)}
      className={`inline-block h-8 whitespace-no-wrap ${!active ? 'cursor-pointer' : 'cursor-default'} flex justify-end items-center w-full`}
    >
      <h3
        className={`${!active ? 'opacity-30 hover:text-base' : 'text-lg drop-shadow-xl'} hover:opacity-100 duration-500 text-right overflow-ellipsis whitespace-nowrap`}
      >
        {name}
      </h3>
    </div>
  );
};

const BandHeader = ({ band }) => {
  return (
    <AnimateIn classes='w-full flex flex-col justify-center items-center px-6'>
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between w-full'>
        <h1 className={`text-[24px] drop-shadow-2xl leading-[4.5rem] tracking-wider`}>{band.name}</h1>
        <SocialMediaIcons />
      </div>

      <div className='border-b w-full opacity-20 mb-7 mt-6 md:mt-3'></div>
    </AnimateIn>
  )
}

const BandInfo = ({ band }) => {
  return (
    <AnimateIn animationType='slide' slideDirection='right'>
      <BandHeader band={band} />
      <div className='prose prose-2xl max-w-3xl leading-[2rem] tracking-wide font-sans font-medium px-6'>
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
    <Layout imageUrl={currentImg} imageRef={imageRef} imageFade classes="container flex flex-col justify-center items-center mx-12">
      <div className='flex justify-between items-center flex-col md:flex-row'>
        <AnimateIn
          animationType='slide'
          slideDirection='left'
          classes='flex flex-col gap-4 tracking-wider mr-12 hidden md:block'
        >
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

        <div className='flex-grow'>
          {/* Add content within BandInfo */}
          <BandInfo band={currentBand} />
        </div>
      </div>

      <div className='absolute bottom-12 w-1/2 tracking-widest font-normal h-16 bg-[#07080D] bg-gradient-to-t from-[rgba(7, 8, 13, 0.7)] to-transparent rounded-lg bg-opacity-70 opacity-20 flex justify-center items-center cursor-pointer hover:opacity-80 duration-500'>
        Read more about {currentBand.name}
      </div>
    </Layout >
  )
}
