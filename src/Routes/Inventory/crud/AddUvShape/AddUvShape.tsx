import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { UvShape, UvShapeType } from '../../../../libs/dexie/models/uv/UvShape'
import Dropdown from '../../../../components/Dropdowns/Dropdown'
import Tr from '../../../../components/DraggableWindows/DWTr'
import { toast } from 'react-toastify'
import { customToastProps } from '../../../../libs/react-toastify/CustomReactToastify'
import ConeCrafterCanvas from './ConeCrafterCanvas'
import CustomIcon from '../../../../components/CustomIcons/CustomIcon'
import { useDW } from '../../../../components/DraggableWindows/DWContext'
import CreateShapeSettings, { DEFAULT_UV_SHAPE_SETTINGS, UVCreateSHapeSettingsState } from './CreateShapeSettings'
import loadSettings from './loadSettings'
import { db } from '../../../../libs/dexie/core/db'
import { liveQuery } from 'dexie'

// use strings as values not originally defined value types
export type StateType = Partial<{ [Property in keyof UvShape]: string }>
type ConeState = {
  minor_diameter: string
  product_height: string
}

const TR_LABELS = [
  { name: 'name', label: 'Name' },
  { name: 'base_diameter', label: 'Base Diameter' },
  { name: 'cone_height', label: 'Cone Height', coneProp: true },
  { name: 'offset_ref_z', label: 'Offset Ref Z' },
  { name: 'x_position', label: 'X Position' },
  { name: 'y_position', label: 'Y Position' },
  { name: 'rotation', label: 'Rotation' },
  { name: 'rotation_by_x', label: 'Rotation By X' },
  { name: 'rotation_by_y', label: 'Rotation By Y' },
]
const TR_CONE_LABELS = [
  { name: 'minor_diameter', label: 'Minor Diameter' },
  { name: 'product_height', label: 'Product Height' },
]
const DISABLED_FIELDS = ['cone_height', 'offset_ref_z', 'rotation_by_x', 'rotation_by_y']

