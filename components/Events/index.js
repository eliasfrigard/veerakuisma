import Event from './Event'
import Title from '../Title'

import { AnimateIn } from 'eliasfrigard-reusable-components/dist/app'

const mapBandProps = (bands) => {
  return bands?.map((b) => {
    const name = b?.fields?.name
    const imageUrl = 'https:' + b?.fields?.hero?.fields?.file?.url + '?w=35'
    return { name, imageUrl }
  })
}

const ConcertList = ({ concerts, animationDirection = 'left' }) => (
  <div className="centerContent flex-col container relative w-full rounded gap-4 lg:gap-6">
    {concerts.map((c, index) => {
      const bands = mapBandProps(c?.fields?.band)
      return (
        <AnimateIn
          key={c.sys.id}
          className="w-full"
          animationType="slide"
          slideDirection={animationDirection}
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
          />
        </AnimateIn>
      )
    })}
  </div>
)

const Events = ({
  concerts,
  bandName,
  email,
  className,
  noPadding,
  titleColor,
}) => {
  const noUpcomingConcerts = (
    <AnimateIn className="centerContent flex-col container relative w-full p-6 bg-primary-950 rounded shadow-lg">
      {bandName ? (
        <div className="centerContent flex-col text-center font-khorla text-primary-100 tracking-wider py-1 gap-4 lg:gap-1">
          <p className="text-xl pb-1">
            {bandName} has no upcoming concerts at this moment
          </p>
          {email && (
            <p>
              contact{' '}
              <a className="text-accent-500 text-sm" href={`mailto:${email}`}>
                {email}
              </a>{' '}
              to book a concert
            </p>
          )}
        </div>
      ) : (
        <div className="centerContent flex-col text-center font-khorla text-primary-100 tracking-wider py-1 gap-4 lg:gap-1">
          <p className="text-xl">No upcoming concerts at this moment</p>
          {email && (
            <p>
              contact{' '}
              <a className="text-accent-500 text-sm" href={`mailto:${email}`}>
                {email}
              </a>{' '}
              to book a concert
            </p>
          )}
        </div>
      )}
    </AnimateIn>
  )

  return (
    <div
      className={`flex flex-col ${concerts?.previous?.length && 'gap-6 md:gap-14'} ${
        !noPadding && 'md:py-16 container'
      } ${className} px-4 gap-8 py-8`}
    >
      <div className="flex flex-col pt-2 lg:pt-0 gap-2 md:gap-12">
        {concerts?.upcoming?.length > 0 ? (
          <>
            <Title title="Upcoming Concerts" textColor={titleColor} />
            <ConcertList concerts={concerts.upcoming} />
          </>
        ) : (
          noUpcomingConcerts
        )}
      </div>

      {concerts?.previous?.length > 0 && (
        <div className="flex flex-col pt-2 lg:pt-0 gap-2 md:gap-12">
          <Title title="Previous Concerts" textColor={titleColor} />
          <ConcertList concerts={concerts.previous} />
        </div>
      )}
    </div>
  )
}

export default Events
