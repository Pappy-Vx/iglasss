import selfie from '../../../assets/images/selfiehome.png'
import { Link } from 'react-router-dom'
import { routePath } from '../../../utils/routePath'
const Selfie = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-6'>
        <img src={selfie} alt="" />
        <div className='flex flex-col items-center justify-center'>
        <span className='text-2xl lg:text-4xl text-black leading-10 lg:leading-16 text-center font-bold lg:font-extrabold mx-8 lg:mx-10'>Try on glasses and see the frame that fits your vibe, Iglasss look for every version of you!</span>
        <Link to={routePath.GlassTryOn}  className='bg-[#2F465E] hover:bg-white hover:text-[#2F465E] text-white px-4 py-2 rounded-full text-2xl w-76 h-14 mt-24 text-bold cursor-pointer text-center border-[#2F465E] border-2'>Try Glass</Link>
        </div>
    </div>
  )
}

export default Selfie