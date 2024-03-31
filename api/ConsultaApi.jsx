export default async function getCurrentWeather(locationCoords) {
    const axios = require('axios')
    const lat = locationCoords.latitude
    const log = locationCoords.longitude
    var result = []
    await axios.get('https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={b8498ad4fb2403b58277b4a7643e2800')
        .then((response) => {
            const data = response.data
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })
}