import {api_config} from "@/api/config.ts";
import {Coordinates} from "@/api/types.ts";

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
    async getCurrentWeather({latitude, longitude}: Coordinates):Promise<T>{
        const url = this.createUrl(`${api_config.base_url}/weather`,{
            latitude: latitude.toString(),
            longitude: longitude.toString(),
            units: api_config.default_params.units,
        });
    }

    async getForecast(){}

    async reverseGeoCode() {}
}