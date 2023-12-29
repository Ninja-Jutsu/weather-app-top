
import changeDaysBgOnCLick from "./style.js"

async function getWeather(city) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=b9d5054bdd6e474c906163150232512&q=${city}&aqi=no`)
    const data = await response.json()
    const countryName = data.location.country
    const isDay = data.current.is_day
    const icon = data.current.condition.icon
    const regionName = data.location.region
    const cityName = data.location.name

    const localTime = data.location.localtime
    const description = data.current.condition.text
    const humidity = data.current.humidity
    const rain = data.current.precip_in
    const wind = data.current.wind_kph
    const temperature = Math.round(data.current.temp_c)
    const feelsLike = data.current.feelslike_c
    return { isDay,icon,countryName, regionName,cityName, localTime, description, humidity, rain, wind, temperature, feelsLike }
}

async function addToDom(input) {
    const weatherObj = await getWeather(input)
    const country = document.getElementById('country')
    const city = document.getElementById('city')
    const description = document.getElementById('description')
    const temperature = document.getElementById('temperature')
    const localTime = document.getElementById('time')
    const mainIcon = document.getElementById('mainIcon')
    const precipitation = document.getElementById('precipitation')
    const humidity = document.getElementById('humidity')
    const wind = document.getElementById('wind')


    country.innerText = weatherObj.countryName
    city.innerText = weatherObj.regionName || weatherObj.cityName
    description.innerText = weatherObj.description
    temperature.innerText = weatherObj.temperature
    localTime.innerText = weatherObj.localTime
    mainIcon.src = weatherObj.icon
    precipitation.innerText = weatherObj.rain +'mm'
    humidity.innerText = weatherObj.humidity +'%'
    wind.innerText = weatherObj.wind +' kph'
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
        const date = document.getElementById(`date${i}`)

        let dateName = new Date(data.forecast.forecastday[i-1].date)
        let today = dateName.getDay()
        
        let dayInLetters = switchDayNumberToName(today)
        day.innerText = dayInLetters
        date.innerText = data.forecast.forecastday[i-1].date
        weatherIcon.src = data.forecast.forecastday[i-1].day.condition.icon
        celsiusTemp.innerText = Math.round(data.forecast.forecastday[i-1].day.avgtemp_c)
        ferTemp.innerText = Math.round(data.forecast.forecastday[i-1].day.avgtemp_f)
    }
    clickSpecificDay()
}

async function updateHeaderWhenDayIsClicked(city, date){
    const response = await fetch(`http://api.weatherapi.com/v1/future.json?key=b9d5054bdd6e474c906163150232512&q=${city}&dt=${date}`)
    const result = await response.json()

    const localTime = document.getElementById('time')
    const precipitation = document.getElementById('precipitation')
    const humidity = document.getElementById('humidity')
    const wind = document.getElementById('wind')
    const description = document.getElementById('description')
    const temperature = document.getElementById('temperature')
    
    localTime.innerText = date
    precipitation.innerText = result.forecast.forecastday[0].totalprecip_mm
    humidity.innerText = result.forecast.forecastday[0].day.avghumidity
    wind.innerText = result.forecast.forecastday[0].day.avgvis_km
    description.innerText = result.forecast.forecastday[0].day.condition.text
    temperature.innerText = result.forecast.forecastday[0].day.avgtemp_c


}

function clickSpecificDay(){
    const allDays = document.getElementsByClassName('day')
    for (let i = 0; i < allDays.length ; i++){
        const city = document.getElementById('city').innerText
        const date = document.getElementById(`date${i+1}`).innerHTML
        allDays[i].addEventListener('click', () => {
            updateHeaderWhenDayIsClicked(city, date)
        })
    }
}

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
    addToDom(input.value)
    getFutureForecast(input.value)
}
)

window.addEventListener('load', () => {
    addToDom('Kenitra')
    getFutureForecast('Kenitra')
})

changeDaysBgOnCLick()
updateHeaderWhenDayIsClicked('kenitra', '2024-01-01')