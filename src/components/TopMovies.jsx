import Image from 'next/image'
import React from 'react'

const TopMovies = ({topMovies}) => {
  return (
    <>
    <h1 className='font-bold text-3xl text-center my-6 text-bold capitalize text-teal-500'>Top Movies Till The Date</h1>
    <div className='grid grid-cols-4 gap-4 relative '>
        {topMovies?.map((movie)=>(
           
            <div key={movie.imdbID} className="movieCardWrapper overflow-hidden   group relative w-full rounded-lg ">
                <Image
                    src={movie.Poster}
                    alt={movie.Title}
                    width={300}
                    height={400}
                    className='w-full h-auto aspect-square'
                />
                <div className="absolute top-[73%] group-hover:top-16 shadow-[0px_0px_60px_#000000] h-full flex flex-col gap-2 w-full p-4 bg-black/80 transition-all duration-500 rounded-t-3xl">

                <p className='truncate overflow-hidden font-semibold text-teal-500'>{movie.Title}</p>
                <div className="flex items-center gap-3 justify-between">
                <p className="bg-yellow-400 px-2 py-1 text-black rounded-full text-xs">{movie.Year}</p>
                <p className='flex items-center px-2 text-xs py-1 gap-2 rounded-full bg-yellow-400 text-black'>{eval(movie.Ratings[0].Value)*100}%</p>
                </div>
                <p className='text-slate-500 text-xs'>{movie.Actors}</p>
                <p className="w-full block text-xs text-white  backdrop-blur-3xl">
                    {movie.Plot}
                </p>
                </div>

            </div>
           
                )
            )
        }
    </div>
    </>
  )
}

export default TopMovies