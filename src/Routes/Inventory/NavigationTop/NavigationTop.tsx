import NavigationTopButton, { NavEntryType } from './components/NavigationTopButton'
import AddArticle from '../AddArticle'
import { exportTableToCSV } from '../functions/exportTableToCsv'
import { uvArticleModel } from '../../../libs/dexie/models/uv/uvArticle'
import { importFromCsv } from './importOrExport/importFromCsv'
import AddUvShape from '../crud/AddUvShape/AddUvShape'
import { useDW } from '../../../components/DraggableWindows/DWContext'

export type MainNavMenuOption = 'Create' | 'View' | 'Import/Export'

const NavigationTop = () => {
  const { spawnWindow } = useDW()

  const navOptions: { [key in MainNavMenuOption]: NavEntryType[] } = {
    Create: [
      { buttonLabel: 'New Article', action: () => spawnWindow('Create Article', (_close) => <AddArticle />) },
      { buttonLabel: 'New Shape', action: () => spawnWindow('Create Shape', (_close) => <AddUvShape />) },
    
    ],
    'Import/Export': [
      { buttonLabel: 'Import from csv', action: () => importFromCsv('uv_articles', uvArticleModel) },
      { buttonLabel: 'Export to csv', action: () => exportTableToCSV('uv_articles', uvArticleModel) },
    ],
    View: [
      // { label: 'Table', modalComponent: () => alert('Table view') },
      // { label: 'Cards', modalComponent: () => alert('Cards view') },
    ],
  }

  return (
    <div className='absolute top-0 left-0 h-14 z-[4] flex w-full bg-[#07202D]'>
      {Object.entries(navOptions).map(([key, opts], i) => {
        return <NavigationTopButton key={`nav-btn-${i}`} label={key as MainNavMenuOption} options={opts} />
      })}
    </div>
  )
}

export default NavigationTop
