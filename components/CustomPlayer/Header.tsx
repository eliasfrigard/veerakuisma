import React from 'react'

import { IoPlaySkipForward, IoPlaySkipBack, IoPlay, IoPause } from "react-icons/io5";

interface HeaderProps {
  totalTime?: number
  currentTime?: number
  isPlaying?: boolean
  handleClickPlayButton?: () => void
  handleNextTrack?: () => void
  handleSeek?: (newTime: number) => void
}

const Header: React.FC<HeaderProps> = ({ 
  isPlaying,
  totalTime = 0,
  currentTime = 0,
  handleNextTrack,
  handleClickPlayButton,
  handleSeek,
}) => {
  const [hoverPercentage, setHoverPercentage] = React.useState<number | null>(null);

  const progressPercentage = totalTime > 0 ? (currentTime / totalTime) * 100 : 0
  const remainingTime = Math.max(totalTime - currentTime, 0)

  React.useEffect(() => {
    if (Math.round(remainingTime) === 0 && handleNextTrack) {
      handleNextTrack()
    }
  }, [remainingTime, handleNextTrack])

  // Convert seconds into minutes and seconds
  const minutes = Math.floor(remainingTime / 60)
  const seconds = Math.floor(remainingTime % 60)

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!handleSeek || totalTime <= 0) return

    const progressBar = event.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const clickPercentage = clickX / rect.width
    const newTime = clickPercentage * totalTime

    handleSeek(newTime)
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (totalTime <= 0) return

    const progressBar = event.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const hoverX = event.clientX - rect.left
    const hoverPercentage = Math.min(Math.max(hoverX / rect.width, 0), 1) * 100

    setHoverPercentage(hoverPercentage)
  }

  const handleMouseLeave = () => {
    setHoverPercentage(null)
  }

  return (
    <div className='text-white flex gap-6 py-4 justify-center items-center'>
      <div className='w-full flex justify-between items-center gap-3'>
        <IoPlaySkipBack className='text-2xl cursor-pointer' />
        <div 
          id="progress"
          className={`w-full h-2 rounded-full bg-white relative overflow ${!totalTime ? 'bg-gray-500' : 'cursor-pointer '}`}
          onClick={handleProgressClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
        <div
          className="h-full bg-gray-600 absolute top-0 bg-opacity-60"
          style={{ width: `${hoverPercentage}%`, zIndex: 0 }}
        >
          {/* Round div positioned at the end */}
          {hoverPercentage !== null && (
            <div
              className="h-4 w-4 bg-accent-500 rounded-full absolute top-1/2 transform -translate-y-1/2 translate-x-1/2"
              style={{ right: '0' }}
            />
          )}
        </div>
          <div
            id="progress-overlay"
            className='h-full bg-accent-500 absolute top-0 rounded-l-full'
            style={{ width: `${progressPercentage}%`, zIndex: 1 }}
          >
            {
              hoverPercentage === null && (
              <div
                className="h-4 w-4 bg-accent-500 rounded-full absolute top-1/2 transform -translate-y-1/2 translate-x-1/2"
                style={{ right: '0' }}
              />
            )}
          </div>
        </div>
        <IoPlaySkipForward className='text-2xl cursor-pointer' />
      </div>
      <div>{`-${minutes}:${seconds.toString().padStart(2, '0')}`}</div>
      <div onClick={handleClickPlayButton} className='h-12 aspect-square rounded-full bg-accent-500 flex justify-center items-center'>
        {
          isPlaying ? (
            <IoPause className='text-2xl cursor-pointer' />
          ) : (
            <IoPlay className='text-2xl cursor-pointer' />
          )
        }
      </div>
    </div>
  )
}

export default Header;
