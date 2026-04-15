import Avatar from './Avatar'
import Tooltip from './Tooltip'

import {
  BsFacebook,
  BsGlobeEuropeAfrica,
  BsInstagram,
  BsYoutube,
  BsSpotify,
  BsMailbox,
  BsPinMapFill,
  BsTicketPerforated,
} from 'react-icons/bs'

const LinkIcon = ({ children, href, tooltip }) => (
  <Tooltip tooltip={tooltip}>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="duration-200 hover:text-accent-500"
    >
      {children}
    </a>
  </Tooltip>
)

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
  const addressLink = address
    ? `https://www.google.com/maps?q=${address.lat},${address.lon}`
    : null

  const mailLink = email
    ? `mailto:${email}?subject=${websiteName} Website`
    : null

  return (
    <div
      className={`flex text-2xl justify-center items-center gap-3 lg:gap-4 z-10 text-accent-500 ${className}`}
    >
      {address && (
        <LinkIcon href={addressLink} tooltip="Google Maps">
          <BsPinMapFill className="soMeIcon" />
        </LinkIcon>
      )}
      {email && (
        <LinkIcon href={mailLink} tooltip="Email">
          <BsMailbox className="soMeIcon" />
        </LinkIcon>
      )}
      {website && (
        <LinkIcon href={website} tooltip="Website">
          <BsGlobeEuropeAfrica className="soMeIcon" />
        </LinkIcon>
      )}
      {tickets && (
        <LinkIcon href={tickets} tooltip="Tickets">
          <BsTicketPerforated className="soMeIcon" />
        </LinkIcon>
      )}
      {facebook && (
        <LinkIcon href={facebook} tooltip="Facebook">
          <BsFacebook className="soMeIcon" />
        </LinkIcon>
      )}
      {instagram && (
        <LinkIcon href={instagram} tooltip="Instagram">
          <BsInstagram className="soMeIcon" />
        </LinkIcon>
      )}
      {spotify && (
        <LinkIcon href={spotify} tooltip="Spotify">
          <BsSpotify className="soMeIcon" />
        </LinkIcon>
      )}
      {youTube && (
        <LinkIcon href={youTube} tooltip="YouTube">
          <BsYoutube className="soMeIcon" />
        </LinkIcon>
      )}
      {bands &&
        bands.map((b) => (
          <Avatar key={b.name} imageUrl={b.imageUrl} bandName={b.name} />
        ))}
    </div>
  )
}

export default IconHandler
