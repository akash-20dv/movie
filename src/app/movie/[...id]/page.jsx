import Link from 'next/link'
import React from 'react'

export async function generateStaticParams(){
   return  []
}
const getMovieData= async(id)=>{
    const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=81304975`)  
   if(!res.ok){
    throw new Error('failed request')
   }
   return res.json()
}
const Page = async ({params}) => {
    const movie = await getMovieData(params.id)    
   
  return (
    <div>
       <div className="container mx-auto px-4 py-8">
      <Link href="/search_result" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back 
      </Link>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {movie.Year} • {movie.Rated} • {movie.Runtime}
            </div>
            <h1 className="mt-1 text-4xl font-bold text-gray-900 leading-tight">
              {movie.Title}
            </h1>
            <p className="mt-2 text-gray-600">{movie.Plot}</p>
            <div className="mt-4">
              <span className="text-gray-700 font-bold">Director:</span> {movie.Director}
            </div>
            <div className="mt-2">
              <span className="text-gray-700 font-bold">Cast:</span> {movie.Actors}
            </div>
            <div className="mt-2">
              <span className="text-gray-700 font-bold">Genre:</span> {movie.Genre}
            </div>
            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-900">Ratings</h2>
                <ul className="mt-2">
                  {movie.Ratings.map((rating, index) => (
                    <li key={index} className="text-gray-600">
                      {rating.Source}: {rating.Value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Page