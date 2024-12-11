import React, { useEffect, useState } from 'react'

type Weather = {
    id: number,
    cityName: string,
    temperature: number,
    weather: string,
    icon: string
}

const WeatherApp = () => {
    const [searchWeather, setSeachWeather] = useState('')
    const [weathers, setWeathers] = useState<Weather[]>()
    const [weather, setWeather] = useState<Weather|null>()
    const [error, setError] = useState('')

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setSeachWeather(e.target.value)
    }

    const fetchWeathers= async()=>{
        try {
            const response = await fetch('/Weather.json')
            if (!response.ok) {
                throw new Error
            }
            const data = await response.json()
            setWeathers(data.weather)
            console.log(weathers)                
        } catch (error) {
            console.error('error: ', error)
        }
    }


    const findWeather = ()=>{
        const found = weathers?.find(u=>
            u.cityName.toLowerCase().includes(searchWeather.toLowerCase())
        )
        if (found) {
            setWeather(found)
            setError('')
        }
        else{
            setWeather(null)
            setError('No user found with the given name.')
        }
    }


    useEffect(()=>{
        fetchWeathers()
    },[])


  return (
    <div className='weather-card'>
        <div className='search-container'>
            <input
                type="text"
                value={searchWeather}
                onChange={handleSearch}
            />
            <button onClick={findWeather}>Search</button>
        </div>
        <div className='result-section'>
        {error && <p>{error}</p>}
        {weather && (
                <div className='weather-info'>
                    <img src={weather?.icon} alt={weather?.cityName} className='weather-icon'/>
                    <div className='weather-details'>
                        <p>City: {weather?.cityName}</p>
                        <p>Temperature: {weather?.temperature}°C</p>
                        <p>Weather: {weather?.weather}</p>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default WeatherApp