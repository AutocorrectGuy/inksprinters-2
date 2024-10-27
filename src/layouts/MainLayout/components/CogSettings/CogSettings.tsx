import CustomIcon from '../../../../components/CustomIcons/CustomIcon'

type Props = {}

const CogSettings = (props: Props) => {

  return (
    <div
      className='z-[3] absolute right-0 top-0 p-[6px] cursor-pointer hover-stop-animation'
      style={{
        animation: 'spin-me 10s linear infinite',
      }}
    >
      <CustomIcon icon='cog' className='w-12 h-12 text-[#388299] hover:text-white duration-200' />
    </div>
  )
}

export default CogSettings
