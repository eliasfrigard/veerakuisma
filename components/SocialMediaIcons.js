import { AiOutlineMail } from 'react-icons/ai'
import { BsFacebook, BsInstagram, BsYoutube, BsSpotify } from 'react-icons/bs'

export default function SocialMediaIcons() {
  return (
    <div className='flex justify-center items-center mr-6 gap-6'>
      <a
        className='opacity-50 hover:opacity-100 duration-500'
        href='mailto:polentamusic@gmail.com?subject=Polenta Music Website'>
        <AiOutlineMail className='soMeIcon text-[1.5rem] antialiased' />
      </a>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.facebook.com/Polentamusic'
        className='opacity-50 hover:opacity-100 duration-500'
      >
        <BsFacebook className='soMeIcon text-xl' />
      </a>
      <a
        target='_blank' rel='noopener noreferrer'
        href='https://www.instagram.com/polentamusic/'
        className='opacity-50 hover:opacity-100 duration-500'
      >
        <BsInstagram className='soMeIcon text-xl' />
      </a>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://open.spotify.com/artist/6LCSzEXMsFKhWkOAp1wP4E?si=SunHecGiSISfPt1Zmv2W3A'
        className='opacity-50 hover:opacity-100 duration-500'
      >
        <BsSpotify className='soMeIcon text-xl' />
      </a>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.youtube.com/@polentamusic650'
        className='opacity-50 hover:opacity-100 duration-500'
      >
        <BsYoutube className='soMeIcon text-[1.5rem] translate-y-[1px]' />
      </a>
    </div>
  )
}