// ConcertsList.js

import React from 'react'
import Event from './Event'
import Title from '../Title'

import { AnimateIn } from 'eliasfrigard-reusable-components/dist/app'

const Events = ({ concerts, bandName, email, className, noPadding, titleColor }) => {
  const [prevConcertCount, setPrevConcertCount] = React.useState(6)

  const mapBandProps = (bands) => {
    return bands?.map((b) => {
      const name = b?.fields?.name
      const imageUrl = 'https:' + b?.fields?.hero?.fields?.file?.url + '?w=35'

      return { name, imageUrl }
    })
  }

  const upcomingConcerts = concerts?.upcoming?.map((c, index) => {
    const bands = mapBandProps(c?.fields?.band)

    return (
      <AnimateIn key={c.sys.id} className='w-full' animationType='slide' slideDirection='left'>
        <Event
          key={c.sys.id}
          title={c.fields.title}
          date={c.fields.dateTime}
          displayTime={c.fields.displayTime}
          cityCountry={c.fields.cityCountry}
          address={c.fields.address}
          bands={bands}
          website={c.fields.website}
          facebook={c.fields.facebook}
          tickets={c.fields.tickets}
          first={index === 0}
          last={index + 1 === concerts.upcoming.length}
        />
      </AnimateIn>
    )
  })

  const noUpcomingConcerts = (
    <AnimateIn className='centerContent flex-col container relative w-full p-6 bg-primary-950 rounded shadow-lg'>
      {bandName ? (
        <div className='centerContent flex-col text-center font-khorla text-primary-100 tracking-wider py-1 gap-4 lg:gap-1'>
          <p className='text-xl pb-1'>{bandName} has no upcoming concerts at this moment</p>
          {email && (
            <p>
              contact{' '}
              <a className='text-accent-500 text-sm' href={`mailto:${email}`}>
                {email}
              </a>{' '}
              to book a concert
            </p>
          )}
        </div>
      ) : (
        <div className='centerContent flex-col text-center font-khorla text-primary-100 tracking-wider py-1 gap-4 lg:gap-1'>
          <p className='text-xl'>No upcoming concerts at this moment</p>
          {email && (
            <p>
              contact{' '}
              <a className='text-accent-500 text-sm' href={`mailto:${email}`}>
                {email}
              </a>{' '}
              to book a concert
            </p>
          )}
        </div>
      )}
    </AnimateIn>
  )

  const previousConcerts = concerts?.previous?.map((c, index) => {
    const bands = mapBandProps(c?.fields?.band)

    return (
      <AnimateIn key={c.sys.id} className='w-full' animationType='slide' slideDirection='left'>
        <Event
          title={c.fields.title}
          date={c.fields.dateTime}
          displayTime={c.fields.displayTime}
          cityCountry={c.fields.cityCountry}
          address={c.fields.address}
          bands={bands}
          website={c.fields.website}
          facebook={c.fields.facebook}
          tickets={c.fields.tickets}
          first={index === 0}
          last={index + 1 === concerts.previous.length}
        />
      </AnimateIn>
    )
  })

  const increasePrevConcertCount = () => {
    if (prevConcertCount >= previousConcerts.length) return
    setPrevConcertCount((prev) => prev + 6)
  }

  return (
    <div
      className={`flex flex-col ${concerts?.previous?.length && 'gap-6 md:gap-14'} ${!noPadding && 'md:py-16 container'
        } ${className} px-4 gap-8 py-8`}
    >
      <div className='flex flex-col pt-2 lg:pt-0 gap-2 md:gap-12'>
        {upcomingConcerts?.length > 0 ? (
          <>
            <Title title='Upcoming Concerts' textColor={titleColor} />
            <div className='centerContent flex-col container relative w-full rounded gap-4 lg:gap-6'>
              {upcomingConcerts}
            </div>
          </>
        ) : (
          noUpcomingConcerts
        )}
      </div>

      {previousConcerts?.length > 0 && (
        <div
          className='flex flex-col pt-2 lg:pt-0 gap-2 md:gap-12'
          animationType='slide'
          slideDirection='bottom'
        >
          <Title title='Previous Concerts' textColor={titleColor} />
          <div className='centerContent flex-col container relative w-full rounded gap-4 px-2 lg:gap-6'>
            {previousConcerts.map((concert, index) => {
              return (
                <div key={index} className={`w-full`}>
                  {concert}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Events
