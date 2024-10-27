import { Outlet } from 'react-router-dom'
import SideNav from './components/SideNavigation/SideNav'
import CustomReactToastifyContainer from '../../libs/react-toastify/CustomReactToastify'
import Background from './components/Background/Background'
import { SideNavPorivder } from './components/SideNavigation/SideNavContext'
import { DWProvider } from '../../components/DraggableWindows/DWContext'
import { useEffect } from 'react'

const MainLayout = () => {

  return (
    <div className='bg-gradient-to-br from-[#181c27] to-[#0c1827] relative text-cyan-100 flex flex-col items-center justify-center min-h-screen overflow-hidden pl-20 font-orbitron tracking-widest'>
      <Background />
      <div className='flex flex-col grow z-[2] w-full'>
        <DWProvider>
          <Outlet />
        </DWProvider>
      </div>
      <SideNavPorivder>
        <SideNav />
      </SideNavPorivder>
      <CustomReactToastifyContainer />
    </div>
  )
}

export default MainLayout
