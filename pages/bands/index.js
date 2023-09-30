import React from 'react'
import Layout from '../../components/Layouts/Default'
import Band from '../../components/Band'

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

export default function Bands() {
  return (
    <Layout>
      <div className='flex flex-col container justify-center items-center w-screen bg-white -mt-[85px] pt-[85px] min-h-screen'>
        <div className='my-16 w-full flex flex-col gap-24'>
          <Band band={bands[0]} />
          <Band band={bands[1]} />
          <Band band={bands[2]} />
          <Band band={bands[3]} />
          <Band band={bands[4]} />
        </div>
      </div>
    </Layout >
  )
}
