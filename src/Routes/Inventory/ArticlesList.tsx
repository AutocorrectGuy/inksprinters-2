import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../../libs/dexie/core/db'
import { twMerge } from 'tailwind-merge'
import { arrayBufferToImageUrl } from './functions/arrayBufferAndBase64Converters'
import { UvArticle } from '../../libs/dexie/models/uv/uvArticle'
import CustomIcon from '../../components/CustomIcons/CustomIcon'

const upperCaseFirstChar = (text: string) =>
  typeof text === 'string' && text.length ? text.charAt(0).toUpperCase() + text.slice(1) : ''

const ArticlesList = () => {
  const [value, setValue] = useState<string>('') // Example default value
  const regex = new RegExp(value, 'i')
  const uvArticles: UvArticle[] | undefined = useLiveQuery(async () => {
    try {
      const fetched = await db.uv_articles.where('name').startsWithIgnoreCase(value).toArray()
      const filtered = fetched.filter((uvArticle) => regex.test(uvArticle.name) || regex.test(uvArticle.name))
      return filtered
    } catch (error) {
      if (error instanceof Error) console.error(error.message)
      return []
    }
  }, [value])

  return (
    <div className='flex flex-col grow p-4'>
      <div className='border-b border-b-cyan-500/30 shadow-lg shadow-cyan-950/20 text-black flex gap-2 items-center'>
        <div className='text-lg text-cyan-100 px-2'>Search by article name</div>
        <input
          className='input-text max-w-[400px]'
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <table className='w-full'>
        <thead>
          <tr className='text-left'>
            <th className='p-2'>number</th>
            <th className='p-2'>name</th>
            <th className='p-2'>image</th>
            <th className='p-2'>notes</th>
            <th className='p-2'>phase</th>
            <th className='p-2'>image width</th>
            <th className='p-2'>image height</th>
            <th className='p-2'>pos x</th>
            <th className='p-2'>pos z</th>
            <th className='p-2'>parameter</th>
            <th className='p-2'>shape</th>
            <th className='p-2'></th>
          </tr>
        </thead>
        <tbody>
          {uvArticles &&
            uvArticles.map((a, i) => (
              <tr className={twMerge(i % 2 ? 'bg-white/5' : 'bg-white/10', 'py-1 px-2')} key={a.id}>
                <td className='px-2'>{a.number}</td>
                <td className='px-2'>{a.name}</td>
                <td className='px-2'>
                  {a.image ? (
                    <img src={arrayBufferToImageUrl(a.image)} className='h-20 object-contain' alt='Article' />
                  ) : (
                    <CustomIcon icon='no-image' className='h-20 text-neutral-400' />
                  )}
                </td>
                <td className='px-2'>{a.notes}</td>
                <td className='px-2'>{a.is_in_testing_phase}</td>
                <td className='px-2'>{a.image_width}</td>
                <td className='px-2'>{a.image_heigth}</td>
                {/* <td className='px-2'>{a.pos_x}</td> */}
                {/* <td className='px-2'>{a.pos_z}</td> */}
                <td className='px-2'>{a.uv_parameter_id}</td>
                <td className='px-2'>{a.uv_shape_id}</td>
                <td className='px-2'>
                  <span
                    className='text-red-500 text-2xl cursor-pointer'
                    onClick={() => a.id && db.uv_articles.delete(a.id)}
                  >
                    X
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ArticlesList
// className={twMerge(i % 2 ? 'bg-white/5' : 'bg-white/10', 'flex justify-between py-1 px-2 items-center')}
