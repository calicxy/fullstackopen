import axios from 'axios'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'

const App = () => {
    
    const [countries, setCountries] = useState([])
    const [searchField, setSearchField] = useState('')

    //initialize effect
    const hook = () => {
        console.log('effect')
        axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
            console.log('promise fulfilled')
            setCountries(response.data)
        })
    }
    useEffect(hook, [])
    console.log('render', countries.length, 'countries')

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setSearchField(event.target.value)
    }
    const countriesToShow = countries.filter(country => (country.name.common).toLowerCase().includes(searchField.toLowerCase()))
    console.log(countriesToShow.length, 'countries')


    if (countriesToShow.length > 10){
        console.log('more than 10 countries')
        return(
            <div>
                <Filter text='find countries' filterText={searchField} onchange={handleSearchChange}/>
                <p>Too many matches, specify another filter</p>
            </div>
            
        )
    }
    else if (countriesToShow.length === 1){
        console.log('only 1 country')
        const country = countriesToShow[0]
        const langArr = Object.values(country.languages)
        return(
            <div>
                <Filter text='find countries' filterText={searchField} onchange={handleSearchChange}/>
                <h1>{country.name.common}</h1>
                <p>
                    capital: {countriesToShow[0].capital}
                    <br/>
                    area: {countriesToShow[0].area}
                </p>
                <h3>languages</h3>
                <ul>
                    {langArr.map((language, i) => 
                    <li key={i}> {language} </li>)}
                </ul>
                <img src={country.flags.png} alt=''/>
            </div>
        )
    }
    else {
        console.log('btwn 1 to 10 countries or 0')

        return(
            <div>
                <Filter text='find countries' filterText={searchField} onchange={handleSearchChange}/>
                <div>
                    {countriesToShow.map(country => <p>{country.name.common}</p>)}
                </div>
            </div>
        )
    }
}

export default App