const AddUvShape = () => {
  const { spawnWindow } = useDW()
  const [state, setState] = useState<StateType>({
    type: 'cone' as UvShapeType,
    name: 'shape_1',
    base_diameter: '',
    cone_height: '',
    offset_ref_z: '',
    x_position: '',
    y_position: '',
    rotation: '',
    rotation_by_x: '',
    rotation_by_y: '',
  })

  const [coneState, setConeState] = useState<ConeState>({ minor_diameter: '', product_height: '' })
  const [coneCrafterOpen, setConeCrafterOpen] = useState(false)
  const [settings, setSettings] = useState<UVCreateSHapeSettingsState>({ UV_LENS_NAME: '', UV_LENS_SIZE: 0 })
  const [settingsLoaded, setSettingsLoaded] = useState(false)

  useEffect(() => {
    const requiredKeys = Object.keys(settings)
    const subscription = liveQuery(() => db.app_settings.where('key').anyOf(requiredKeys).toArray()).subscribe({
      next: async (settingsArray) => {
        const settingsMap = settingsArray.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {})
        // Check for the existence of required keys
        const keysNotFound = []
        requiredKeys.forEach((key) => !(key in settingsMap) && keysNotFound.push(key))
        const defaultSettings = await loadSettings(requiredKeys, DEFAULT_UV_SHAPE_SETTINGS)
        
        setSettings(
          !keysNotFound.length
            ? (settingsMap as UVCreateSHapeSettingsState)
            : (defaultSettings as UVCreateSHapeSettingsState)
        )
        setSettingsLoaded(true)
      },
      error: (err) => toast.error(`Error loading settings: ${err.message}`),
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  const handleConeStateChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setConeState((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // const shape: UvShape = {
    //   type: state.type as UvShapeType,
    //   name: state.name as string,
    //   base_diameter: Number(state.base_diameter as string) ?? 0,
    //   cone_height: state.cone_height ? Number(state.cone_height) : undefined,
    //   offset_ref_z: state.offset_ref_z ? Number(state.offset_ref_z) : undefined,
    //   x_position: state.x_position ? Number(state.x_position) : undefined,
    //   y_position: state.y_position ? Number(state.y_position) : undefined,
    //   rotation: state.rotation ? Number(state.rotation) : undefined,
    //   rotation_by_x: state.rotation_by_x ? Number(state.rotation_by_x) : undefined,
    //   rotation_by_y: state.rotation_by_y ? Number(state.rotation_by_y) : undefined,
    //   minor_diameter: coneState.minor_diameter ? Number(coneState.minor_diameter) : undefined,
    //   product_height: coneState.product_height ? Number(coneState.product_height) : undefined,
    //   created_at: Date.now(),
    // }
    toast.success('What a nice shape! Would be nice to store it in the future! :)', customToastProps)
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col text-black w-full'>
      <div className='flex'>
        {/* userform */}
        <div className='relative'>
          {/* ConeCrafter Settings */}
          <div
            className='-z-[1] absolute top-0 bottom-0 w-[380px] flex duration-200'
            style={{ left: coneCrafterOpen ? -394 : -49 }}
          >
            <div className='flex items-center'>
              <div
                className='rotate-180 py-2 px-1 bg-cyan-700 border-y border-r border-cyan-600 text-cyan-50 rounded-r-lg select-none cursor-pointer hover:bg-cyan-600 duration-100'
                style={{ writingMode: 'vertical-rl' }}
                onMouseDown={() => {
                  state.type === 'cone'
                    ? setConeCrafterOpen((open) => !open)
                    : toast.error('Cone Crafter only available with "Cone" shape!')
                }}
              >
                {`${coneCrafterOpen ? 'Close' : 'Open'} Cone Crafter`}
              </div>
            </div>
            <div className='flex bg-gradient-to-br from-cyan-900 to-cyan-950 rounded-l-md border border-cyan-600 p-4'>
              <div className='table w-full h-fit'>
                <Tr
                  name={'base_diameter' as keyof StateType}
                  value={state.base_diameter}
                  label={TR_LABELS.find((x) => x.name === 'base_diameter')?.label ?? ''}
                  handleInputChange={handleStateChange}
                />
                {TR_CONE_LABELS.map((tr, i) => (
                  <Tr
                    key={`cone-crafter-row-${i}`}
                    name={tr.name}
                    label={tr.label}
                    value={coneState[tr.name as keyof ConeState]}
                    handleInputChange={handleConeStateChange}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Main userform */}
          <div className='w-[320px] pr-2 table'>
            <div className='table-row w-full'>
              <div className='table-cell pb-[2px]'>
                <div className='input-label'>Shape</div>
              </div>
              <div className='pb-[2px]'>
                <Dropdown
                  value={state.type as UvShapeType}
                  onChange={(val) =>
                    setState((prev) => {
                      val === 'cylinder' && setConeCrafterOpen(false)
                      return { ...prev, type: val as string }
                    })
                  }
                  options={[
                    { label: 'Cylinder', value: 'cylinder' },
                    { label: 'Cone', value: 'cone' },
                  ]}
                />
              </div>
            </div>
            {TR_LABELS.filter((tr) => (state.type === 'cone' ? true : !tr.coneProp)).map((tr) => {
              const isDisabled = DISABLED_FIELDS.includes(tr.name)

              return (
                <Tr
                  key={`tr-${tr.name}`}
                  name={tr.name as keyof StateType}
                  value={
                    tr.name === 'rotation_by_y' && state.type === 'cylinder' ? '' : state[tr.name as keyof StateType]
                  }
                  label={tr.label}
                  handleInputChange={isDisabled ? (_e) => {} : handleStateChange}
                  inputClassName={isDisabled ? 'bg-cyan-600 text-gray-800 font-semibold' : ''}
                />
              )
            })}
          </div>
        </div>

        {/* Shape representation */}
        <div className='min-w-[400px] min-h-[400px] w-full flex flex-col grow justify-center'>
          <div className='relative'>
            <CustomIcon
              icon='cog'
              className='w-9 h-9 right-2 top-2 absolute cursor-pointer text-cyan-300 hover:text-white duration-200'
              onClick={() => spawnWindow('"Create Shape" settings', (close) => <CreateShapeSettings close={close} />)}
            />
            {settingsLoaded ? (
              <ConeCrafterCanvas
                shapeType={state.type as UvShapeType}
                baseDiameter={Number(state.base_diameter)}
                coneHeight={Number(state.cone_height)}
                rotation={Number(state.rotation)}
                minorDiameter={Number(coneState.minor_diameter)}
                productHeight={Number(coneState.product_height)}
                setState={setState}
                xPosition={Number(state.x_position)}
                yPosition={Number(state.y_position)}
                lensSize={settings.UV_LENS_SIZE}
              />
            ) : (
              <div className='w-[400px] h-[400px] bg-black'></div>
            )}
          </div>
        </div>
      </div>

      <button type='submit' className={twMerge('btn-primary', 'mt-4 py-3')}>
        Add
      </button>
    </form>
  )
}

export default AddUvShape
