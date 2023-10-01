import React from 'react'
import { useInView } from 'react-intersection-observer'

const AnimateIn = ({
  children,
  className = '',
  threshold = 0.2,
  triggerOnce = true,
  animationType = 'fade',
  slideDirection = 'left',
  disabled = false,
  delay = 0,
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
    switch (animationType) {
      case 'slide':
        return `${className} duration-1000 delay-[${delay}ms] ${
          inView ? 'opacity-100 translate-y-0' : `opacity-0 ${getSlideDirection()}`
        }`
      case 'zoom':
        return `${className} duration-1000 delay-[${delay}ms] ${
          inView ? 'opacity-100 scale-100' : 'opacity-0 scale-85'
        }`
      default:
        return `${className} duration-1000 delay-[${delay}ms] ${inView ? 'opacity-100' : 'opacity-0'}`
    }
  }

  if (disabled) {
    return (
      <div className={className} ref={ref}>
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
