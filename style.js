export default function changeDaysStyleOnCLick(){
    const allDays = document.getElementsByClassName('day')
    for (let i = 0; i < allDays.length ; i++){
        allDays[i].addEventListener('click', () => {
            for( let y = 0; y < allDays.length; y++){
                allDays[y].removeAttribute('style')
            }
            allDays[i].style.opacity = 1
        })
    }
}

export async function changeOverlayIfDayOrNight(city){
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=b9d5054bdd6e474c906163150232512&q=${city}&aqi=no`)
    const data = await response.json()

    const isDay = data.location.localtime
    console.log(isDay)
    console.log(typeof isDay)
    
    const result = isDay.match((/ .*:/))
    const hourString = result[0].slice(0,-1)
    console.log(hourString)
    const root = document.querySelector(':root');
    const morning = document.getElementById('morning')
    const night = document.getElementById('night')
    const afternoon = document.getElementById('afternoon')
    const overLay = document.getElementById('overlay1')

    
    if (hourString < 12 && hourString > 6){
        console.log('Morning')
        root.style.setProperty("--overLayColor", "linear-gradient(to bottom, #fde68a 0%, #f7a15b 100%)");
        morning.style.transform = 'translateX(0%) translateY(0%)'
        afternoon.style.transform = 'translateX(-110%) translateY(-50%)'
        night.style.transform = 'translateX(-110%) translateY(-50%)'
    }
    else if (hourString > 12 && hourString < 18){
        console.log('Afternoon')
        root.style.setProperty("--overLayColor", "linear-gradient(to bottom, #d97706 0%, #0e7490 100%)");
        morning.style.transform = 'translateX(-110%) translateY(-50%)'
        afternoon.style.transform = 'translateX(0%) translateY(0%)'
        night.style.transform = 'translateX(-110%) translateY(-50%)'
    }else{
        console.log('Night')
        root.style.setProperty("--overLayColor", "linear-gradient(to bottom, #94a3b8 0%, #475569 100%)");
        morning.style.transform = 'translateX(-110%) translateY(-50%)'
        afternoon.style.transform = 'translateX(-110%) translateY(-50%)'
        night.style.transform = 'translateX(0%) translateY(0%)'
    }
}