
async function getWeather(city){
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=b9d5054bdd6e474c906163150232512&q=${city}&aqi=no`)
    const data = await response.json()
    const countryName = data.location.country
    const cityName = data.location.name
    const localTime = data.location.localtime

    const description = data.current.condition.text
    const humidity = data.current.humidity
    const temperature = data.current.temp_c
    const feelsLike = data.current.feelslike_c
    return {countryName,cityName,localTime,description,humidity,temperature,feelsLike}
}

async function addToDom(){
    const input = document.getElementById('region-input')
    const weatherObj = await getWeather(input.value)
    const country = document.getElementById('country') 
    const city = document.getElementById('city') 
    const description = document.getElementById('description') 
    const temperature = document.getElementById('temperature')
    const localTime = document.getElementById('time')

    country.innerText = weatherObj.countryName
    city.innerText = weatherObj.cityName
    description.innerText = weatherObj.description
    temperature.innerText =  weatherObj.temperature
    localTime.innerText =  weatherObj.localTime
}

const button = document.getElementById('validate-region')
button.addEventListener('click', addToDom)