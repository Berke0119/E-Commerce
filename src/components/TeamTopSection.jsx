import React from 'react'

export default function TeamTopSection() {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center gap-6 max-w-7xl mx-auto text-center py-20 px-10'>
        <h5 className='text-sm font-bold text-[#737373] uppercase'>
          What we do
        </h5>
        <h1 className='text-6xl font-bold text-[#252B42]'>
          Innovation tailored for you
        </h1>
        <div className='text-sm space-x-2'>
          <span className="font-bold text-[#252B42]">Home</span>
          <span className="text-gray-400 ">›</span>
          <span className="text-[#737373] font-bold">Team</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sol taraf - büyük görsel */}
        <div className="md:w-1/2 w-full">
          <img
            src="/gallery1.jpg"
            alt="Main visual"
            className="w-full h-[700px] object-cover"
          />
        </div>

        {/* Sağ taraf - 2x2 grid */}
        <div className="md:w-1/2 w-full grid grid-cols-2">
          <img
            src="/gallery2.jpg"
            alt="Gallery item 1"
            className="w-full h-[350px] object-cover"
          />
          <img
            src="/gallery3.jpg"
            alt="Gallery item 2"
            className="w-full h-[350px] object-cover"
          />
          <img
            src="/gallery4.jpg"
            alt="Gallery item 3"
            className="w-full h-[350px] object-cover"
          />
          <img
            src="/gallery5.jpg"
            alt="Gallery item 4"
            className="w-full h-[350px] object-cover"
          />
        </div>
      </div>

    </div>
  )
}
