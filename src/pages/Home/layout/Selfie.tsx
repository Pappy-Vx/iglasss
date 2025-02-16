import selfie from '../../../assets/images/selfiehome.png'

const Selfie = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-6'>
        <img src={selfie} alt="" />
        <div className='flex flex-col items-center justify-center'>
        <span className='text-2xl lg:text-4xl text-black leading-10 lg:leading-16 text-center font-bold lg:font-extrabold mx-8 lg:mx-14'>Take a selfie to see Hair that fit the Version of You!</span>
        <button className='bg-[#330011] hover:bg-white hover:text-[#330011] text-white px-4 py-2 rounded-full text-2xl w-76 h-14 mt-24 text-bold cursor-pointer'>Upload Selfie</button>
        </div>
    </div>
  )
}

export default Selfie