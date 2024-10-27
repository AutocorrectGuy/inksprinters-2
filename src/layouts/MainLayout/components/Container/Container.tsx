import React from 'react'
import FactoryLoaderAnimation from '../FactoryLoaderAnimation/FactoryLoaderAnimation'
import SearchBarTop from '../SearchbarTop/SearchBarTop'
import CogSettings from '../CogSettings/CogSettings'
import Footer from '../Footer/Footer'
import VersionControl from '../VersionControl/VersionControl'

type Props = {
  children: React.ReactNode
  hasSearchBar?: boolean
  hasCogSettings?: boolean
  hasFooter?: boolean
  hasVersionControl?: boolean
  hasFactortyLoaderTop?: boolean
  hasFactortyLoaderBottom?: boolean
}

const Container = ({
  children,
  hasSearchBar = true,
  hasCogSettings = true,
  hasFooter = true,
  hasVersionControl = true,
  hasFactortyLoaderTop = true,
  hasFactortyLoaderBottom = true,
}: Props) => {
  return (
    <div className='flex flex-col flex-1 grow pt-14 pb-14 z-[2] relative pr-10'>
      {/* Passing by blob - visible only once after page loads*/}
      <div
        className='absolute z-0 blur-3xl w-96 min-h-screen -left-[384px] top-0 -translate-x-full rotate-12'
        style={{
          animation: `left-to-right-screen 400ms linear 1`,
          background: `linear-gradient(#4c6fcf10 0%, #67C8C910 80%)`,
        }}
      />
      {children}
      {hasFactortyLoaderTop && <FactoryLoaderAnimation position='top' />}
      {hasSearchBar && <SearchBarTop />}
      {hasCogSettings && <CogSettings />}
      {hasFooter && <Footer />}
      {hasVersionControl && <VersionControl />}
      {hasFactortyLoaderBottom && <FactoryLoaderAnimation position='bottom' />}
    </div>
  )
}

export default Container
