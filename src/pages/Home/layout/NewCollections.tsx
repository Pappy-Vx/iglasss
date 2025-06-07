import collect1 from '../../../assets/images/iglasscollection1.jpg';
import collect2 from '../../../assets/images/iglasscollection2.jpg';

const NewCollections = () => {


  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="md:text-4xl text-2xl font-bold text-black">
          Explore Our Collections
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
       <div className="overflow-hidden w-full h-[650px] lg:h-[800px] bg-[#96887D] rounded-md">
        <img src={collect1} alt="" />
        <h3 className='text-3xl font-bold text-[#fff] ml-5 mt-8'>Summer Collection</h3>
        <ul className='text-[#fff] ml-10 mr-4 mt-6 list-disc'>
          <li>With Iglasss, your summer style steps into the spotlight. From bold cat-eyes to sleek aviators and translucent frames, our latest collection brings the sunshine to your look. </li>
        </ul>
        <div className='flex items-center justify-center'>
        <button className='bg-[#3D3834] hover:bg-white hover:text-[#3D3834] text-white px-4 py-2 rounded-full text-2xl w-76 h-14 mt-12 md:mt-18 text-bold cursor-pointer'>Get yours here</button>
        </div>
       </div>
       <div className="overflow-hidden w-full h-[650px] lg:h-[800px] bg-[#E7E7E7] rounded-md">
        <img src={collect2} alt="" />
        <h3 className='text-3xl font-bold text-[#506D4E] ml-5 mt-8'>Kid's Wear</h3>
        <ul className='text-[#506D4E] ml-10 mr-4 mt-6 list-disc'>
          <li>With Iglasss Kids, it's not just eyewear, it's a window to their imagination! From vibrant frames to comfy fits and playful designs, we've got the perfect pair for every little explorer.</li>
        </ul>
        <div className='flex items-center justify-center'>
        <button className='bg-[#A1BF9F] hover:bg-white hover:text-[#A1BF9F] text-white px-4 py-2 rounded-full text-2xl w-76 h-14 mt-12 md:mt-24 text-bold cursor-pointer'>Get yours here</button>
        </div>
       </div>
      </div>
    </section>
  );
};

export default NewCollections;
