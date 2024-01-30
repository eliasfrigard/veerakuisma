import React from 'react'
import Moment from 'react-moment'
import IconHandler from '../IconHandler'
import Button from '../Button'
import Avatar from '../Avatar'

import { IoMdPin } from 'react-icons/io'
import { BsFacebook, BsGlobeEuropeAfrica, BsInstagram, BsYoutube, BsSpotify, BsMailbox, BsPinMapFill, BsTicketPerforated } from 'react-icons/bs'

const Event = ({
  title,
  date,
  displayTime,
  cityCountry,
  address,
  bands,
  website,
  facebook,
  tickets,
  last = false,
  first = false,
}) => {
  // const [addressLink, setAddressLink] = React.useState(null)

  // React.useEffect(() => {
  //   if (!address) {
  //     setAddressLink(null)
  //   } else {
  //     setAddressLink(`https://www.google.com/maps?q=${address.lat},${address.lon}`)
  //   }
  // }, [address])

  return (
    <>
      {/* <div className='hidden lg:grid w-full text-primary-200 grid-cols-3 lg:grid-cols-4 hover:opacity-100 duration-200 justify-items-center items-center py-6 border-b-2 border-primary-500 border-opacity-20 bg-primary-950 rounded shadow-xl'>
        {
          displayTime ? (

            <div className='centerContent flex-col gap-2 tracking-wider'>
              <p className='text-xl uppercase font-bold leading-none drop-shadow-sm'>
                <Moment format='HH:mm'>{date}</Moment>
              </p>
              <p className='text-base leading-none uppercase drop-shadow-sm'>
                <Moment format='D MMMM YYYY' className='font-bold'>
                  {date}
                </Moment>
              </p>
            </div>
          ) : (
            <div className='centerContent flex-col gap-2 tracking-wider'>
              <p className='text-base leading-none uppercase drop-shadow-sm'>
                <Moment format='D MMMM' className='font-bold'>
                  {date}
                </Moment>
              </p>
              <p className='text-xl uppercase font-bold leading-none drop-shadow-sm'>
                <Moment format='YYYY'>{date}</Moment>
              </p>
            </div>
          )
        }

        <p className='font-bold text-center'>{title}</p>

        <div className='flex gap-2 centerContent items-center'>
          <IoMdPin className='text-accent-500' />
          <p className='hidden lg:block font-bold'>{cityCountry}</p>
        </div>

        <IconHandler website={website} facebook={facebook} tickets={tickets} address={address} bands={bands} />
      </div> */}

      {/* MOBILE VIEW */}

      {/* <div className='lg:hidden w-full text-primary-200 flex flex-col gap-6 hover:opacity-100 cursor-pointer duration-200 justify-items-center items-center py-7 border-b-2 border-primary-500 border-opacity-20 bg-primary-950 rounded px-6'>
        <p className='text-xl leading-none uppercase drop-shadow-sm'>
          <Moment format='D MMMM YYYY' className='font-bold'>
            {date}
          </Moment>
        </p>

        <div className='h-[1px] w-3/4 bg-primary-100 bg-opacity-10 rounded-full' />

        <div className='flex flex-col centerContent gap-2 leading-relaxed'>
          <p className='font-bold text-center'>{title}</p>
          <div className='flex gap-2 centerContent items-center'>
            <BsPinMapFill className='text-accent-500' />
            <p className='block font-medium text-sm'>{cityCountry}</p>
          </div>
        </div>

        {
          (address || website || facebook || tickets || bands) && (
            <IconHandler website={website} facebook={facebook} tickets={tickets} address={address} bands={bands} />
          )
        }

        {
          (addressLink || website || facebook || tickets || bands) && (
            <div className='w-full gap-3 flex flex-col centerContent'>
              {tickets && (
                <Button href={tickets}>
                  <div className='flex w-full justify-center items-center px-3 gap-3 text-primary-50'>
                    <BsTicketPerforated className='text-lg' />
                    <p>Tickets</p>
                  </div>
                </Button>
              )}

              {website && (
                <Button href={website}>
                  <div className='flex w-full justify-center items-center px-3 gap-3 text-primary-50'>
                    <BsGlobeEuropeAfrica className='text-lg' />
                    <p>Event Link</p>
                  </div>
                </Button>
              )}

              {addressLink && (
                <Button href={addressLink}>
                  <div className='flex w-full justify-center items-center px-3 gap-3 text-primary-50'>
                    <BsPinMapFill className='text-lg' />
                    <p>Google Maps</p>
                  </div>
                </Button>
              )}

              {facebook && (
                <Button href={facebook}>
                  <div className='flex w-full justify-center items-center px-3 gap-3 text-primary-50'>
                    <BsFacebook className='text-lg' />
                    <p>Facebook</p>
                  </div>
                </Button>
              )}

              {
                (facebook || addressLink || website || tickets) &&
                bands?.length > 0 && (
                  <div className="h-[1px] my-1 w-3/4 bg-primary-100 bg-opacity-10 rounded-full" />
                )
              }

              {
                bands?.length && bands?.map((b) => (
                  <Button key={b.name} href={`/bands/${b.name.toLowerCase()}`}>
                    <div className='flex w-full justify-center items-center px-3 gap-3'>
                      <Avatar imageUrl={b.imageUrl} bandName={b.name} />
                      <p>{b.name}</p>
                    </div>
                  </Button>
                ))
              }
            </div>
          )
        }
      </div> */}
    </>
  )
}

export default Event
