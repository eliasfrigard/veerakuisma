import React from 'react'
import { useInView } from 'react-intersection-observer'

const AnimateIn = ({
  threshold = 0.2,
  triggerOnce = true,
  children,
  classes = '',
  animationType = 'fade',
  slideDirection = 'left',
  delay = 0,
  disabled = false,
}) => {
  const [ref, inView] = useInView({ threshold, triggerOnce })

  const getSlideDirection = () => {
    switch (slideDirection) {
      case 'left':
        return '-translate-x-24'
      case 'right':
        return 'translate-x-24'
      case 'top':
        return '-translate-y-24'
      case 'bottom':
        return 'translate-y-24'
      default:
        break
    }
  }

  const getAnimationClasses = () => {
    const delayClass = delay > 0 ? `delay-${delay}` : ''

    switch (animationType) {
      case 'slide':
        return `${classes} duration-1000 ${delayClass} ${inView ? 'opacity-100 translate-y-0' : `opacity-0 ${getSlideDirection()}`
          }`
      case 'zoom':
        return `${classes} duration-1000 ${delayClass} ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-85'
          }`
      default:
        return `${classes} duration-1000 ${delayClass} ${inView ? 'opacity-100' : 'opacity-0'}`
    }
  }

  if (disabled) {
    return (
      <div className={classes} ref={ref}>
        {children}
      </div>
    )
  }

  return (
    <div className={getAnimationClasses()} ref={ref}>
      {children}
    </div>
  )
}

export default AnimateIn
