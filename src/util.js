const API_ENDPOINT = 'https://dummyjson.com/'

let apiController = null
const getProducts = async (searchVal) => {
    if(apiController){
        apiController.abort()
    }
    apiController = new AbortController()
   try{
      const result = fetch(API_ENDPOINT + 'products/search?q='+ searchVal, { signal: apiController.signal }).then(res => res.json())
      return result
    }
   catch(e){
    console.log(e)
   }
}
 
const toDebouncedFunction = (fn, dbPeriod) => {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn(...args)
        }, dbPeriod)
    }
}