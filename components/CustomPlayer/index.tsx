import React from 'react'

import Row from './Row'
import Header from './Header'
import { durationToTime } from './util'

interface CustomPlayerProps {
  tracks: any[]
  // Define your props here
}

type Tune = {
  id: string
  title: string
  band: string
  url: string
  duration: number
}

const CustomPlayer: React.FC<CustomPlayerProps> = ({ tracks }) => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false)
  const [currentTune, setCurrentTune] = React.useState<Tune | null>()

  // TODO: Duration is not set until the audio is loaded.
  const [duration, setDuration] = React.useState<number>(0)
  const [currentTime, setCurrentTime] = React.useState<number>(0)

  const audioRef = React.useRef<HTMLAudioElement | null>(null)

  const handleTuneClick = (id: string) => {
    const tune = tracks.find(tune => tune.id === id)
    if (!tune) return

    if (currentTune?.id === tune.id) {
      if (isPlaying) {
        audioRef.current?.pause()
      } else {
        audioRef.current?.play()
      }
      setIsPlaying(!isPlaying)
    } else {
      setCurrentTune(tune)
      setIsPlaying(true)
    }
  }

  const handleNextTrack = () => {
    if (!currentTune) return

    const currentIndex = tracks.findIndex(tune => tune.id === currentTune.id)
    const nextIndex = (currentIndex + 1) % tracks.length
    const nextTune = tracks[nextIndex]

    setCurrentTune(nextTune)
  }

  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  // React.useEffect(() => {
  //   const audio = audioRef.current
  //   if (!audio) return
  
  //   audio.currentTime = currentTime;
  // }, [currentTime])

  React.useEffect(() => {
    const audio = audioRef.current
    if (currentTune && audio) {
      audio.src = currentTune.url
      audio.play()
      setIsPlaying(true)

      setCurrentTime(0)
      audio.onloadedmetadata = () => {
        setDuration(audio.duration)
      }
    }
  }, [currentTune])

  React.useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    audio.ontimeupdate = handleTimeUpdate

    return () => {
      audio.ontimeupdate = null
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className='w-full pb-4 px-4 rounded-lg shadow-lg bg-primary-900 m-16'>
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

      <Header 
        handleClickPlayButton={togglePlay}
        handleNextTrack={handleNextTrack}
        handleSeek={handleSeek}
        isPlaying={isPlaying}
        currentTime={currentTime}
        totalTime={duration}
      />

      {
        tracks.map((tune, index) => (
          <Row 
            id={tune.id}
            key={index}
            index={index}
            band={tune.band}
            title={tune.title}
            isPlaying={isPlaying}
            duration={durationToTime(tune.duration)}
            handleClick={handleTuneClick}
          />
        ))
      }
    </div>
  )
}

export default CustomPlayer
