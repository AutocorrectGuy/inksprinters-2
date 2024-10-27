import { ChangeEvent, memo, useRef, useState } from 'react'
import { db } from '../../libs/dexie/core/db'
import { validateData } from '../../libs/dexie/utils/validation'
import { toast } from 'react-toastify'
import { customToastProps } from '../../libs/react-toastify/CustomReactToastify'
import { twMerge } from 'tailwind-merge'
import CustomIcon from '../../components/CustomIcons/CustomIcon'
import { arrayBufferToImageUrl } from './functions/arrayBufferAndBase64Converters'
import { UvArticle, uvArticleModel } from '../../libs/dexie/models/uv/uvArticle'

interface IState {
  number: string
  name: string
  notes: string
  isTesting: string
  imageWidth: string
  imageHeight: string
  posX: string
  posZ: string
  uvParameterId: string
  uvShapeId: string
  image: ArrayBuffer | null
}

const AddArticle = () => {
  const [state, setState] = useState<IState>({
    number: '',
    name: '',
    notes: '',
    isTesting: 'Testing',
    imageWidth: '0',
    imageHeight: '0',
    posX: '0',
    posZ: '0',
    uvParameterId: '0',
    uvShapeId: '0',
    image: null,
  })

  function updateField(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const name = e.target.name as keyof IState
    const value = e.target.value as unknown as IState[typeof name] // More cautious casting

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          const arrayBuffer = e.target.result as ArrayBuffer
          setState((prev) => ({ ...prev, image: arrayBuffer }))
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  async function addArticle() {
    const entry: UvArticle = {
      number: state.number,
      name: state.name,
      notes: state.notes,
      is_in_testing_phase: true, //TODO: REMOVE
      image_width: Number(state.imageWidth),
      image_heigth: Number(state.imageHeight),
      laser_pos_x: Number(state.posX),
      laser_pos_z: Number(state.posZ),
      uv_parameter_id: Number(state.uvParameterId),
      uv_shape_id: Number(state.uvShapeId),
      image: state.image ?? new ArrayBuffer(0),
    }

    try {
      await validateData(entry, uvArticleModel, db.uv_articles, true)
      await db.uv_articles.add(entry).then(() => toast.success('Article added successfully', customToastProps))
    } catch (err) {
      if (err instanceof Error) toast.error(err.message, customToastProps)
    }
  }

  const TextRow = memo(
    ({
      name,
      value,
      onChange,
    }: {
      name: keyof IState
      value: string
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    }) => (
      <tr>
        <td className='input-label'>{name}</td>
        <td className='w-full'></td>
      </tr>
    )
  )

  return (
    <div className='flex flex-col text-black w-full'>
      <div className='flex'>
        {/* left panel */}
        <table className='w-full min-w-[400px] flex flex-col justify-start pr-2 border-separate border-spacing-y-1'>
          <tbody>
            <tr>
              <td className='input-label'>{'Number'}</td>
              <td className='w-full'>
                <input className='input-text' key='number' name='number' value={state.number} onChange={updateField} />
              </td>
            </tr>
            <tr>
              <td className='input-label'>{'Name'}</td>
              <td className='w-full'>
                <input className='input-text' key='name' name='name' value={state.name} onChange={updateField} />
              </td>
            </tr>
            <tr>
              <td className='input-label align-top pt-2'>{'Notes'}</td>
              <td className='w-full'>
                <textarea
                  className='input-text'
                  cols={3}
                  key='notes'
                  name='notes'
                  value={state.notes}
                  onChange={updateField}
                />
              </td>
            </tr>
            <tr>
              <td className='input-label'>{'Phase'}</td>
              <td className='w-full'>
                <input
                  className='input-text'
                  key='isTesting'
                  name='isTesting'
                  value={state.isTesting}
                  onChange={updateField}
                />
              </td>
            </tr>
            <tr>
              <td className='input-label'>{'Image Width'}</td>
              <td className='w-full'>
                <input
                  className='input-text w-1/2'
                  key='imageWidth'
                  name='imageWidth'
                  value={state.imageWidth}
                  onChange={updateField}
                />
              </td>
            </tr>
            <tr>
              <td className='input-label'>{'Image Height'}</td>
              <td className='w-full'>
                <input
                  className='input-text w-1/2'
                  key='imageHeight'
                  name='imageHeight'
                  value={state.imageHeight}
                  onChange={updateField}
                />
              </td>
            </tr>
            <tr>
              <td className='input-label'>{'Pos X'}</td>
              <td className='w-full'>
                <input className='input-text w-1/2' key='posX' name='posX' value={state.posX} onChange={updateField} />
              </td>
            </tr>
            <tr>
              <td className='input-label'>{'Pos Z'}</td>
              <td className='w-full'>
                <input className='input-text w-1/2' key='posZ' name='posZ' value={state.posZ} onChange={updateField} />
              </td>
            </tr>
            <tr>
              <td className='input-label'>{'Parameters'}</td>
              <td className='w-full'>
                <input
                  className='input-text w-1/2'
                  key='uvParameterId'
                  name='uvParameterId'
                  value={state.uvParameterId}
                  onChange={updateField}
                />
              </td>
            </tr>
            <tr>
              <td className='input-label'>{'Shape Id'}</td>
              <td className='w-full'>
                <input
                  className='input-text w-1/2'
                  key='uvShapeId'
                  name='uvShapeId'
                  value={state.uvShapeId}
                  onChange={updateField}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Right panel */}
        <div className='flex flex-col pl-4'>
          <div className='w-64 mt-2'>
            {state.image ? (
              <img className='w-full object-contain mb-2' src={arrayBufferToImageUrl(state.image)} />
            ) : (
              <CustomIcon icon='no-image' className='text-neutral-400' />
            )}
          </div>
          <button className='btn-primary w-full' onClick={() => imageInputRef.current && imageInputRef.current.click()}>
            Choose Image
            <input ref={imageInputRef} className='hidden' type='file' accept='image/*' onChange={handleFileChange} />
          </button>
        </div>
      </div>

      <button onClick={addArticle} className={twMerge('btn-primary', 'mt-4 py-3')}>
        Add
      </button>
    </div>
  )
}

export default AddArticle
