import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, RefreshCw, AlertCircle } from "lucide-react";
import { useGeolocation } from "@/hooks/use-geolocation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherSkeleton from "@/components/skeleton";
import { useReverseGeocodeQuery } from "@/hooks/use-weather";

const WeatherDashboard = () => {
    const { coordinates, locationError, locationLoading, getLocation } = useGeolocation();
    const [isRotating, setIsRotating] = useState(false);

    // Log coordinates only after they are updated
    useEffect(() => {
        if (!locationLoading && coordinates) {
            console.log("Coordinates:", coordinates);
        }
    }, [coordinates, locationLoading]);

    const locationQuery = useReverseGeocodeQuery(coordinates);
    console.log(locationQuery);

    const handleRefresh = () => {
        setIsRotating(true);
        setTimeout(() => setIsRotating(false), 500); // Reset animation after 0.5s
        getLocation(); // Fetch location on refresh
    };

    if (locationLoading) {
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

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between space-y-4">
                <h1 className="text-xl font-bold tracking-tight">My Location</h1>
                <Button onClick={handleRefresh} variant="outline">
                    <RefreshCw className={`w-5 h-5 transition-transform duration-500 ease-in-out ${isRotating ? "rotate-180" : "rotate-0"}`} />
                </Button>
            </div>

            {/* Show location */}
            {coordinates ? (
                <p>Latitude: {coordinates.lat}, Longitude: {coordinates.lon}</p>
            ) : (
                <p>Fetching location...</p>
            )}

            {/* Current and Hourly Weather - Add your weather data here */}
        </div>
    );
};

export default WeatherDashboard;
