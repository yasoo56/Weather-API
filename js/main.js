let serachInput = document.querySelector('#serachInput')
let Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let currentDate = new Date()
let day = currentDate.getDay()
let month = currentDate.getMonth()
let currentDateOfDay = currentDate.getDate()
let showDay = Days[day]
let showMonth = months[month]
let List = []
let home = document.querySelector('#home')
let contact = document.querySelector('#contact')
let live = document.querySelector('#live')
let photo = document.querySelector('#photo')
let news = document.querySelector('#news')

home.addEventListener('click',function(){
    contact.classList.remove('active')
    live.classList.remove('active')
    photo.classList.remove('active')
    news.classList.remove('active')
})
news.addEventListener('click',function(){
    contact.classList.remove('active')
    live.classList.remove('active')
    photo.classList.remove('active')
    home.classList.remove('active')
    news.classList.add('active')
})
live.addEventListener('click',function(){
    contact.classList.remove('active')
    live.classList.add('active')
    photo.classList.remove('active')
    home.classList.remove('active')
    news.classList.remove('active')
})
photo.addEventListener('click',function(){
    contact.classList.remove('active')
    live.classList.remove('active')
    photo.classList.add('active')
    home.classList.remove('active')
    news.classList.remove('active')
})
contact.addEventListener('click',function(){
    home.classList.remove('active')
    contact.classList.add('active')
    live.classList.remove('active')
    photo.classList.remove('active')
    news.classList.remove('active')
})



serachInput.addEventListener('change', function () {
    getApi(serachInput.value)
    clearData()
})

async function getApi(country = 'Egypt') {
    let Api = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=388d995d0ef64cf296a135018240401&q=${country}&days=3`)
    let data = await Api.json()
    console.log(data.location)
    showData(data)
    showNextData(data)
    showNextData2(data)
}
getApi()

function showData(element) {
    let temp = ` 
    <div class="card">
    <div class="card-header d-flex justify-content-between">
    <h5 class="fs-6">${showDay}</h5>
        <h5 class="fs-6">${currentDateOfDay}/${showMonth}</h5>
        </div>
        <div class="home-content ps-4 pt-3">
        <h5 class="fs-5">${element.location.name}</h5>
        <span class="span-1">${element.current.temp_c}ºC</span>
        <img src="${element.current.condition.icon}" alt="" class="d-block pt-3 w-25" >
        <p class="mb-3">${element.current.condition.text}</p>
    <span class="text-white-50 "><img src="images/icon-umberella.png" alt="" >  ${element.current.humidity}%</span>
    <span class="text-white-50 ms-3"><img src="images/icon-wind.png" alt="" >  ${element.current.wind_kph}km/h</span>
    <span class="text-white-50 ms-3"><img src="images/icon-compass.png" alt="" > ${element.current.wind_dir}</span>
  </div>

  </div>
  `
    document.querySelector('#weatherData').innerHTML = temp
}
function showNextData(element) {
    

        let nextDay = element.forecast.forecastday[1].date
        let changeDay = new Date(nextDay)
        let showDays = Days[changeDay.getDay()]
        let result = `<div class="card">
        <div class="card-header card-2 text-center">
        <h5 class="fs-6">${showDays}</h5>
        </div>
        <div class="home-content card-body-2 text-center">
        <img src="${element.forecast.forecastday[1].day.condition.icon}" alt="" class="pt-3">
        <h5 class="fs-3 text-white mt-3">${element.forecast.forecastday[1].day.maxtemp_c}ºC</h5>
        <h5 class="text-white-50 fs-5">${element.forecast.forecastday[1].day.mintemp_c}ºC</h5>
        <p class="card-text mt-4"> ${element.forecast.forecastday[1].day.condition.text}</p>
        </div>
        </div>
        `
        document.querySelector('#weatherData2').innerHTML = result



}
function showNextData2(element) {
 

        let nextDay = element.forecast.forecastday[2].date
        let changeDay = new Date(nextDay)
        let showDays = Days[changeDay.getDay()]
        let result = `<div class="card">
        <div class="card-header text-center">
        <h5 class="fs-6">${showDays}</h5>
                </div>
                <div class="home-content card-body text-center">
                    <img src="${element.forecast.forecastday[2].day.condition.icon}" alt="" class="pt-3">
                     <h5 class="fs-3 text-white mt-3">${element.forecast.forecastday[2].day.maxtemp_c}ºC</h5>
                    <h5 class="text-white-50 fs-5">${element.forecast.forecastday[2].day.mintemp_c}ºC</h5>
                    <p class="card-text mt-4"> ${element.forecast.forecastday[2].day.condition.text}</p>
                    </div>
                    </div>
                    `
        document.querySelector('#weatherData3').innerHTML = result
  
}



function clearData() {
    serachInput.value = ''
}