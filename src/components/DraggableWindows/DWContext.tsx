// DWContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react'
import DW, { DWProps } from './DW'

// Context to hold the windows and the spawn function
const DWContext = createContext<
  { spawnWindow: (label: string, render: (close: () => void) => React.ReactNode) => void } | undefined
>(undefined)

// Provider component
export const DWProvider = ({ children }: { children: React.ReactNode }) => {
  const [windows, setWindows] = useState<React.ReactElement<DWProps>[]>([])

  const closeWindow = useCallback((id: string) => {
    setWindows((currentWindows) => currentWindows.filter((window) => window.props.id !== id))
  }, [])

  const spawnWindow = useCallback((label: string, render: (closeWindow: () => void) => React.ReactNode) => {
    const id = Math.random().toString()
    const windowContent = render(() => closeWindow(id))
    const newWindow = <DW label={label} key={id} id={id} content={windowContent} onClose={closeWindow} />
    setWindows((currentWindows) => [...currentWindows, newWindow])
  }, [])

  return (
    <DWContext.Provider value={{ spawnWindow }}>
      <div className='fixed w-0 h-0 top-0 left-10 border' style={{ zIndex: 100 }}>
        {windows}
      </div>
      {children}
    </DWContext.Provider>
  )
}

// Hook for easier consumption of context
export const useDW = () => {
  const context = useContext(DWContext)
  if (context === undefined) {
    throw new Error('useDW must be used within a DWProvider')
  }
  return context
}
