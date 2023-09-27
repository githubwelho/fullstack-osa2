import { useEffect, useState } from 'react'
import axios, { all } from 'axios'

const DrawLanguages = (country) => {
   const languages = Object.values(country?.country?.languages)
   return(
      languages.map(language => <li key={language}>{language}</li>)
   )
}

const DrawFlag = (country) => {
  const url = `${country?.country?.flags?.png}`
  return(
    <img src={url}></img>
  )
}


function App() {
  const [Search, setSearch] = useState(null)
  const [allCountries, setAllCountries] = useState(null)
  const [weatherState, setWeather] = useState({})


  useEffect( () => {
    console.log('Effect is working')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setAllCountries(response.data.filter((country) => country.name.common.includes(Search))))
    console.log(allCountries)
  }, [Search])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const DrawShow = (country) => {
    return(
      <button onClick={() => setAllCountries(Object.values(country))}>show</button>
    )
  }

  const DrawNames = () => {
    if (allCountries == null){
      return(<>Search by writing...</>)
    }
    if (allCountries.length > 10){
    return(
      <>Too many countries, specify your search...</>
    )}
    if (allCountries.length==0){      
    return(<>No matching countries found...</>)
    }
    if(allCountries.length>1 && 11>allCountries.length){
      return(
        <div>
        {allCountries.map(country => <p key={country.name.common}>{country.name.common} <DrawShow country={country}/></p>)}
        </div>
      )}
    if(allCountries.length==1 && allCountries[0] != null && allCountries[0] != undefined){
      const drawCountry = allCountries[0]
      return(
        <div>
          <h1>{drawCountry?.name?.common}</h1>
          <p>capital {drawCountry?.capital}</p>
          <p>area {drawCountry?.area}</p>
          <h3>languages:</h3>
          <DrawLanguages country={drawCountry}/>
          <DrawFlag country={drawCountry}/>
        </div>
      )
    }
  }

  return (
    <>
    find countries 
    <form>
      <input onChange={handleSearchChange}/>
    </form>
    <DrawNames/>
    </>
  )
}

export default App
