import type { ForecastData } from "@/api/types";
import { format } from "date-fns";
import { Card, CardContent, CardTitle, CardHeader } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface WeatherForecastProps {
    data: ForecastData;
}

interface DailyForecast {
    date: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    wind: number;
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    };
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
    const formatTemp = (temp: number) => `${Math.round(temp)}°`;

    // Process forecast data to extract daily summaries
    const dailyForecast = data.list.reduce((acc, forecast) => {
        const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

        // Conditional accumulation
        if (!acc[date]) {
            acc[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                weather: forecast.weather[0],
                date: forecast.dt,
            };
        } else {
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max); // Fixed temp_max update
        }

        return acc;
    }, {} as Record<string, DailyForecast>);

    // Select the next 5 days for display
    const nextDays = Object.values(dailyForecast).slice(0, 6);

    return (
        <Card>
            <CardHeader>
                <CardTitle>5 Day Forecast</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {nextDays.map((day) => (
                        <div key={day.date} 
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-4 rounded-lg border p-4"
                        >
                            {/* Date & Weather Description */}
                            <div>
                                <p className="font-medium">
                                    {format(new Date(day.date * 1000), "EEE, MMM d")}
                                </p>
                                <p className="text-muted-foreground capitalize">{day.weather.description}</p>
                            </div>

                            {/* Temperature Details */}
                            <div className="flex justify-center gap-4">
                                <span className="flex items-center text-blue-500">
                                    <ArrowDown className="mr-1 h-4 w-4" />
                                    {formatTemp(day.temp_min)}
                                </span>
                                <span className="flex items-center text-red-500">
                                    <ArrowUp className="mr-1 h-4 w-4" />
                                    {formatTemp(day.temp_max)}
                                </span>
                            </div>

                            {/* Humidity & Wind */}
                            <div className="flex justify-end gap-4">
                                <span className="flex items-center gap-1">
                                    <Droplets className="h-4 w-4 text-blue-500" />
                                    <span className="text-sidebar-primary-foreground">
                                        {day.humidity}%
                                    </span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <Wind className="h-4 w-4 text-blue-500" />
                                    <span className="text-sidebar-primary">
                                        {day.wind}m/s
                                    </span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default WeatherForecast;
