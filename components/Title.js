import { AnimateIn } from 'eliasfrigard-reusable-components/dist/app'

const Title = ({ title, subtitle, textColor = 'text-primary-950', borderColor = 'border-black' }) => {
  if (!title) return ''

  return (
    <AnimateIn
      animationType='slide'
      slideDirection='bottom'
      className='px-4 w-3/4 md:w-full md:px-0 container flex flex-col justify-center items-center'
    >
      <p
        className={`text-center text-3xl md:text-5xl font-khorla pb-4 md:pb-0 font-bold tracking-wider opacity-80 leading-loose md:leading-none uppercase ${textColor} ${borderColor} border-opacity-20 px-4 underline underline-offset-[18px] decoration-accent-600 mb-5`}
      >
        {title}
      </p>
      {subtitle && <p className='mt-4 text-xl text-center'>{subtitle}</p>}
    </AnimateIn>
  )
}

export default Title
