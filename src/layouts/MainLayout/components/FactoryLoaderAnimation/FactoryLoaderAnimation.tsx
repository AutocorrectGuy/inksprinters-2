import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import PATH_CONSTANTS from "../../../../Routes/config/pathConstants"

const FactoryLoaderAnimation = ({ position }: { position: 'top' | 'bottom' }) => {
  const location = useLocation()
  const [loaded, setLoaded] = useState(location.pathname === PATH_CONSTANTS.LANDING_PAGE)

  useEffect(() => {
    if(loaded) return // if we are on the landing page do not trigger fast animation

    const timer = setTimeout(() => {
      setLoaded(true); 
    }, 200); // really good frame 220

    return () => clearTimeout(timer); // Clean up the timer
  }, [])

  return (
    <div className={`${position === 'top' ? 'top-0 ' : 'bottom-0 rotate-180'} absolute w-full shadow-lg shadow-black/15`}>
      <div
        className='w-full flex h-14 opacity-40'
        style={{
          backgroundImage:
            'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0ODEuMTMgNDgxLjEzIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmMTc4Yzt9LmNscy0xLC5jbHMtMiwuY2xzLTN7c3Ryb2tlLXdpZHRoOjBweDt9LmNscy0ye2ZpbGw6bm9uZTt9LmNscy0ze2ZpbGw6IzBkZTcwMDt9PC9zdHlsZT48L2RlZnM+IA0KPHBvbHlnb24gZmlsbD0iIzBhMzI0MiIgcG9pbnRzPScyNDAuNCAwIDE1LjU2IDQ4MS4xMyAwIDQ4MS4xMyAwIDAgMjQwLjQgMCcgLz4NCiAgICAgICAgICAgIDxwb2x5Z29uIGZpbGw9IiMxMzI5MzUiIHBvaW50cz0nNDgxLjEzIDAgNDgxLjEzIC45NyAyNTYuNzUgNDgxLjEzIDE0Ljk0IDQ4MS4xMyAyMzkuNzggMCA0ODEuMTMgMCcgLz4NCiAgICAgICAgICAgIDxwb2x5Z29uIGZpbGw9IiMwYTMyNDIiIHBvaW50cz0nNDgxLjEzIDAgNDgxLjEzIDQ4MS4xMyAyNTYuMTIgNDgxLjEzIDQ4MC45NiAwIDQ4MS4xMyAwJyAvPg0KPC9zdmc+)',
          animation: `scrollRight ${!loaded ? '6s ease-out' : '30s linear'} infinite`,
        }}
      />
    </div>
  )
}

export default FactoryLoaderAnimation
