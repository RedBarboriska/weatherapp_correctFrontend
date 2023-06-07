
const BASE_URL = 'http://api.weatherapi.com/v1/'

export const getWeatherData = async (query) => {
    const response = await fetch(`${BASE_URL}forecast.json?&days=3&key=${KEY}&q=${query.q}&lang=uk`);
    const jsonData = await response.json();
    console.log(`${BASE_URL}forecast.json?&days=3&key=${KEY}&q=${query.q}&lang=uk`)
    console.log(jsonData)
    return jsonData
}
//`${BASE_URL}current.json?&key=${KEY}&q=${query}&lang=uk`
export const getForecastWeatherData = async (query) => {
    const response = await fetch(`${BASE_URL}forecast.json?&days=3&key=${KEY}&q=${query}&lang=uk`);
    const jsonData = await response.json();
    return jsonData
}