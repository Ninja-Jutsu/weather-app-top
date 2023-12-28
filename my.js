
import changeDaysBgOnCLick from "./style.js"

async function getWeather(city) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=b9d5054bdd6e474c906163150232512&q=${city}&aqi=no`)
    const data = await response.json()
    const countryName = data.location.country
    const isDay = data.current.is_day
    const icon = data.current.condition.icon
    const cityName = data.location.region
    const localTime = data.location.localtime
    const description = data.current.condition.text
    const humidity = data.current.humidity
    const temperature = data.current.temp_c
    const feelsLike = data.current.feelslike_c
    return { isDay,icon,countryName, cityName, localTime, description, humidity, temperature, feelsLike }
}

async function addToDom(input) {
    const weatherObj = await getWeather(input)
    const country = document.getElementById('country')
    const city = document.getElementById('city')
    const description = document.getElementById('description')
    const temperature = document.getElementById('temperature')
    const localTime = document.getElementById('time')
    const mainIcon = document.getElementById('mainIcon')

    country.innerText = weatherObj.countryName
    city.innerText = weatherObj.cityName
    description.innerText = weatherObj.description
    temperature.innerText = weatherObj.temperature
    localTime.innerText = weatherObj.localTime
    mainIcon.src = weatherObj.icon
}

async function getFutureForecast(city){
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=b9d5054bdd6e474c906163150232512&q=${city}&days=7&aqi=no&alerts=no`)
    const data = await response.json()
    let forecastArray = data.forecast.forecastday
    for (let i = 1; i <= forecastArray.length; i++){
        const day = document.getElementById(`dayName${i}`)
        const weatherIcon = document.getElementById(`icon${i}`)
        const celsiusTemp = document.querySelector(`.mini-celsius${i}`)
        const ferTemp = document.querySelector(`.mini-fer${i}`)

        let dateName = new Date(data.forecast.forecastday[i-1].date)
        let today = dateName.getDay()
        let dayInLetters = switchDayNumberToName(today)
        day.innerText = dayInLetters
        weatherIcon.src = data.forecast.forecastday[i-1].day.condition.icon
        celsiusTemp.innerText = Math.round(data.forecast.forecastday[i-1].day.avgtemp_c)
        ferTemp.innerText = Math.round(data.forecast.forecastday[i-1].day.avgtemp_f)
    }
}

// getFutureForecast()

function switchDayNumberToName(date){
    switch (date){
        case 0:
            return 'Mon'
        break;
        case 1:
            return 'Tue'
        break;
        case 2:
            return 'Wed'
        break;
        case 3:
            return 'Thur'
        break;
        case 4:
            return 'Fri'
        break;
        case 5:
            return 'Sat'
        break;
        case 6:
            return 'Sun'
        break;
    }
}

const button = document.getElementById('validate-region')
button.addEventListener('click', () => {
    const input = document.getElementById('region-input')
    addToDom(input)
    getFutureForecast(input.value)
}
)

window.addEventListener('load', () => {
    addToDom('Rabat')
    getFutureForecast('Rabat')
})

changeDaysBgOnCLick()