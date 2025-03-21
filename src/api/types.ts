export interface Coordinates {
    lat: number;
    lon: number;
}

export interface WeatherCondition {
    id: number;
    name: string;
    description: string;
    icon: string;
}

export interface WeatherData {
    coord: Coordinates;
    //weather: WeatherCondition[];
    weather: any;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    wind:{
        deg(deg: any): unknown;
        speed: number;
        degree: number;
    };
    sys:{
        sunrise: number;
        sunset: number;
        country: string;
    };
    name: string;
    dt: number;
}

export interface ForecastData {
    list: Array<{
        dt: number;
        main: WeatherData["main"];
        weather: WeatherData["weather"];
        wind: WeatherData["wind"];
        dt_txt: string;
    }>;
    city: {
        name: string;
        country: string;
        sunrise: number;
        sunset: number;
    };
}


export interface GeocodingResponse {
    name: string;
    local_names?: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}