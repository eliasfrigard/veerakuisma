import React from 'react'
import Link from 'next/link'

import { useRouter } from 'next/router'

import { BsFacebook, BsInstagram, BsYoutube, BsSpotify, BsTelephone } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'

import { AnimateIn } from 'eliasfrigard-reusable-components/dist/app'
import Hamburger from './Hamburger.js'

export default function Header({ socialMedia, transparent = false, uppercaseLinks = true, fadeIn = false }) {
  const router = useRouter()

  const [currentYear, setCurrentYear] = React.useState('')
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen)
  }

  const activeLinkStyling = (path) => {
    if (router.pathname === path ||
      (path.includes(router.pathname.split('/')[1]) && router.pathname !== '/')) {
      return 'text-accent-500'
    }
  }

  React.useEffect(() => {
    const year = new Date().getFullYear()
    setCurrentYear(year.toString())
  }, [])

  const pageName = 'Veera Kuisma'

  const links = [
    {
      href: '/',
      label: 'home',
    },
    {
      href: '/about',
      label: 'about',
    },
    {
      href: '/bands',
      label: 'bands',
    },
    {
      href: '/concerts',
      label: 'concerts',
    },
    {
      href: '/gallery',
      label: 'gallery',
    },
    {
      href: '/contact',
      label: 'contact',
    },
  ]

  return (
    <>
      <AnimateIn
        disabled={!fadeIn}
        delay={1000}
        className={`w-full flex justify-start fixed top-0 items-center z-50 ${!transparent && 'backdrop-blur bg-primary-950'
          } bg-opacity-90`}
      >
        <div
          className={`
          hidden
          lg:gap-16
          lg:flex
          justify-between
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
          <div id='left' className='text-center'>
            <Link className='cursor-pointer text-xl font-bold tracking-widest uppercase' href='/'>
              {pageName}
            </Link>
          </div>
          <div id='center' className='flex gap-1 xl:gap-4 font-medium justify-center tracking-[2px]'>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${activeLinkStyling(link.href)} desktopNavLink ${uppercaseLinks && 'uppercase'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div id='right' className='flex gap-4 xl:gap-6 justify-end items-center'>
            {socialMedia?.phone && (
              <a href={`tel:${socialMedia.phone}`}>
                <BsTelephone className='soMeIcon text-xl antialiased' />
              </a>
            )}
            {socialMedia?.email && (
              <a href={`mailto:${socialMedia?.email}?subject=${pageName} Website`}>
                <AiOutlineMail className='soMeIcon text-[1.5rem] antialiased' />
              </a>
            )}
            {socialMedia?.facebook && (
              <a href={socialMedia?.facebook} target='_blank' rel='noopener noreferrer'>
                <BsFacebook className='soMeIcon text-xl' />
              </a>
            )}
            {socialMedia?.instagram && (
              <a href={socialMedia?.instagram} target='_blank' rel='noopener noreferrer'>
                <BsInstagram className='soMeIcon text-xl' />
              </a>
            )}
            {socialMedia?.spotify && (
              <a href={socialMedia?.spotify} target='_blank' rel='noopener noreferrer'>
                <BsSpotify className='soMeIcon text-xl' />
              </a>
            )}
            {socialMedia?.youtube && (
              <a href={socialMedia?.youTube} target='_blank' rel='noopener noreferrer'>
                <BsYoutube className='soMeIcon text-[1.5rem] translate-y-[1px]' />
              </a>
            )}
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
              <p className='cursor-pointer text-2xl mt-[5px] font-bold tracking-widest uppercase text-primary-100'>
                {pageName}
              </p>
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
        <div className='container flex flex-col justify-center items-center gap-6 text-primary-100 font-khorla'>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${activeLinkStyling(link.href)} mobileNavLink capitalize`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className='flex justify-center items-center gap-6 text-primary-100'>
          {socialMedia?.phone && (
            <a href={`tel:${socialMedia.phone}`}>
              <BsTelephone className='soMeIcon text-xl antialiased' />
            </a>
          )}
          {socialMedia?.email && (
            <a href={`mailto:${socialMedia?.email}?subject=${pageName} Website`}>
              <AiOutlineMail className='soMeIcon text-[1.6rem] antialiased' />
            </a>
          )}
          {socialMedia?.facebook && (
            <a href={socialMedia?.facebook} target='_blank' rel='noopener noreferrer'>
              <BsFacebook className='soMeIcon text-2xl' />
            </a>
          )}
          {socialMedia?.instagram && (
            <a href={socialMedia?.instagram} target='_blank' rel='noopener noreferrer'>
              <BsInstagram className='soMeIcon text-2xl' />
            </a>
          )}
          {socialMedia?.spotify && (
            <a href={socialMedia?.spotify} target='_blank' rel='noopener noreferrer'>
              <BsSpotify className='soMeIcon text-2xl' />
            </a>
          )}
          {socialMedia?.youtube && (
            <a href={socialMedia?.youTube} target='_blank' rel='noopener noreferrer'>
              <BsYoutube className='soMeIcon text-[1.8rem] translate-y-[1px]' />
            </a>
          )}
        </div>
        <div className='tracking-wide text-sm opacity-70 text-center text-primary-100 font-khorla'>
          <p className='text-s mb-2'>{`Copyright ${currentYear} © ${pageName}`}</p>
          <a href='mailto:' className='text-xs underline'>
            {socialMedia?.email}
          </a>
        </div>
      </div>
    </>
  )
}
