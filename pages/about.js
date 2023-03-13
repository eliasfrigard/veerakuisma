import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layouts/default'
import AnimateIn from '../components/AnimateIn'
import { BsFacebook, BsInstagram, BsYoutube, BsSpotify } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'

export default function Home() {
  return (
    <Layout>
      <div className='font-khorla container w-full min-h-screen flex flex-col justify-center items-center px-32 font-medium text-primary tracking-wide p-36 gap-20'>
        <AnimateIn>
          <h1 className='text-[11rem] leading-none drop-shadow-lg text-matcha-800 uppercase text-center'>
            About Me
          </h1>
        </AnimateIn>
        <div className='flex gap-10'>
          <AnimateIn classes='sticky flex flex-col gap-8 top-12 p-4 h-[350px] text-matcha-500 text-3xl drop-shadow-lg'>
            <AiOutlineMail className='' />
            <BsFacebook className='' />
            <BsInstagram className='' />
            <BsSpotify className='' />
            <BsYoutube className='' />
          </AnimateIn>
          <AnimateIn classes='text-matcha-800 prose prose-lg max-w-3xl leading-[2rem] text-lg tracking-wide font-sans'>
            Excepteur aute fugiat culpa excepteur consequat sit ullamco commodo reprehenderit enim velit
            veniam occaecat occaecat. Tempor cupidatat cupidatat quis excepteur commodo deserunt occaecat
            occaecat sunt ullamco amet. Labore sint cillum eiusmod laboris Lorem duis aliqua Lorem voluptate
            velit culpa Lorem irure. Aute elit Lorem tempor magna aute consequat anim aute sint culpa
            adipisicing est ex eu. Ipsum ad cillum ullamco eu ad tempor qui proident eu. Ullamco ullamco sunt
            dolor mollit mollit mollit. Excepteur anim incididunt pariatur consequat velit ea. Laboris eu
            ipsum enim incididunt incididunt veniam aute amet eiusmod aliquip exercitation. Enim amet ad
            occaecat amet mollit sit aliqua proident labore ut commodo do ex. Cupidatat ut sit aliqua duis
            dolor cupidatat fugiat dolor ullamco mollit. Ea cillum duis excepteur ea proident incididunt
            veniam est. Est eu anim laboris veniam ullamco labore elit do aute. Sit ad aliquip occaecat
            pariatur id anim dolor exercitation. Aute fugiat veniam veniam mollit commodo mollit veniam velit
            sit duis non. Velit elit labore aliquip nostrud aute commodo mollit occaecat ex eiusmod do sunt
            enim qui. Magna cupidatat reprehenderit exercitation commodo consectetur incididunt ipsum.
            Adipisicing minim tempor ad minim nostrud sint velit esse. Mollit dolore velit non consectetur.
            Ullamco velit dolor velit enim voluptate esse deserunt excepteur minim minim aliqua. Ex enim velit
            do deserunt. Reprehenderit aliqua culpa et sit consequat. Ut laboris ea aute incididunt esse et
            anim laborum labore non enim. Sit adipisicing do commodo elit excepteur incididunt voluptate
            eiusmod laborum. Labore Lorem laborum esse occaecat commodo sit nostrud dolore magna anim mollit
            dolore. Ipsum excepteur aliqua dolor deserunt. Mollit exercitation commodo ipsum veniam duis
            cupidatat laboris id qui minim ex ullamco. Ad ad excepteur sint veniam nulla in reprehenderit non
            cillum excepteur excepteur occaecat adipisicing sint. Sint qui labore deserunt occaecat eu minim
            ad. Aliquip officia dolor aliqua aliquip sit anim minim id occaecat. Dolor ipsum commodo cupidatat
            nostrud amet commodo eu non irure mollit. Exercitation do cupidatat voluptate Lorem reprehenderit
            eu. Sit quis exercitation sit in dolore ex incididunt minim labore quis. Commodo nostrud
            reprehenderit exercitation mollit. Reprehenderit incididunt esse id sunt quis occaecat cillum.
            Labore reprehenderit nulla in commodo nisi anim amet dolor non nulla esse. Ullamco velit dolor
            velit enim voluptate esse deserunt excepteur minim minim aliqua. Ex enim velit do deserunt.
            Reprehenderit aliqua culpa et sit consequat. Ut laboris ea aute incididunt esse et anim laborum
            labore non enim. Sit adipisicing do commodo elit excepteur incididunt voluptate eiusmod laborum.
            Labore Lorem laborum esse occaecat commodo sit nostrud dolore magna anim mollit dolore. Ipsum
            excepteur aliqua dolor deserunt. Mollit exercitation commodo ipsum veniam duis cupidatat laboris
            id qui minim ex ullamco. Ad ad excepteur sint veniam nulla in reprehenderit non cillum excepteur
            excepteur occaecat adipisicing sint. Sint qui labore deserunt occaecat eu minim ad. Aliquip
            officia dolor aliqua aliquip sit anim minim id occaecat. Dolor ipsum commodo cupidatat nostrud
            amet commodo eu non irure mollit. Exercitation do cupidatat voluptate Lorem reprehenderit eu. Sit
            quis exercitation sit in dolore ex incididunt minim labore quis. Commodo nostrud reprehenderit
            exercitation mollit. Reprehenderit incididunt esse id sunt quis occaecat cillum. Labore
            reprehenderit nulla in commodo nisi anim amet dolor non nulla esse aute eiusmod occaecat.
          </AnimateIn>
        </div>
      </div>
    </Layout>
  )
}
