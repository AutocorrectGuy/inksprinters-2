import { useEffect, useState } from 'react'
import Container from '../../layouts/MainLayout/components/Container/Container'
import LOGO_WITH_TEXT_SVG from '../../assets/inksprinters-2-logo-with-text.svg'
import useErrorBackTick from '../../assets/hooks/useErrorBacktick'

const QUOTES = [
  'Print Smarter, Not Harder',
  'Elevate Your Print Game',
  'Precision in Every Pixel',
  'Unleash Printing Excellence',
  'Crafting Perfection, One Print at a Time',
  'Innovate. Print. Excel',
  'Redefining Printing Productivity',
  'Empowering Your Printing Potential',
  'Accelerate Your Print Workflow',
  'Master the Art of Efficient Printing',
  'Elevate, Innovate, Print',
  'Speed, Precision, Perfection',
  'Pioneering The Printing Possibilities',
]

const Landing = () => {
  const [quoteIndex, setQuoteIndex] = useState<number>(Math.floor(Math.random() * QUOTES.length))
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)

  useErrorBackTick()

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1 >= QUOTES.length ? 0 : prev + 1))
    }, 20000)

    return () => clearInterval(interval)
  }, [])
  return (
    <Container>
      <div className='flex flex-col grow items-center justify-center'>
        {/* Main logo */}
        <img
          onLoad={() => setImageLoaded(true)}
          src={LOGO_WITH_TEXT_SVG}
          className={`max-w-[50%] min-w-28 w-full h-auto z-[2] select-none duration-500 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Text below logo */}
        {imageLoaded && (
          <span className='z-[2] select-none'>
            <h3
              key={`quote-${quoteIndex}`}
              className='text-2xl text-white my-0 mx-auto overflow-hidden whitespace-nowrap pt-4 tracking-wider relative'
              style={{ animation: 'typing 1s linear' }}
            >
              <span className='z-[3]'>{QUOTES[quoteIndex]}</span>
            </h3>
          </span>
        )}
      </div>
    </Container>
  )
}

export default Landing
