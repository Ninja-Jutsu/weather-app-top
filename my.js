
import changeDaysStyleOnCLick, { changeOverlayIfDayOrNight } from "./style.js"

async function getWeatherForHeader(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=b9d5054bdd6e474c906163150232512&q=${city}&aqi=no`)
    const data = await response.json()
    console.log(data)
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
    console.log("getWeatherForHeader")

    return { isDay, icon, countryName, regionName, cityName, localTime, description, humidity, rain, wind, temperature, feelsLike }
}

async function addToHeaderDomOnSearch(input) {
    const weatherObj = await getWeatherForHeader(input)
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
    precipitation.innerText = weatherObj.rain + 'mm'
    humidity.innerText = weatherObj.humidity + '%'
    wind.innerText = weatherObj.wind + ' kph'
    console.log("addToHeaderDomOnSearch")
}

async function getFutureForecast(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b9d5054bdd6e474c906163150232512&q=${city}&days=7&aqi=no&alerts=no`)
    const data = await response.json()
    const forecastArray = data.forecast.forecastday
    return forecastArray
}

async function addFutureForecastToDom(city) {
    const forecastArray = await getFutureForecast(city)
    for (let i = 1; i <= forecastArray.length; i++) {
        const day = document.getElementById(`dayName${i}`)
        const weatherIcon = document.getElementById(`icon${i}`)
        const celsiusTemp = document.querySelector(`.mini-celsius${i}`)
        const ferTemp = document.querySelector(`.mini-fer${i}`)
        const date = document.getElementById(`date${i}`)
        const miniPrep = document.getElementsByClassName('mini-prep')
        const miniHumid = document.getElementsByClassName(`mini-humid`)
        const miniWind = document.getElementsByClassName(`mini-wind`)
        const miniDescription = document.getElementsByClassName(`mini-description`)
        let dateName = new Date(forecastArray[i - 1].date)
        let today = dateName.getDay()
        let dayInLetters = switchDayNumberToName(today)

        miniPrep[i - 1].innerText = forecastArray[i - 1].day.totalprecip_mm
        miniHumid[i - 1].innerText = forecastArray[i - 1].day.avghumidity
        miniWind[i - 1].innerText = forecastArray[i - 1].day.avgvis_km
        miniDescription[i - 1].innerText = forecastArray[i - 1].day.condition.text
        day.innerText = dayInLetters
        date.innerText = forecastArray[i - 1].date
        weatherIcon.src = forecastArray[i - 1].day.condition.icon
        celsiusTemp.innerText = Math.round(forecastArray[i - 1].day.avgtemp_c)
        ferTemp.innerText = Math.round(forecastArray[i - 1].day.avgtemp_f)
    }
    console.log('addFutureForecastToDom')
}

async function updateHeaderWhenDayIsClicked(day) {
    //Targeted elements
    const localTime = document.getElementById('time')
    const precipitation = document.getElementById('precipitation')
    const humidity = document.getElementById('humidity')
    const wind = document.getElementById('wind')
    const description = document.getElementById('description')
    const temperature = document.getElementById('temperature')
    const icon = document.getElementById('mainIcon')

    const allMiniDescriptions = document.getElementsByClassName('mini-description')
    icon.src = document.getElementById(`icon${day}`).src
    precipitation.innerText = document.getElementById(`mini-prep${day}`).innerText
    humidity.innerText = document.getElementById(`mini-humid${day}`).innerText
    wind.innerText = document.getElementById(`mini-wind${day}`).innerText
    description.innerText = allMiniDescriptions[day - 1].innerText
    temperature.innerText = document.querySelector(`.mini-celsius${day}`).innerText
    localTime.innerText = document.getElementById(`date${day}`).innerText
}

function clickSpecificDay() {
    const allDays = document.getElementsByClassName('day')
    for (let i = 0; i < allDays.length; i++) {
        allDays[i].addEventListener('click', () => {
            updateHeaderWhenDayIsClicked(i + 1)
        })
    }
    console.log('clickSpecificDay')
}

function switchDayNumberToName(date) {
    switch (date) {
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

// Load Rabat forecast onload:
window.addEventListener('load', () => {
    addToHeaderDomOnSearch('Kenitra')
    addFutureForecastToDom('Kenitra')
    clickSpecificDay()
    changeOverlayIfDayOrNight('Kenitra')
    changeBadIcons()
})

//Load searched city forecast
const button = document.getElementById('validate-region')
button.addEventListener('click', () => {
    const input = document.getElementById('region-input')
    addToHeaderDomOnSearch(input.value)
    addFutureForecastToDom(input.value)
    changeOverlayIfDayOrNight(input.value)
    input.value = ''
}
)

async function changeBadIcons() {
    const description = document.getElementById('description').innerText
    console.log(description)
    const mainIcon = document.getElementById('icon-temp')
    console.log(1)
    if (description === 'Clear') {
        console.log(2)
        mainIcon.src = 'img/clear-sky.svg'
    }
    console.log('changeBadIcons')
}

// Switch unit:
function switchUnit(){
    const celsius = document.querySelector('.celsius')
    const fer = document.querySelector('.fer')
    const temperature = document.getElementById('temperature')
    let counter = 1;

    celsius.addEventListener('click', () => {
        if(counter === 0){
            temperature.innerText = Math.round((temperature.innerText - 32) * 5/9)
            counter = 1
        }
    })

    fer.addEventListener('click', () => {
        if(counter === 1){
        temperature.innerText = Math.round((temperature.innerText * 9/5) + 32)
        counter = 0
        }
    })
}


changeDaysStyleOnCLick()
switchUnit()

