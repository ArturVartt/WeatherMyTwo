const form = document.querySelector('.weather__form')
const myInput = document.querySelector('#input_firstt')
const searchImg = document.querySelector('.search')
const leftBox = document.querySelector('.left_box')
const temperature = document.querySelector('.temperature')
const weatherImg = document.querySelector('.weather_img')
const cityName = document.querySelector('.city_name')
const heart = document.querySelector('.heart')
const cityList = document.querySelector('ul')

function clean() {
    myInput.value = ''
}

const myArr = []

function render(addCityName) {

    const cityListItem = document.createElement('li')
    cityListItem.classList.add('city__list-item')
    
    const text = document.createElement('p')

    const imgClose = document.createElement('img')
    imgClose.classList.add('close')
    imgClose.src = './img/close-icon.svg'
    
   
    text.textContent = addCityName
    cityListItem.append(text) 
    cityList.append(cityListItem)
    cityListItem.append(imgClose)

    function deletes() {
        cityListItem.remove()
        const fiendIndex = myArr.findIndex(myArrIndex => myArrIndex === cityListItem.textContent)
        myArr.splice(fiendIndex, 1)
        console.log(myArr);
    }

    imgClose.addEventListener('click', deletes) 

    text.addEventListener('click', () => {
        searchCity(t.textContent)
    })
}

function searchCity(city) {
    const CityValue = city
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f&units=metric';
    const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';

    fetch(`${serverUrl}?q=${CityValue}&appid=${apiKey}`)
        .then(respones => respones.json())
        .then(object => {
            const temp = Math.round(object.main.temp)
            temperature.textContent = temp + '°'

            const nameCity = object.name
            cityName.textContent = nameCity

            const weatherIcon = `https://openweathermap.org/img/wn/${object.weather[0].icon}@4x.png`
            weatherImg.src = weatherIcon
        })
}

function addFavoriteCity() {
    if (myArr.includes(cityName.textContent) === true) {
        alert('Этот город уже добавлен')
        return
    }
    myArr.push(cityName.textContent)
    console.log(myArr);
    const lengthArr = myArr[myArr.length - 1]
    render(lengthArr)
}

cityName.addEventListener('click', function () {
    addFavoriteCity()
})
heart.addEventListener('click', function () {
    addFavoriteCity()
})

form.addEventListener('submit', function (event) {
    event.preventDefault()
    searchCity(myInput.value)
    clean()
})
searchImg.addEventListener('click', function () {
    searchCity(myInput.value)
    clean()
})
