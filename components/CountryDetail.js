import React, { useEffect, useState } from 'react'
import './CountryDetails.css'
import { useLocation, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import CountryDetailShimmer from './CountryDetailShimmer'

export default function CountryDetail() {
    const [isDark] = useTheme()
    const params = useParams()
    const {state} = useLocation()
    const countryName = params.country
    
   
    const [countryData, setCountryData] = useState(null)
    const [notFound, setNotFound] = useState(false)

    function updateCountryData(data) {
      setCountryData({
        flag: data.flags.svg,
        name: data.name.common || data.name,
        nativeName: Object.values(data.name.nativeName || {})[0]?.common,
        population: data.population,
        region: data.region,
        capital: data.capital.join(','),
        subregion: data.subregion,
        tld: data.tld.join(','),
        currencies: Object.values(data.currencies || {}).map((Currency) => Currency.name).join(','),
        languages: Object.values(data.languages || {}).join(','),
        borders: []
      })

if(!data.borders) {
data.borders = []
}
Promise.all(data.borders.map((border) => {
  return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
   .then((res) => res.json())
   .then(([borderCountry]) => borderCountry.name.common)
 })).then((borders) => {
   console.log(borders);
   setTimeout(() =>  setCountryData((prevState) => ({...prevState, borders})))
 })
 
 }
    

    console.log(countryData?.borders);

    useEffect(() => {
      if(state) {
        updateCountryData(state)
        return
      }
        fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then((res) => res.json())
        .then(([data]) => {
          updateCountryData(data)

})
.catch((err) => {
  console.log(err);
  setNotFound(true)
})

    }, [countryName])

    if(notFound) {
      return <div>Country Not Found</div>
    }


    
  return (
    <main className={`${isDark ? 'dark': ''}`}>
      <div className="country-container">
      <span className="back-button" onClick={() => history.back()}
        ><i className="fa-solid fa-arrow-left"></i>&nbsp; &nbsp;Back</span
      >
        {countryData === null ? (<CountryDetailShimmer />) : 
      (<div className="country-details">
        <img src={countryData.flag} alt="flag" />

        <div className="country-content">
          <h1 className="title">{countryData.name}</h1>
          <div className="content-text">
            <p><b>Native Name:</b> <span className="native-name">{countryData.nativeName || countryData.name}</span></p>
            <p><b>Population:</b> <span className="population"> {countryData.population}</span></p>
            <p><b>Region:</b> <span className="region">{countryData.region}</span></p>
            <p><b>Sub Region:</b> <span className="sub-region">{countryData.subregion}</span></p>
            <p><b>Capital:</b><span className="capital"> {countryData.capital}</span></p>
            <p><b>Top Level Domain:</b><span className="top-level-domain">{countryData.tld} </span></p>
            <p><b>Currencies:</b> <span className="currencies">{countryData.currencies}</span></p>
            <p><b>Languages:</b> <span className="language">{countryData.languages}</span></p>
          </div>
          {countryData.borders.length !==0 && <div className="border-countries"> &nbsp; &nbsp;
            <b>Border Countries:</b> 
            {
              countryData.borders.map((border) => <Link key={border} to={`/${border}`}>{border}</Link>)
            }
            </div> }
         </div>
      </div>)}
    </div>
    </main> 
  )
}
