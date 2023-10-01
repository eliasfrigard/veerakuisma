import { AiOutlineMail } from 'react-icons/ai'
import { BsFacebook, BsInstagram, BsYoutube, BsSpotify } from 'react-icons/bs'

const SocialMediaIcons = ({ className }) => {
  return (
    <div className={`flex text-accent-500 text-2xl justify-center items-center mr-6 gap-6 z-10 ${className}`}>
      <a
        className='hover:text-primary-500 duration-200'
        href='mailto:polentamusic@gmail.com?subject=Polenta Music Website'
      >
        <AiOutlineMail className='soMeIcon antialiased' />
      </a>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.facebook.com/Polentamusic'
        className='duration-200 hover:text-primary-500'
      >
        <BsFacebook className='soMeIcon' />
      </a>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.instagram.com/polentamusic/'
        className='duration-200 hover:text-primary-500'
      >
        <BsInstagram className='soMeIcon' />
      </a>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://open.spotify.com/artist/6LCSzEXMsFKhWkOAp1wP4E?si=SunHecGiSISfPt1Zmv2W3A'
        className='duration-200 hover:text-primary-500'
      >
        <BsSpotify className='soMeIcon' />
      </a>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.youtube.com/@polentamusic650'
        className='duration-200 hover:text-primary-500'
      >
        <BsYoutube className='soMeIcon translate-y-[1px]' />
      </a>
    </div>
  )
}

export default SocialMediaIcons
