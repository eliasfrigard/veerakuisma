import React from 'react'
import Link from 'next/link'

import { useRouter } from 'next/router'

import { BsFacebook, BsInstagram, BsYoutube, BsSpotify } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'

import AnimateIn from '../components/AnimateIn.js'
import Hamburger from './Hamburger.js'

export default function Header({
  transparent = false,
  uppercaseLinks = true
}) {
  const router = useRouter()

  const [currentYear, setCurrentYear] = React.useState('')
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen)
  }

  const activeLinkStyling = (path) => {
    if (router.pathname == path) {
      return 'text-accent-500'
    }
  }

  React.useEffect(() => {
    const year = new Date().getFullYear()
    setCurrentYear(year.toString())
  }, [])

  const pageName = 'Veera Kuisma'
  const emailAddress = 'mais.kuis@gmail.com'

  const socialMedia = {
    email: `mailto:${emailAddress}?subject=${pageName} Website`,
    facebook: 'https://www.facebook.com/Polentamusic',
    instagram: 'https://www.instagram.com/polentamusic/',
    spotify: 'https://open.spotify.com/artist/6LCSzEXMsFKhWkOAp1wP4E?si=SunHecGiSISfPt1Zmv2W3A',
    youtube: 'https://www.youtube.com/@polentamusic650'
  }

  const links = [
    {
      href: '/',
      label: 'home'
    },
    {
      href: '/bands',
      label: 'bands'
    },
    {
      href: '/about',
      label: 'about'
    },
    {
      href: '/gallery',
      label: 'gallery'
    },
    {
      href: '/contact',
      label: 'contact'
    }
  ]

  return (
    <>
      <AnimateIn
        disabled
        classes={`w-full flex justify-start fixed top-0 items-center z-50 ${!transparent && 'backdrop-blur bg-primary-950'} bg-opacity-90`}
      >
        <div
          className={`
          hidden
          lg:gap-16
          lg:flex
          xl:grid
          xl:grid-cols-3
          items-center
          h-[85px]
          w-full
          ${!transparent ? 'shadow-lg text-primary-100' : 'text-white'}
          tracking-wide
          container
          px-8
          font-khorla
        `}
        >
          <div id='left'>
            <Link className='cursor-pointer text-xl font-bold tracking-widest uppercase' href='/'>
              {pageName}
            </Link>
          </div>
          <div id='center' className='flex gap-4 font-medium justify-center tracking-[2px]'>
            {
              links.map((link) => (
                <Link key={link.href} href={link.href} className={`${activeLinkStyling(link.href)} desktopNavLink ${uppercaseLinks && 'uppercase'}`}>
                  {link.label}
                </Link>
              ))
            }
          </div>
          <div id='right' className='flex gap-6 justify-end items-center'>
            {
              socialMedia.email && (
                <a href={socialMedia.email}>
                  <AiOutlineMail className='soMeIcon text-[1.5rem] antialiased' />
                </a>
              )

            }
            {
              socialMedia.facebook && (
                <a href={socialMedia.facebook} target='_blank' rel='noopener noreferrer'>
                  <BsFacebook className='soMeIcon text-xl' />
                </a>
              )
            }
            {
              socialMedia.instagram && (
                <a href={socialMedia.instagram} target='_blank' rel='noopener noreferrer'>
                  <BsInstagram className='soMeIcon text-xl' />
                </a>
              )
            }
            {
              socialMedia.spotify && (
                <a
                  href={socialMedia.spotify} target='_blank' rel='noopener noreferrer'
                >
                  <BsSpotify className='soMeIcon text-xl' />
                </a>
              )
            }
            {
              socialMedia.youtube && (
                <a href={socialMedia.youtube} target='_blank' rel='noopener noreferrer'>
                  <BsYoutube className='soMeIcon text-[1.5rem] translate-y-[1px]' />
                </a>
              )
            }
          </div>
        </div>
      </AnimateIn>

      {/* MOBILE */}

      <div className={`w-screen flex justify-start fixed items-center z-50 bg-primary-950`}>
        <div
          className={`
          lg:hidden
          flex
          justify-between
          items-center
          h-[85px]
          w-full
          tracking-wide
          container
          px-8
          font-khorla

        `}
        >
          <div>
            <Link href='/'>
              <p className='cursor-pointer text-2xl mt-[5px] font-bold tracking-widest uppercase text-primary-100'>{pageName}</p>
            </Link>
          </div>
          <div>
            <Hamburger handleClick={toggleMobileNav} active={mobileNavOpen}></Hamburger>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden fixed flex flex-col justify-evenly items-center pt-[85px] h-screen w-screen bg-primary-950 z-40 duration-300 transform ${!mobileNavOpen && '-translate-y-[100vh]'
          }`}
      >
        <div className='container flex flex-col justify-center items-center gap-10 text-primary-100 font-khorla'>
          {
            links.map((link) => (
              <Link key={link.href} href={link.href} className={`${activeLinkStyling(link.href)} mobileNavLink capitalize`}>
                {link.label}
              </Link>
            ))
          }
        </div>

        <div className='flex justify-center items-center gap-8 text-primary-100'>
          {
            socialMedia.email && (
              <a href={socialMedia.email}>
                <AiOutlineMail className='soMeIcon text-[1.6rem] antialiased' />
              </a>
            )

          }
          {
            socialMedia.facebook && (
              <a href={socialMedia.facebook} target='_blank' rel='noopener noreferrer'>
                <BsFacebook className='soMeIcon text-2xl' />
              </a>
            )
          }
          {
            socialMedia.instagram && (
              <a href={socialMedia.instagram} target='_blank' rel='noopener noreferrer'>
                <BsInstagram className='soMeIcon text-2xl' />
              </a>
            )
          }
          {
            socialMedia.spotify && (
              <a
                href={socialMedia.spotify} target='_blank' rel='noopener noreferrer'
              >
                <BsSpotify className='soMeIcon text-2xl' />
              </a>
            )
          }
          {
            socialMedia.youtube && (
              <a href={socialMedia.youtube} target='_blank' rel='noopener noreferrer'>
                <BsYoutube className='soMeIcon text-[1.8rem] translate-y-[1px]' />
              </a>
            )
          }
        </div>
        <div className='tracking-wide text-sm opacity-70 text-center text-primary-100 font-khorla'>
          <p className='text-s mb-2'>{`Copyright ${currentYear} © ${pageName}`}</p>
          <a href='mailto:' className='text-xs underline'>
            {emailAddress}
          </a>
        </div>
      </div>
    </>
  )
}
