import React, { useEffect, useState } from 'react'
import Dropdown from '../../../../components/Dropdowns/Dropdown'
import { db } from '../../../../libs/dexie/core/db'
import loadSettings from './loadSettings'
import { objectToArray } from '../../../../utils/toArray'
import { toast } from 'react-toastify'
import { customToastProps } from '../../../../libs/react-toastify/CustomReactToastify'

type Props = {
  close: () => void
}

const UV_LENSES = {
  // UV_LENS_NAME: UV_LENS_SIZE
  lens100: 70 as const,
  lens160: 100 as const,
  lens254: 160 as const,
}
export const DEFAULT_UV_SHAPE_SETTINGS = {
  UV_LENS_NAME: Object.keys(UV_LENSES)[2], // "lens254"
  UV_LENS_SIZE: Object.values(UV_LENSES)[2], // 160
}
export type UVCreateSHapeSettingsState = { UV_LENS_NAME: string; UV_LENS_SIZE: number }

type UvLensDefaults = typeof UV_LENSES
type UvLensMarkingArea = UvLensDefaults[keyof UvLensDefaults]

const findLensNameBySize = (size: UvLensMarkingArea): keyof UvLensDefaults => {
  const entries = Object.entries(UV_LENSES) as [keyof UvLensDefaults, number][]
  const foundEntry = entries.find(([, value]) => value === size)

  if (!foundEntry) {
    throw new Error(`No lens name found for size ${size}`)
  } else return foundEntry[0] // This will always be one of the keys of UvLensDefaults
}

const CreateShapeSettings = (props: Props) => {
  const [settings, setSettings] = useState<UVCreateSHapeSettingsState>({ UV_LENS_NAME: '', UV_LENS_SIZE: 0 })

  useEffect(() => {
    loadSettings(Object.keys(settings), DEFAULT_UV_SHAPE_SETTINGS)
      .then((finalSettings) => setSettings(finalSettings as UVCreateSHapeSettingsState))
      .catch((err: any) => toast.error(`Error loading settings: ${err.message}`, customToastProps))
  }, [])

  const onSave = async () => {
    try {
      await db.transaction('rw', db.app_settings, async () => {
        for (const setting of objectToArray(settings)) {
          const { key, value } = setting

          // Find the entry by key to get the primary key (id)
          const settingEntry = await db.app_settings.where({ key }).first()
          settingEntry && settingEntry.id
            ? await db.app_settings.update(settingEntry.id, { value })
            : await db.app_settings.add({ key, value })
        }
      })
      toast.success('Settings updated successfully!', customToastProps)
      props.close()
    } catch (err: any) {
      toast.error(`Failed to update settings: ${err.message}`, customToastProps)
      props.close()
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='w-[320px] pr-2 table'>
        {/* Lens name dropdown */}
        <div className='table-row w-full'>
          <div className='table-cell pb-[2px]'>
            <div className='input-label'>Lens</div>
          </div>
          <div className='pb-[2px]'>
            <Dropdown
              value={settings.UV_LENS_NAME}
              onChange={(val) =>
                setSettings((prev) => ({
                  ...prev,
                  UV_LENS_NAME: val as string,
                  UV_LENS_SIZE: UV_LENSES[val as keyof UvLensDefaults],
                }))
              }
              options={Object.keys(UV_LENSES).map((setting) => ({
                label: `${setting.split('lens')[1]} mm`,
                value: setting,
              }))}
            />
          </div>
        </div>

        {/* Lens size dropdown */}
        <div className='table-row w-full'>
          <div className='table-cell pb-[2px]'>
            <div className='input-label'>Marking Area</div>
          </div>
          <div className='pb-[2px]'>
            <Dropdown
              value={settings.UV_LENS_SIZE}
              onChange={(val) =>
                setSettings((prev) => ({
                  ...prev,
                  UV_LENS_NAME: findLensNameBySize(val as UvLensMarkingArea),
                  UV_LENS_SIZE: Number(val),
                }))
              }
              options={Object.values(UV_LENSES).map((setting) => ({
                label: `${setting.toString()} mm`,
                value: setting,
              }))}
            />
          </div>
        </div>
      </div>
      <button className='btn-primary' onMouseDown={onSave}>
        Save
      </button>
    </div>
  )
}

export default CreateShapeSettings
