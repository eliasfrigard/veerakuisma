import React from 'react'
import Avatar from './Avatar'

import { Tooltip } from "@material-tailwind/react"
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

  const LinkIcon = ({ children, href, tooltip }) => {
    return (
      <Tooltip content={tooltip} className='bg-primary-950 border border-primary-100 font-khorla tracking-wider px-3 py-2'>
        <div>
          {children}
        </div>
      </Tooltip>
    )
  }

  return (
    <div className={`flex text-2xl justify-center items-center gap-3 lg:gap-4 z-10 text-accent-500 ${className}`}>
      {
        address && (
          <LinkIcon href={addressLink} tooltip='Google Maps'>
            <BsPinMapFill className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        email && (
          <LinkIcon href={mailLink} tooltip='Email'>
            <BsMailbox className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        website && (
          <LinkIcon href={website} tooltip='Website'>
            <BsGlobeEuropeAfrica className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        tickets && (
          <LinkIcon href={tickets} tooltip='Tickets'>
            <BsTicketPerforated className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        facebook && (
          <LinkIcon href={facebook} tooltip='Facebook'>
            <BsFacebook className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        instagram && (
          <LinkIcon href={instagram} tooltip='Instagram'>
            <BsInstagram className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        spotify && (
          <LinkIcon href={spotify} tooltip='Spotify'>
            <BsSpotify className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        youTube && (
          <LinkIcon href={youTube} tooltip='YouTube'>
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
