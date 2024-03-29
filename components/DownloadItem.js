import { BsDownload } from 'react-icons/bs'
import { AnimateIn } from 'eliasfrigard-reusable-components/dist/app'

export default function DownloadItem({ title, filename, file }) {
  return (
    <a href={file} rel="noopener noreferrer">
      <div className='flex items-center justify-between gap-8 p-6 md:p-8 min-h-[90px] cursor-pointer w-full border-l-8 border-accent-500 rounded-lg bg-primary-950 shadow-md hover:bg-accent-500 text-primary-100 hover:text-primary-100 active:scale-[0.97] duration-150 select-none	'>
        <div className='flex flex-col justify-between gap-1'>
          <p className='text text-base md:text-normal font-medium font-khorla tracking-wide leading-relaxed'>{title}</p>
          <p className='text hidden md:block text-sm italic tracking-wide'>{filename}</p>
        </div>

        <BsDownload className={`text-2xl min-w-[30px]`}></BsDownload>
      </div>
    </a>
  )
}
