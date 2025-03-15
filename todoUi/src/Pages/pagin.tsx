import  { useEffect, useState } from 'react'
import HeroSection from '../compontents/ui/herosection'
import Pagination from '../compontents/ui/pagination'
import FilterControl from '../compontents/common/filterControl'
import { creationTimeFilter, numberOfTasksFilter } from '../data/filtersLists'

const Pagin = () => {
    //states 
    
    const [numQuery, setNumQuery] = useState<number>(0)
    const [days , setDays] = useState(0)
    const [show , setShow] = useState(0)
    console.log('render pagin')
   return (

         <div>
            <FilterControl setParam={setDays} options={creationTimeFilter}>Creation Post</FilterControl>
            <FilterControl setParam={setDays} options={numberOfTasksFilter}>Creation Post</FilterControl>
            <button onClick={()=> console.log(days)}>
              show
            </button>
            <HeroSection numQuery={numQuery} setNumQuery={setNumQuery} />
            <Pagination/>
            <div>
    <label
      htmlFor="DeliveryStandard"
      className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-xs hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
    >
      <div>
        <p className="text-gray-700">Standard</p>

        <p className="mt-1 text-gray-900">Free</p>
      </div>

      <input
        type="radio"
        name="DeliveryOption"
        value="DeliveryStandard"
        id="DeliveryStandard"
        className="size-5 border-gray-300 text-blue-500"
        checked
      />
    </label>
  </div>
        </div>
   )
}

export default Pagin