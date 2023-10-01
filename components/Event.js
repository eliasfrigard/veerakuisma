import Moment from 'react-moment'
import { IoMdGlobe, IoMdPin } from 'react-icons/io'
import { BsCalendar3 } from 'react-icons/bs'
import AnimateIn from './AnimateIn'
import SocialMediaIcons from './SocialMediaIcons'

export default function Event({ venue, date, city, country, last = false, first = false, link }) {
  return (
    <>
      <div className='hidden lg:grid w-full text-primary-200 grid-cols-3 lg:grid-cols-4 opacity-80 hover:opacity-100 cursor-pointer duration-200 justify-items-center items-center py-8 border-b-2 border-primary-500 border-opacity-20'>
        <div className='centerContent flex-col gap-2 tracking-wider'>
          <p className='text-2xl uppercase font-bold leading-none drop-shadow-sm'>
            <Moment format='HH:mm'>{date}</Moment>
          </p>
          <p className='text-base leading-none uppercase drop-shadow-sm'>
            <Moment format='D MMMM YYYY' className='font-bold'>{date}</Moment>
          </p>
        </div>

        <p className='font-bold text-lg text-center'>ALDA @ Perinnearkku Klubi</p>
        <p className='hidden lg:block font-bold opacity-80'>Helsinki, FI</p>
        <SocialMediaIcons className='mr-0' />
      </div>

      <div className='lg:hidden w-full text-primary-200 flex flex-col gap-7 opacity-80 hover:opacity-100 cursor-pointer duration-200 justify-items-center items-center py-10 border-b-2 border-primary-500 border-opacity-20'>
        <p className='text-xl leading-none uppercase drop-shadow-sm'>
          <Moment format='D MMMM YYYY' className='font-bold'>{date}</Moment>
        </p>

        <p className='font-bold text-lg text-center'>ALDA @ Perinnearkku Klubi</p>
        <p className='hidden lg:block font-bold opacity-80'>Helsinki, FI</p>
        <SocialMediaIcons className='mr-0' />
      </div>
    </>

    // MOBILE VIEW

    //   <AnimateIn
    //     classes={`mt-4 ${!last && 'mb-4'
    //       } lg:hidden centerContent py-12 max-w-[85vw] w-full flex flex-col gap-7 rounded-lg shadow-md bg-secondary-500 bg-opacity-[4%]`}
    //   >
    //     <BsCalendar3 className='text-4xl shadow-md text-accent-500'></BsCalendar3>
    //     <div className='centerContent flex-col gap-4'>
    //       <p className='text-4xl uppercase font-bold leading-none drop-shadow-sm'>
    //         <Moment format='HH:mm'>{date}</Moment>
    //       </p>
    //       <p className='text-lg font-medium leading-none uppercase drop-shadow-sm'>
    //         <Moment format='D MMMM YYYY'>{date}</Moment>
    //       </p>
    //     </div>
    //     <div className='centerContent flex flex-col gap-2 drop-shadow-sm font-medium'>
    //       <div className='centerContent flex gap-2 drop-shadow-sm text-center px-10'>
    //         {/* <IoMdPin className='text-xl opacity-80 text-accent-500'></IoMdPin> */}
    //         {venue}
    //       </div>
    //       <div className='centerContent flex gap-2 drop-shadow-sm'>
    //         {/* <IoMdGlobe className='text-xl opacity-80 text-accent-500'></IoMdGlobe> */}
    //         {city}, {country}
    //       </div>
    //     </div>
    //     <div className='centerContent w-full'>
    //       {!link ? (
    //         <button className='centerContent w-3/4 h-12 rounded-lg bg-accent-500 shadow-md text-primary-500 cursor-default select-none tracking-widest uppercase font-medium text-sm opacity-30'>
    //           Event Link
    //         </button>
    //       ) : (
    //         <a
    //           href={link}
    //           target='_blank'
    //           rel='noopener noreferrer nofollow'
    //           className='w-full flex justify-center items-center'
    //         >
    //           <button className='centerContent w-3/4 h-12 rounded-lg bg-accent-500 shadow-md text-primary-500 hover:cursor-pointer hover:bg-secondary-500 duration-150 select-none tracking-widest uppercase font-medium text-sm active:scale-[0.98]'>
    //             Event Link
    //           </button>
    //         </a>
    //       )}
    //     </div>
    //   </AnimateIn>
    // </>
  )
}
