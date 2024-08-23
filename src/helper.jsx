export const fetchDataById = async(id)=>{
    try{
        const res = await fetch(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=81304975`) 
      const data = await res.json()
      if(data.Response==="True"){
        setSearchedItems(data)
      }
      }catch(err){
        console.log(err)
      }
}