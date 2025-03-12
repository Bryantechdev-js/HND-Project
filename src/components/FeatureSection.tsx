
import React from 'react'
import { Meteors } from './magicui/meteors'
import { SparklesText } from './magicui/sparkles-text'

function FeatureSection() {
  return (
    <div className='w-full h-full px-20 py-12 dark:bg-[#121212]' id='fea'>
        <SparklesText/>
         <div className="cards dark:text-black  grid grid-cols-4 max-md:grid-cols-2  max-sm:grid-cols-1 gap-2 flex justify-center items-center">
            <div className="box w-auto  dark:text-black h-auto hover:scale-[1.1] hover:mx-3  bg-slate-100  flex justify-center items-center py-5 shadow rounded-sm"><img width="24" height="24" src="https://img.icons8.com/ios/50/speed--v1.png" className='mr-2' alt="speed--v1"/>Fast mails delivery</div>
            <div className="box hover:scale-[1.1] hover:mx-3   w-auto h-auto dark:text-black bg-slate-100 flex justify-center items-center py-5 shadow rounded-sm"><img width="24" height="24" src="https://img.icons8.com/material-outlined/24/private2.png" className='mr-2 ' alt="private2"/> Secuire mail account</div>
            <div className="box hover:scale-[1.1] hover:mx-3  w-auto h-auto dark:text-black bg-slate-100 py-5 shadow rounded-sm flex justify-center items-center"><img width="24" height="24" className='mr-2' src="https://img.icons8.com/external-solidglyph-m-oki-orlando/32/external-Spam-Filtering-artificial-intelligence-solidglyph-m-oki-orlando.png" alt="external-Spam-Filtering-artificial-intelligence-solidglyph-m-oki-orlando"/> spam filtering</div>
            <div className="box hover:scale-[1.1] hover:mx-3  w-auto h-auto dark:text-black bg-slate-100 flex justify-center items-center py-5 shadow rounded-sm"><img width="24" height="24" className='mr-2' src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/external-infinity-essentials-tanah-basah-basic-outline-tanah-basah-2.png" alt="external-infinity-essentials-tanah-basah-basic-outline-tanah-basah-2"/> unlimited mails</div>
            <div className="box hover:scale-[1.1] hover:mx-3  w-auto h-auto dark:text-black bg-slate-100 flex justify-center items-center py-5 shadow rounded-sm"><img width="24" height="24" src="https://img.icons8.com/ios-glyphs/24/translation.png" className='mr-2' alt="translation"/> translation</div>
         </div>
         <Meteors/>
    </div>
  )
}

export default FeatureSection
