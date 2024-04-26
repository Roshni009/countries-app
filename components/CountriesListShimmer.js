import React from 'react'
import './CountryListShimmer.css'

export default function CountriesListShimmer() {

    // const mapped = Array.from({length: 12}).map((el, i) => {
    //     return <div key={i} className="country-card shimmer-effect"></div>
    // })
  return (
    <div className="countries-container">
      {Array.from({length: 12}).map((el, i) => {
        return (
           <div key={i} className="country-card shimmer-card">
           <div className="flag-container"></div>
           <div className="card-text">
            <h3 className='card-title'></h3>
            <p></p>
            <p></p>
            <p></p>
           </div>
           </div>
        )
      })}
      
    </div>
  )
}
