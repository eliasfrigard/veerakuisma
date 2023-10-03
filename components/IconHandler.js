import React from 'react'
import Avatar from './Avatar'

import { BsFacebook, BsGlobeEuropeAfrica, BsInstagram, BsYoutube, BsSpotify, BsMailbox, BsPinMapFill, BsTicketPerforated } from 'react-icons/bs'

const IconHandler = ({
  email,
  facebook,
  instagram,
  spotify,
  youTube,
  website,
  tickets,
  address,
  bands,
  className,
  websiteName,
}) => {
  const [mailLink, setMailLink] = React.useState(null)
  const [addressLink, setAddressLink] = React.useState(null)

  React.useEffect(() => {
    if (!address) {
      setAddressLink(null)
    } else {
      setAddressLink(`https://www.google.com/maps?q=${address.lat},${address.lon}`)
    }
  }, [address])

  React.useEffect(() => {
    if (!email) {
      setMailLink(null)
    } else {
      setMailLink(`mailto:${email}??subject=${websiteName} Website`)
    }
  }, [email, websiteName])

  const LinkIcon = ({ children, href }) => {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='duration-200 hover:text-primary-500'
      >
        {children}
      </a>
    )
  }

  return (
    <div className={`flex text-accent-500 text-2xl justify-center items-center gap-6 z-10 ${className}`}>
      {
        address && (
          <LinkIcon href={addressLink}>
            <BsPinMapFill className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        email && (
          <LinkIcon href={mailLink}>
            <BsMailbox className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        website && (
          <LinkIcon href={website}>
            <BsGlobeEuropeAfrica className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        tickets && (
          <LinkIcon href={tickets}>
            <BsTicketPerforated className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        facebook && (
          <LinkIcon href={facebook}>
            <BsFacebook className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        instagram && (
          <LinkIcon href={instagram}>
            <BsInstagram className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        spotify && (
          <LinkIcon href={spotify}>
            <BsSpotify className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        youTube && (
          <LinkIcon href={youTube}>
            <BsYoutube className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        bands && (
          bands.map((b) => <Avatar key={b.name} imageUrl={b.imageUrl} bandName={b.name} />)
        )
      }
    </div>
  )
}

export default IconHandler
