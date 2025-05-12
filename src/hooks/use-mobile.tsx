
import * as React from "react"

// Different breakpoints for different device sizes
export const MOBILE_BREAKPOINT = 640 // Changed from 768 to better match mobile devices
export const TABLET_BREAKPOINT = 1024
export const DESKTOP_BREAKPOINT = 1280

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    window.addEventListener("resize", handleResize)
    handleResize() // Initialize on mount
    
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean>(false)

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsTablet(width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT)
    }
    
    window.addEventListener("resize", handleResize)
    handleResize() // Initialize on mount
    
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isTablet
}

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState<boolean>(false)

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= TABLET_BREAKPOINT)
    }
    
    window.addEventListener("resize", handleResize)
    handleResize() // Initialize on mount
    
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isDesktop
}

export function useDeviceType() {
  const [deviceType, setDeviceType] = React.useState<'mobile' | 'tablet' | 'desktop' | undefined>(undefined)

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < MOBILE_BREAKPOINT) {
        setDeviceType('mobile')
      } else if (width < TABLET_BREAKPOINT) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }
    
    window.addEventListener("resize", handleResize)
    handleResize() // Initialize on mount
    
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return deviceType
}

export function useBreakpoint(breakpoint: number) {
  const [isAbove, setIsAbove] = React.useState<boolean>(false)

  React.useEffect(() => {
    const handleResize = () => {
      setIsAbove(window.innerWidth >= breakpoint)
    }
    
    window.addEventListener("resize", handleResize)
    handleResize() // Initialize on mount
    
    return () => window.removeEventListener("resize", handleResize)
  }, [breakpoint])

  return isAbove
}
