export const api_config = {
    base_url : 'https://api.openweathermap.org/data/2.5/',
    geo: "https://api.openweathermap.org/geo/1.0",
    api_key: import.meta.env.VITE_OPENWEATHER_API_KEY,
    default_params: {
        units: "metric",
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
    }
}