import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, RefreshCw, AlertCircle } from "lucide-react";
import { useGeolocation } from "@/hooks/use-geolocation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherSkeleton from "@/components/skeleton";
import { useForeCastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";
//import { weather_keys } from '../hooks/use-weather';
import CurrentWeather from "@/components/CurrentWeather";

const WeatherDashboard = () => {
  const { coordinates, locationError, locationLoading, getLocation } = useGeolocation();
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    if (!locationLoading && coordinates) {
      console.log("Coordinates:", coordinates);
    }
  }, [coordinates, locationLoading]);

  // Some vars
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForeCastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  const handleRefresh = async () => {
    setIsRotating(true);
    await getLocation();
    if (coordinates) {
      await Promise.all([
        weatherQuery.refetch(),
        forecastQuery.refetch(),
        locationQuery.refetch(),
      ]);
    }
    setIsRotating(false);
  };

  if (locationLoading || weatherQuery.isLoading || forecastQuery.isLoading) {
    return <WeatherSkeleton />;
  }

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Enable location access to see your local weather</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please Retry</p>
          <Button onClick={handleRefresh} variant="outline" className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];

  return (
    <div>
      <div className="flex items-center justify-between space-y-4">
        <h1 className="text-xl font-bold tracking-tight">Weather Dashboard</h1>
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="icon"
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw
            className={`w-5 h-5 transition-transform duration-500 ease-in-out 
                        ${isRotating ? "rotate-180" : "rotate-0"} 
                        ${weatherQuery.isFetching ? "opacity-50" : ""}`}
          />
        </Button>
      </div>

      <div className="grid gap-6">
        <CurrentWeather data={weatherQuery.data} locationName={locationName} />
        {/* Current weather */}
        {/* Hourly temperature */}
        <div>
          {/* Details */}
          {/* Forecast */}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
