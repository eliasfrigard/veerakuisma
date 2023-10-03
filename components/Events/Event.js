import Moment from 'react-moment'
import IconHandler from '../IconHandler'

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
  return (
    <>
      <div className='hidden lg:grid w-full text-primary-200 grid-cols-3 lg:grid-cols-4 opacity-80 hover:opacity-100 duration-200 justify-items-center items-center py-8 border-b-2 border-primary-500 border-opacity-20'>
        <div className='centerContent flex-col gap-2 tracking-wider'>
          {
            displayTime && (
              <p className='text-2xl uppercase font-bold leading-none drop-shadow-sm'>
                <Moment format='HH:mm'>{date}</Moment>
              </p>
            )
          }
          <p className='text-base leading-none uppercase drop-shadow-sm'>
            <Moment format='D MMMM YYYY' className='font-bold'>
              {date}
            </Moment>
          </p>
        </div>

        <p className='font-bold text-lg text-center'>{title}</p>
        <p className='hidden lg:block font-bold opacity-80'>{cityCountry}</p>

        <IconHandler website={website} facebook={facebook} tickets={tickets} address={address} bands={bands} />
      </div>

      {/* MOBILE VIEW */}

      <div className='lg:hidden w-full text-primary-200 flex flex-col gap-7 opacity-80 hover:opacity-100 cursor-pointer duration-200 justify-items-center items-center py-10 border-b-2 border-primary-500 border-opacity-20'>
        <p className='text-xl leading-none uppercase drop-shadow-sm'>
          <Moment format='D MMMM YYYY' className='font-bold'>
            {date}
          </Moment>
        </p>

        <p className='font-bold text-lg text-center'>{title}</p>
        <p className='hidden lg:block font-bold opacity-80'>{cityCountry}</p>

        <IconHandler website={website} facebook={facebook} tickets={tickets} address={address} bands={bands} />
      </div>
    </>
  )
}

export default Event
