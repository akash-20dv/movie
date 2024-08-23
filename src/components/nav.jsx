'use client'
import { debounce } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState,useMemo, useEffect } from 'react'

const NavigationMenu = () => {
  const [search,setSearch] = useState('')
  const [searchedItems, setSearchedItems]=useState([])
  const params  = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const {replace} = useRouter()
  useEffect(()=>{
    const fetchMovies = async()=> {
      if(!search) return ;
      try{
        const res = await fetch(`http://www.omdbapi.com/?s=${search}&plot=full&apikey=81304975`) 
      const data = await res.json()
      if(data.Response==="True"){
        setSearchedItems(data.Search)
      }
      }catch(err){
        console.log(err)
      }

      
    }
    fetchMovies()
  },[search])
  const searchParams = new URLSearchParams(params)
  const handleChange = (e)=>{
    setSearch(e.target.value)
    if(search){
      searchParams.set('query',search)
    }else{
      searchParams.delete('query')
    }
    replace(`${pathname}?${searchParams.toString()}`)
    console.log(search)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      router.push(`/search_result?query=${encodeURIComponent(search)}`);
    }
  
  }
  const debounced = debounce(handleChange,400)
  return (<>
    <div className='flex items-center justify-between px-4 py-2 z-[9999] relative bg-gray-400/35 backdrop-blur-2xl'>
        <h2>Logo</h2>
        <div className='focus-within:grow relative mx-4 group flex rounded-full transition-all'>
          <input onChange={debounced} onKeyDown={handleKeyDown} className='shadow-inner group-focus-within:outline-none w-full px-4 py-2 rounded-full bg-white' placeholder='search here'/>
        {
          searchedItems.length ?
        (  <ul className='max-w-[900px] absolute top-full border-2 w-full  shadow-md md:h-[40vh] overflow-y-auto p-2 bg-gray-50'>
          {searchedItems.length && searchedItems.map((item) => (
            <Link  className='  ' key={item.imdbID} href={`/movie/${item.imdbID}`}><li className='hover:bg-white transition-all py-3 border-b-2 '>
              <div className="flex gap-3">
                  <Image src={item.Poster} height={40} className='aspect-square' width={40} alt={item.Title}/>
                  <div className="flex flex-1 items-center justify-between">
                  <p className='text-teal-500 font-semibold '>{item.Title}</p>
                 
                    <p className='text-slate-800 text-sm'>{item.Year}</p>
                   
                  </div>
              </div>
            </li></Link>
          ))}
          </ul>)
          : ""
        }
        </div>

        <span>okay</span>
    </div>
        <div className="relative flex justify-center">

            </div>
  </>
  )
}

export default NavigationMenu