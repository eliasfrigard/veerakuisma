export default function Button({ children, href, className }) {
  return (
    <div className='centerContent w-full'>
      {!href ? (
        <button className={`centerContent w-full min-h-12 rounded-lg bg-accent-500 shadow-md text-primary-500 cursor-default select-none tracking-widest uppercase font-medium text-sm opacity-30 ${className}`}>
          {children}
        </button>
      ) : (
        <a
          href={href}
          target='_blank'
          rel='noopener noreferrer nofollow'
          className='w-full flex justify-center items-center'
        >
          <button className={`centerContent w-full h-12 rounded-lg bg-accent-500 shadow text-primary-950 hover:cursor-pointer duration-150 select-none tracking-widest uppercase font-bold text-sm active:scale-[0.98] ${className}`}>
            {children}
          </button>
        </a>
      )}
    </div>
  )
}