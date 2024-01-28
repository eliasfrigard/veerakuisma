// ConcertsList.js

import React from 'react';
import Event from './Event';
import Title from '../Title';
import AnimateIn from '../AnimateIn';

const Events = ({ concerts, bandName, email, className, noPadding }) => {
  const mapBandProps = (bands) => {
    return bands?.map((b) => {
      const name = b?.fields?.name;
      const imageUrl = 'https:' + b?.fields?.hero?.fields?.file?.url + '?w=35';

      return { name, imageUrl };
    })
  }

  const upcomingConcerts = concerts?.upcoming?.map((c, index) => {
    const bands = mapBandProps(c?.fields?.band)

    return (
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
    )
  })

  const noUpcomingConcerts = (
    <AnimateIn className='centerContent flex-col container relative w-full p-6 bg-primary-950 rounded shadow-lg'>
      {
        bandName ? (
          <div className='centerContent flex-col text-center font-khorla text-primary-100 tracking-wider py-1 gap-4 lg:gap-2'>
            <p className='text-xl pb-1'>
              {bandName} has no upcoming concerts at this moment
            </p>
            {
              email && (
                <p>contact <a className='text-accent-500 text-sm' href={`mailto:${email}`}>{email}</a> to book a concert</p>
              )
            }
          </div>
        ) : (
          <div className='centerContent flex-col text-center font-khorla text-primary-100 tracking-wider py-1 gap-4 lg:gap-2'>
            <p className='text-xl'>
              No upcoming concerts at this moment
            </p>
            {
              email && (
                <p>contact <a className='text-accent-500 text-sm' href={`mailto:${email}`}>{email}</a> to book a concert</p>
              )
            }
          </div>
        )
      }
    </AnimateIn>
  );

  const previousConcerts = concerts?.previous?.map((c, index) => {
    const bands = mapBandProps(c?.fields?.band)

    return (
      <AnimateIn
        key={c.sys.id}
        className='w-full'
        animationType='slide'
      >
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

  return (
    <div className={`flex flex-col ${concerts?.previous?.length && 'gap-6 md:gap-16'} ${!noPadding && 'py-6 md:py-16'} ${className}`}>
      <div className='flex flex-col gap-2 md:gap-12 px-6 md:px-0'>
        <Title title='Upcoming Concerts' />
        {upcomingConcerts?.length > 0 ? (
          <div className='centerContent flex-col container relative w-full rounded gap-4 lg:gap-6'>
            {upcomingConcerts}
          </div>
        ) : noUpcomingConcerts}
      </div>

      {previousConcerts?.length > 0 && (
        <div className='flex flex-col gap-2 md:gap-12 px-6 md:px-0'>
          <Title title='Previous Concerts' />
          <div className='centerContent flex-col container relative w-full rounded gap-4 lg:gap-6'>
            {previousConcerts}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events
