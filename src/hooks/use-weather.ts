import { useQuery } from '@tanstack/react-query';
import { Coordinates } from '../api/types';
import { weatherApi } from '@/api/weather';

export const weather_keys = {
    weather: (coordinates: Coordinates) => ["weather", coordinates] as const,
    forecast: (coordinates: Coordinates) => ["forecast", coordinates] as const,
    reverseGeocode: (coordinates: Coordinates) => ["reverseGeocode", coordinates] as const, //location
} as const;

export function useWeatherQuery(coordinates: Coordinates | null) {
    return useQuery({
        //tanstack stuff
        // if the weather data for a location has been fetched within the last x minutes
        // there shouldn't be a new api call for that location
        queryKey: weather_keys.weather(coordinates ?? { latitude: 0, longitude: 0 }),
        queryFn: () =>
            coordinates ? weatherApi.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates,

    });
}

export function useForeCastQuery(coordinates: Coordinates | null) {
    return useQuery({
        //tanstack stuff
        // if the weather data for a location has been fetched within the last x minutes
        // there shouldn't be a new api call for that location
        queryKey: weather_keys.forecast(coordinates ?? { latitude: 0, longitude: 0 }),
        queryFn: () =>
            coordinates ? weatherApi.getForecast(coordinates) : null,
        enabled: !!coordinates,

    });
}

export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
    return useQuery({
        //tanstack stuff
        // if the weather data for a location has been fetched within the last x minutes
        // there shouldn't be a new api call for that location
        queryKey: weather_keys.reverseGeocode(coordinates ?? { latitude: 0, longitude: 0 }),
        queryFn: () =>
            coordinates ? weatherApi.reverseGeoCode(coordinates) : null,
        enabled: !!coordinates,

    });
}