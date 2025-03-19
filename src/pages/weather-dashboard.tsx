import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { MapPin, RefreshCw } from "lucide-react";
import { useGeolocation } from "@/hooks/use-geolocation.tsx";
import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import WeatherSkeleton from "@/components/skeleton";

const WeatherDashboard = () => {
    const { coordinates, locationError, locationLoading, getLocation } = useGeolocation();

    // Log coordinates only after they are updated
    useEffect(() => {
        if (!locationLoading && coordinates) {
            console.log("Coordinates:", coordinates);
        }
    }, [coordinates, locationLoading]);

    const [isRotating, setIsRotating] = useState(false);


    const handleRefresh = () => {
        setIsRotating(true);
        setTimeout(() => setIsRotating(false), 500); // Reset animation after 0.5s
        getLocation(); // Fetch location on refresh

        if (coordinates) {
            //reload weather data --unsure
        }
    };

    if (locationLoading) {
        return <WeatherSkeleton />
    }


    return (
        <div>
            {/* Favorite Cities */}
            <div className="flex items-center justify-between space-y-4">
                <h1 className="text-xl font-bold tracking-tight">My Location</h1>
                <Button onClick={handleRefresh} variant="outline">
                    <RefreshCw
                        className={`w-5 h-5 transition-transform duration-500 ease-in-out ${isRotating ? "rotate-180" : "rotate-0"
                            }`}
                    />
                </Button>
            </div>

            {/* Show location or error */}
            <div>
                {locationLoading ? (
                    <p>Fetching location...</p>
                ) : locationError ? (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription className="flex flex-col gap-4">
                            <p>{locationError}</p>
                            <Button onClick={getLocation} variant={"outline"} className="w-fit">
                                <MapPin className="mr-2 h-4 w-4"/>
                                Enable Location
                            </Button>
                        </AlertDescription>
                    </Alert>
                ) : coordinates ? (
                    <p>Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}</p>
                ) : null}
            </div>

            {/* Current and Hourly Weather */}
        </div>
    );
};

export default WeatherDashboard;