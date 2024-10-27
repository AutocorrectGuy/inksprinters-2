import React, { RefObject, useEffect, useRef, useState } from 'react'
import SnakeGameElement from '../../../../Routes/Landing/SnakeGameElement'

const Background = () => {
  const [tileSize] = useState<number>(25)
  const [gap] = useState<number>(2)
  const lightRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (lightRef.current) {
        lightRef.current.animate(
          {
            left: `${e.clientX}px`,
            top: `${e.clientY}px`,
          },
          { duration: 2000, fill: 'forwards' }
        )
      }
    }

    // Check if the grid element exists and if it does, add the event listener
    if (gridRef.current) {
      document.body.addEventListener('mousemove', handleMouseMove)
    }

    // Cleanup function to remove the event listener
    return () => {
      if (gridRef.current) {
        document.body.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <>
      {/* Light blob on the top right */}
      <div
        className='absolute blur-3xl -z-1 max-w-[25%] min-w-28 w-full aspect-square left-[65%] top-[5%] rounded-full'
        style={{
          animation: `orbit-150px 10s linear infinite`,
          background: `linear-gradient(#6778C940 0%, #4c6fcf25 95%)`,
        }}
      />
      {/* Light blob on the bottom */}
      <div
        className='absolute blur-3xl -z-1 max-w-[25%] min-w-28 w-full aspect-square left-[15%] -bottom-[10%] rounded-full'
        style={{
          animation: `orbit-150px 10s linear infinite`,
          background: `linear-gradient(#6778C930 0%, #4c6fcf15 95%)`,
        }}
      />
      {/* Light blob in center behind logo */}
      <div
        className='absolute blur-3xl -z-1 w-[25%] aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full'
        style={{ background: `linear-gradient(#37589A50 0%, #4c6f7f35 95%)` }}
      />
      {/* Mouse following light blob */}
      <div
        ref={lightRef}
        className='absolute -z-1 blur-3xl w-96 h-96 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full'
        style={{
          animation: `spin-360 3s linear infinite`,
          background: `linear-gradient(#6778C940 0%, #4c6faf20 80%)`,
          transformOrigin: '0% 0%',
        }}
      />
      <SnakeGameElement tileSize={tileSize} reversed={false} />
      <SnakeGameElement tileSize={tileSize} reversed={true} />

      {/* Math rectangles grid */}

      <div
        ref={gridRef}
        className='absolute inset-0 -z-1'
        style={{
          background: `url('data:image/svg+xml,<svg width="${tileSize}" height="${tileSize}" xmlns="http://www.w3.org/2000/svg"><rect style="fill:%2305141f;stroke-width:0px;" width="${
            tileSize - gap
          }" height="${tileSize - gap}" rx="1.04" ry="1.04"/></svg>') repeat`,
          backgroundSize: `${tileSize}px ${tileSize}px`,
          backgroundPosition: '0 0',
        }}
      />
    </>
  )
}

export default Background
