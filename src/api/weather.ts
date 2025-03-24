import { api_config } from "@/api/config.ts";
import { Coordinates, WeatherData, ForecastData, GeocodingResponse } from "@/api/types.ts";

class WeatherApi {
    private createUrl(
        endpoint: string,
        params: Record<string, string | number>
    ) {
        const searchParams = new URLSearchParams({
            appid: api_config.api_key,
            ...params,
        });

        return `${endpoint}?${searchParams.toString()}`;
    }
    private async fetchData<T>(url: string): Promise<T> {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Weather API Error: ${response.statusText}`);
        }

        return response.json();
    }
    async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
        const url = this.createUrl(`${api_config.base_url}/weather`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: api_config.default_params.units,
        });

        return this.fetchData<WeatherData>(url);

    }

    async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
        const url = this.createUrl(`${api_config.base_url}/forecast`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: api_config.default_params.units,
        });

        return this.fetchData<ForecastData>(url);

    }

    async reverseGeoCode({ lat, lon }: Coordinates): Promise<GeocodingResponse[]> {
        const url = this.createUrl(`${api_config.geo}/reverse`, {
            lat: lat.toString(),
            lon: lon.toString(),
            limit: 1,
        });

        return this.fetchData<GeocodingResponse[]>(url);

    }

    async searchLocations(query: string): Promise<GeocodingResponse[]> {
        const url = this.createUrl(`${api_config.geo}/direct`, {
            q: query,
            limit: "5",
        });

        return this.fetchData<GeocodingResponse[]>(url);

    }
}

export const weatherApi = new WeatherApi();