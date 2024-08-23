'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, {  useEffect, useState } from 'react'

export default function Page(){
    const [results,setResults] = useState([])
    const searchParams = useSearchParams()
    const search = searchParams.get('query')
    useEffect(()=>{
        const getSearchResults = async()=>{
            const res = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=81304975`)
                const data = await res.json()
                setResults(data.Search)
                // console.log(data)
        }
        getSearchResults()
    },[])
    return <>
    <p>Search results for : <b>{search}</b></p>
    {
        results?.map((movie)=>(
           <Link href={`movie/${movie.imdbID}`} key={movie.imdbID}> <h1 className='my-2 bg-gray-100' >{movie.Title}</h1></Link>
        ))
    }
    </>

}
