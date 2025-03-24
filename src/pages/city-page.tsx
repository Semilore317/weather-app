import { useParams, useSearchParams } from "react-router-dom";
import { useForeCastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import WeatherSkeleton from "@/components/skeleton";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemperature from "@/components/HourlyTemperature";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import FavouriteButton from "@/components/FavouriteButton";

export const CityPage = () => {
    const [searchParams] = useSearchParams();
    const params = useParams();

    // Ensure valid coordinates
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const isValidCoordinates =
        lat !== null &&
        lon !== null &&
        !isNaN(parseFloat(lat)) &&
        !isNaN(parseFloat(lon));

    const coordinates = isValidCoordinates
        ? { lat: parseFloat(lat), lon: parseFloat(lon) }
        : null;

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForeCastQuery(coordinates);

    console.log("Weather Data:", weatherQuery.data);
    console.log("Forecast Data:", forecastQuery.data);

    // Handle invalid coordinates
    if (!isValidCoordinates) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Invalid Coordinates</AlertTitle>
                <AlertDescription>
                    Please provide valid latitude and longitude values.
                </AlertDescription>
            </Alert>
        );
    }

    // Handle error state
    if (weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    Failed to fetch weather data. Please retry.
                </AlertDescription>
            </Alert>
        );
    }

    // Skeleton loader while fetching data
    if (weatherQuery.isLoading || forecastQuery.isLoading || !params.cityName) {
        return <WeatherSkeleton />;
    }

    return (
        <div className="space-y-6">
            {/* Display location name above everything */}
            {weatherQuery.data && (
                <>
                    <div className="flex justify-between items-center">
                        <div className="flex items-baseline gap-1">
                            <h1 className="text-3xl font-bold tracking-tight">
                                {weatherQuery.data.name}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                , {weatherQuery.data.sys.country}
                            </p>
                        </div>
                        <div>
                            <FavouriteButton data={{ ...weatherQuery.data, name: params.cityName }} />
                        </div>
                    </div>

                </>
            )}

            <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                    {/* Ensure data exists before rendering */}
                    {weatherQuery.data && <CurrentWeather data={weatherQuery.data} />}
                    {forecastQuery.data && <HourlyTemperature data={forecastQuery.data} />}
                </div>
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 items-start">
                    {/* Details */}
                    {weatherQuery.data && <WeatherDetails data={weatherQuery.data} />}
                    {/* Forecast */}
                    {forecastQuery.data && <WeatherForecast data={forecastQuery.data} />}
                </div>
            </div>
        </div>
    );
};
