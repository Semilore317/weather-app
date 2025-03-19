import { useQuery } from '@tanstack/react-query';
import { Coordinates } from '../api/types';
import { weatherApi } from '@/api/weather';

export const weather_keys = {
    weather: (coordinates: Coordinates) => ["weather", coordinates] as const
}

export function useWeatherQuery(coordinates: Coordinates | null) {
    return useQuery({
        //tanstack stuff
        // if the weather data for a location has been fetched within the last x minutes
        // there shouldn't be a new api call for that location
        queryKey: weather_keys.weather(coordinates ?? { latitude: 0, longitude: 0 }),
        queryFn: () => 
            coordinates? weatherApi.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates,

    });
}

