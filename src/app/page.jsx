'use client'
import NavigationMenu from "@/components/nav";
import TopMovies from "@/components/TopMovies";
import { Suspense, useEffect, useState } from "react";
export default function Page() {
  const [topMovies , setTopMovies] = useState([])
  const ids = ['tt0111161', 'tt0068646','tt0468569','tt0108052','tt0167260','tt0050083','tt0071562']
  useEffect(()=>{
    const fetchMoviesById = async (id)=>{
      const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=81304975`)
      const data = await res.json()
      return data
    }
    const moviesData = async()=>{
      const mappedMovies = ids.map((movie)=>( fetchMoviesById(movie)))
      const movieDataById = await Promise.all(mappedMovies);
      setTopMovies(movieDataById)
    }
    moviesData()
  },[])
  return (<>
    <Suspense>
      <NavigationMenu/>
    </Suspense>
      <TopMovies topMovies={topMovies}/>
  </>
  );
}
