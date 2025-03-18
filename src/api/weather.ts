import {api_config} from "@/api/config.ts";
import {Coordinates, WeatherData, ForecastData, GeocodingResponse} from "@/api/types.ts";

class WeatherApi {
    private createUrl(
        endpoint:string,
        params: Record<string, string | number>
    ) {
        const searchParams = new URLSearchParams({
            appid: api_config.api_key,
            ...params,
        });

        return `${endpoint}?${searchParams.toString()}`;
    }
    private async fetchData<T>(url:string): Promise<T> {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Weather API Error: ${response.statusText}`);
        }

        return response.json();
    }
    async getCurrentWeather({latitude, longitude}: Coordinates):Promise<WeatherData>{
        const url = this.createUrl(`${api_config.base_url}/weather`,{
            latitude: latitude.toString(),
            longitude: longitude.toString(),
            units: api_config.default_params.units,
        });

        return this.fetchData<WeatherData>(url);

    }

    async getForecast({latitude, longitude}: Coordinates):Promise<ForecastData>{
        const url = this.createUrl(`${api_config.base_url}/forecast`,{
            latitude: latitude.toString(),
            longitude: longitude.toString(),
            units: api_config.default_params.units,
        });

        return this.fetchData<ForecastData>(url);

    }

    async reverseGeoCode({latitude, longitude}: Coordinates):Promise<GeocodingResponse[]>{
        const url = this.createUrl(`${api_config.geo}/reverse`,{
            latitude: latitude.toString(),
            longitude: longitude.toString(),
            limit: 1,
        });

        return this.fetchData<GeocodingResponse[]>(url);

    }
}

export const weatherApi = new WeatherApi();