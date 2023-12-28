
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

async function addToDom() {
    const input = document.getElementById('region-input')
    const weatherObj = await getWeather(input.value)
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

const button = document.getElementById('validate-region')
button.addEventListener('click', addToDom)

async function getFutureForecast(){
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=b9d5054bdd6e474c906163150232512&q=London&days=7&aqi=no&alerts=no`)
    const data = await response.json()
    console.log(data.forecast.forecastday)
    let forecastArray = data.forecast.forecastday

    for (let i = 1; i <= forecastArray.length; i++){
        const day = document.getElementById(`day${i}`)
        day
    }
    console.log(data.forecast.forecastday[0].day.condition.icon)
    console.log(data.forecast.forecastday[0].day.condition.text)


}

getFutureForecast()