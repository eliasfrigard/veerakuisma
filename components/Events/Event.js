import React from 'react'
import { formatDate } from '../../util/helpers'
import IconHandler from '../IconHandler'
import Button from '../Button'
import Avatar from '../Avatar'

import { IoMdPin } from 'react-icons/io'
import {
  BsFacebook,
  BsGlobeEuropeAfrica,
  BsArrowRightShort,
  BsPinMapFill,
  BsTicketPerforated,
} from 'react-icons/bs'

const Event = ({
  title,
  date,
  endDate,
  displayTime,
  cityCountry,
  address,
  bands,
  website,
  facebook,
  tickets,
}) => {
  const addressLink = address
    ? `https://www.google.com/maps?q=${address.lat},${address.lon}`
    : null

  const differentYears =
    date && endDate
      ? new Date(date).getFullYear() !== new Date(endDate).getFullYear()
      : false

  return (
    <>
      <div className="hidden lg:grid w-full text-primary-200 grid-cols-3 lg:grid-cols-4 duration-200 justify-items-center items-center py-6 border-l-8 border-accent-500 border-opacity-100 bg-primary-950 rounded-lg shadow-lg">
        {endDate && (
          <div className="centerContent flex-col gap-2 tracking-wider">
            <div className="centerContent text-base gap-1 leading-none uppercase drop-shadow-sm">
              <span className="font-bold">{formatDate(date, 'D MMM')}</span>
              <BsArrowRightShort className="text-primary-50 text-xl" />
              <span className="font-bold">{formatDate(endDate, 'D MMM')}</span>
            </div>

            <div className="centerContent gap-1">
              <p className="text-xl uppercase font-bold leading-none drop-shadow-sm">
                {formatDate(date, 'YYYY')}
              </p>

              {differentYears && (
                <>
                  <BsArrowRightShort className="text-primary-50 text-xl" />
                  <p className="text-xl uppercase font-bold leading-none drop-shadow-sm">
                    {formatDate(endDate, 'YYYY')}
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {!endDate && displayTime ? (
          <div className="centerContent flex-col gap-2 tracking-wider">
            <p className="text-xl uppercase font-bold leading-none drop-shadow-sm">
              {formatDate(date, 'HH:mm')}
            </p>
            <p className="text-base leading-none uppercase drop-shadow-sm">
              <span className="font-bold">
                {formatDate(date, 'D MMMM YYYY')}
              </span>
            </p>
          </div>
        ) : (
          !endDate && (
            <div className="centerContent flex-col gap-2 tracking-wider">
              <p className="text-base leading-none uppercase drop-shadow-sm">
                <span className="font-bold">{formatDate(date, 'D MMMM')}</span>
              </p>
              <p className="text-xl uppercase font-bold leading-none drop-shadow-sm">
                {formatDate(date, 'YYYY')}
              </p>
            </div>
          )
        )}

        <p className="font-bold text-center">{title}</p>

        <div className="flex gap-2 centerContent items-center">
          <IoMdPin className="text-accent-500" />
          <p className="hidden lg:block font-bold">{cityCountry}</p>
        </div>

        <IconHandler
          website={website}
          facebook={facebook}
          tickets={tickets}
          address={address}
          bands={bands}
        />
      </div>

      {/* MOBILE VIEW */}

      <div className="lg:hidden w-full text-primary-200 flex flex-col gap-7 hover:opacity-100 cursor-pointer duration-200 justify-items-center items-center py-8 border-b-2 border-primary-500 border-opacity-20 bg-primary-950 rounded-lg px-8">
        {endDate ? (
          <div className="centerContent flex-col gap-2 tracking-wider leading-relaxed">
            <div className="centerContent gap-1">
              <p className="text-xl leading-none uppercase drop-shadow-sm">
                <span className="font-extrabold">
                  {formatDate(date, 'D MMM')}
                </span>
              </p>
              <BsArrowRightShort className="text-primary-50 text-xl" />
              <p className="text-xl leading-none uppercase drop-shadow-sm">
                <span className="font-extrabold">
                  {formatDate(endDate, 'D MMM')}
                </span>
              </p>
            </div>

            <div className="centerContent gap-1">
              <p
                className={`${
                  differentYears ? 'text-xl' : 'text-2xl'
                }  uppercase font-extrabold leading-none drop-shadow-sm`}
              >
                {formatDate(date, 'YYYY')}
              </p>

              {differentYears && (
                <>
                  <BsArrowRightShort className="text-primary-50 text-xl" />
                  <p className="text-xl uppercase font-extrabold leading-none drop-shadow-sm">
                    {formatDate(endDate, 'YYYY')}
                  </p>
                </>
              )}
            </div>
          </div>
        ) : (
          <p className="text-xl leading-none uppercase drop-shadow-sm tracking-wider">
            <span className="font-extrabold">
              {formatDate(date, 'D MMMM YYYY')}
            </span>
          </p>
        )}

        <div className="h-[1px] w-3/4 bg-primary-100 bg-opacity-10 rounded-full" />

        <div className="flex flex-col centerContent gap-2 leading-relaxed tracking-wide -mt-1">
          <p className="font-bold text-center">{title}</p>
          <div className="flex gap-2 centerContent items-center">
            <BsPinMapFill className="text-accent-500" />
            <p className="block font-medium text-sm">{cityCountry}</p>
          </div>
        </div>

        {/* {
          (address || website || facebook || tickets || bands) && (
            <IconHandler website={website} facebook={facebook} tickets={tickets} address={address} bands={bands} />
          )
        } */}

        {(addressLink || website || facebook || tickets || bands) && (
          <div className="w-full gap-3 flex flex-col centerContent">
            {tickets && (
              <Button href={tickets}>
                <div className="flex w-full justify-center items-center px-3 gap-3 text-primary-50">
                  <BsTicketPerforated className="text-lg" />
                  <p>Tickets</p>
                </div>
              </Button>
            )}

            {website && (
              <Button href={website}>
                <div className="flex w-full justify-center items-center px-3 gap-3 text-primary-50">
                  <BsGlobeEuropeAfrica className="text-lg" />
                  <p>Event Link</p>
                </div>
              </Button>
            )}

            {addressLink && (
              <Button href={addressLink}>
                <div className="flex w-full justify-center items-center px-3 gap-3 text-primary-50">
                  <BsPinMapFill className="text-lg" />
                  <p>Google Maps</p>
                </div>
              </Button>
            )}

            {facebook && (
              <Button href={facebook}>
                <div className="flex w-full justify-center items-center px-3 gap-3 text-primary-50">
                  <BsFacebook className="text-lg" />
                  <p>Facebook</p>
                </div>
              </Button>
            )}

            {(facebook || addressLink || website || tickets) &&
              bands?.length > 0 && (
                <div className="h-[1px] my-1 w-3/4 bg-primary-100 bg-opacity-10 rounded-full" />
              )}

            {bands?.length &&
              bands?.map((b) => (
                <Button
                  key={b.name}
                  link
                  href={`/bands/${b.name.toLowerCase()}`}
                >
                  <div className="flex w-full justify-center items-center px-3 gap-3">
                    <Avatar imageUrl={b.imageUrl} bandName={b.name} />
                    <p>{b.name}</p>
                  </div>
                </Button>
              ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Event
