// ConcertsList.js

import React from 'react';
import Event from './Event';
import Title from '../Title';

const Events = ({ concerts, bandName }) => {
  const mapBandProps = (bands) => {
    return bands.map((b) => {
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
    <div className='centerContent flex-col container relative w-full p-6 bg-primary-950 rounded shadow-lg'>
      {
        bandName ? (
          <p className='text-xl leading-loose text-center tracking-wider font-bold font-khorla text-primary-100'>
            {bandName} has no upcoming concerts at this moment
          </p>
        ) : (
          <p className='text-xl leading-loose text-center tracking-wider font-bold font-khorla text-primary-100'>
            No upcoming concerts at this moment
          </p>
        )
      }
    </div>
  );

  const previousConcerts = concerts?.previous?.map((c, index) => {
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
        last={index + 1 === concerts.previous.length}
      />
    )
  })

  return (
    <div className={`flex flex-col ${concerts?.previous?.length && 'gap-10 md:gap-24'} py-10 md:py-24`}>
      <div className='flex flex-col gap-4 md:gap-12 px-4 md:px-0'>
        <Title title='Upcoming' />
        {upcomingConcerts?.length > 0 ? (
          <div className='centerContent flex-col container relative w-full bg-primary-950 rounded shadow-lg px-6'>
            {upcomingConcerts}
          </div>
        ) : noUpcomingConcerts}
      </div>

      {previousConcerts?.length > 0 && (
        <div className='flex flex-col gap-4 md:gap-12 px-4 md:px-0'>
          <Title title='Previous' />
          <div className='centerContent flex-col container relative w-full px-6 bg-primary-950 rounded shadow-lg'>
            {previousConcerts}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events
