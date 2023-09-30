import React from 'react'
import Link from 'next/link'

import AnimateIn from './AnimateIn.js'

import { useRouter } from 'next/router'

import { BsFacebook, BsInstagram, BsYoutube, BsSpotify } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'

import Hamburger from './hamburger.js'

export default function Navigation() {
  const router = useRouter()

  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen)
  }

  const activeLinkStyling = (path) => {
    if (router.pathname == path) {
      return 'border-accent-500 border-opacity-20 hover:border-accent-500 hover:border-opacity-70 text-accent-500'
    }
  }

  return (
    <>
      <div
        className={`w-full text-[#F2EEEB] flex justify-center fixed items-center z-10
    `}
      >
        <div
          className={`
            gap-16
            flex
            items-center
            justify-center
            h-[85px]
            w-full
            tracking-wide
            text-primary-500
            container
            px-8
            font-khorla
        `}
        >
          <AnimateIn id='center' classes='flex gap-8 font-medium justify-center tracking-wider lowercase text-[17px] delay-[2000ms]'>
            <Link href='/' className={`${activeLinkStyling('/')}`}>
              Home
            </Link>

            <Link href='/about' className={`${activeLinkStyling('/about')}`}>
              About
            </Link>

            <Link href='/bands' className={`${activeLinkStyling('/bands')}`}>
              Bands
            </Link>

            <Link href='/concerts' className={`${activeLinkStyling('/concerts')}`}>
              Concerts
            </Link>

            <Link href='/music' className={`${activeLinkStyling('/music')}`}>
              Music
            </Link>

            <Link href='/contact' className={`${activeLinkStyling('/contact')}`}>
              Contact
            </Link>
          </AnimateIn>
        </div>
      </div>

      <div className={`w-screen flex justify-start fixed items-center z-20 bg-secondary-500`}>
        <div
          className={`
          lg:hidden
          grid
          grid-cols-2
          items-center
          h-[85px]
          w-full
          tracking-wide
          text-primary-500
          container
          px-8
        `}
        >
          <div id='left'>
            <Link href='/'>
              <p className='cursor-pointer text-2xl font-bold tracking-widest'>POLENTA</p>
            </Link>
          </div>
          <div id='right' className='flex gap-6 justify-end items-center '>
            <Hamburger handleClick={toggleMobileNav} active={mobileNavOpen}></Hamburger>
          </div>
        </div>
      </div>

      <div
        className={`fixed flex flex-col justify-center items-center gap-24 pt-[85px] h-screen w-screen bg-secondary-500 z-10 duration-300 transform py-16 ${!mobileNavOpen && '-translate-y-[100vh]'
          }`}
      >
        <div className='container flex flex-col justify-center items-center gap-10'>
          <Link href='/'>
            <p className={`${activeLinkStyling('/')} mobileNavLink`}>Home</p>
          </Link>

          <Link href='/about'>
            <p className={`${activeLinkStyling('/about')} mobileNavLink`}>About</p>
          </Link>

          <Link href='/bands'>
            <p className={`${activeLinkStyling('/bands')} mobileNavLink`}>Bands</p>
          </Link>

          <Link href='/concerts'>
            <p className={`${activeLinkStyling('/concerts')} mobileNavLink`}>Concerts</p>
          </Link>

          <Link href='/music'>
            <p className={`${activeLinkStyling('/music')} mobileNavLink`}>Music</p>
          </Link>

          <Link href='/contact'>
            <p className={`${activeLinkStyling('/contact')} mobileNavLink`}>Contact</p>
          </Link>
        </div>

        <div className='flex justify-center items-center gap-8 text-primary-500'>
          <a href='mailto:someone@yoursite.com?subject=Polenta Music Website'>
            <AiOutlineMail className='soMeIcon text-[1.8rem] antialiased' />
          </a>

          <a href='https://www.facebook.com/Polentamusic' target='_blank' rel='noopener noreferrer'>
            <BsFacebook className='soMeIcon text-2xl' />
          </a>

          <a href='https://www.instagram.com/polentamusic/' target='_blank' rel='noopener noreferrer'>
            <BsInstagram className='soMeIcon text-2xl' />
          </a>

          <a
            href='https://open.spotify.com/artist/6LCSzEXMsFKhWkOAp1wP4E?si=SunHecGiSISfPt1Zmv2W3A'
            target='_blank'
            rel='noopener noreferrer'
          >
            <BsSpotify className='soMeIcon text-2xl' />
          </a>

          <a href='https://www.youtube.com/@polentamusic650' target='_blank' rel='noopener noreferrer'>
            <BsYoutube className='soMeIcon text-[1.8rem] translate-y-[1px]' />
          </a>
        </div>
      </div>
    </>
  )
}
