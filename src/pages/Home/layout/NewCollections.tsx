import collect1 from '../../../assets/images/collection1.png';
import collect2 from '../../../assets/images/collection2.png';

const NewCollections = () => {


  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="md:text-4xl text-2xl font-bold text-black">
          Explore Our Collections
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
       <div className="overflow-hidden w-full h-[800px] bg-[#FF69B4] rounded-md">
        <img src={collect1} alt="" />
        <h3 className='text-3xl font-bold text-[#330011] ml-5 mt-8'>Hair Extension</h3>
        <ul className='text-[#330011] ml-10 mr-4 mt-6 list-disc'>
          <li>With our extensions, you're not just styling you're stepping into your most confident self. From silky crotchets to chic weave-ons and bold, colourful braids, we've got you covered.</li>
        </ul>
        <div className='flex items-center justify-center'>
        <button className='bg-[#330011] hover:bg-white hover:text-[#330011] text-white px-4 py-2 rounded-full text-2xl w-76 h-14 mt-18 text-bold cursor-pointer'>Get yours here</button>
        </div>
       </div>
       <div className="overflow-hidden w-full h-[800px] bg-[#FFB6C1] rounded-md">
        <img src={collect2} alt="" />
        <h3 className='text-3xl font-bold text-[#330011] ml-5 mt-8'>Hair Care</h3>
        <ul className='text-[#330011] ml-10 mr-4 mt-6 list-disc'>
          <li>For those soft-life moments, our hair care products are like a spa day for your hair—hydrating, nourishing, leaving your hair oh-so-smooth.</li>
        </ul>
        <div className='flex items-center justify-center'>
        <button className='bg-[#330011] hover:bg-white hover:text-[#330011] text-white px-4 py-2 rounded-full text-2xl w-76 h-14 mt-24 text-bold cursor-pointer'>Get yours here</button>
        </div>
       </div>
      </div>
    </section>
  );
};

export default NewCollections;
