import './libs/tailwindcss/output.css'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout'
import Landing from './Routes/Landing/Landing'
import Tools from './Routes/Tools/Tools'
import CAD from './Routes/CAD/CAD'
import PATH_CONSTANTS from './Routes/config/pathConstants'
import ConeCrafter from './Routes/Tools/Cone Crafter/ConeCrafter'
import Inventory from './Routes/Inventory/Inventory'
import SwapFont from './Routes/Tools/Swap Font/SwapFont'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: PATH_CONSTANTS.LANDING_PAGE, element: <Landing /> },

      // Inventory
      { path: PATH_CONSTANTS.INVENTORY.INDEX, element: <Inventory /> },

      // Tools
      { path: PATH_CONSTANTS.TOOLS.INDEX, element: <Tools /> },
      { path: PATH_CONSTANTS.TOOLS.CONE_CRAFTER, element: <ConeCrafter /> },
      { path: PATH_CONSTANTS.TOOLS.SWAP_FONT, element: <SwapFont /> },

      // CAD
      { path: PATH_CONSTANTS.CAD.INDEX, element: <CAD /> },

    ],
  },
])

root.render(<RouterProvider router={router} />)
