import React, { useEffect, useState } from 'react'
import Container from '../../layouts/MainLayout/components/Container/Container'
import useErrorBacktick from '../../assets/hooks/useErrorBacktick'

type Props = {}

const CAD = (props: Props) => {
  useErrorBacktick()

  const [initialized, setInitialized] = useState<boolean>(false)

  useEffect(() => {
    setInitialized(true)
  }, [])

  return (
    <Container
      hasCogSettings={false}
      hasSearchBar={false}
      hasFactortyLoaderBottom={false}
      hasFactortyLoaderTop={false}
      hasFooter={false}
      hasVersionControl={false}
    >
      <div
        className={`${
          initialized ? 'opacity-100' : 'opacity-0'
        } duration-500 flex flex-col grow items-center justify-center`}
      >
        Many tasks are waiting for you in the future, traveler...
      </div>
    </Container>
  )
}

export default CAD
