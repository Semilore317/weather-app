import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { RefreshCw } from "lucide-react";
import { useGeolocation } from "@/hooks/use-geolocation.tsx";

const WeatherDashboard = () => {
    const [isRotating, setIsRotating] = useState(false);

    const handleRefresh = () => {
        setIsRotating(true);
        setTimeout(() => setIsRotating(false), 500); // Reset animation after 0.5s
        getLocation(); // Fetch location on refresh
    };

    // Custom hook for fetching location
    const { coordinates, error, isLoading, getLocation } = useGeolocation();

    // Log coordinates only after they are updated
    useEffect(() => {
        if (!isLoading && coordinates) {
            console.log("Coordinates:", coordinates);
        }
    }, [coordinates, isLoading]);

    return (
        <div>
            {/* Favorite Cities */}
            <div className="flex items-center justify-between items-center space-y-4">
                <h1 className="text-xl font-bold tracking-tight">My Location</h1>
                <Button onClick={handleRefresh} variant="outline">
                    <RefreshCw
                        className={`w-5 h-5 transition-transform duration-500 ease-in-out ${
                            isRotating ? "rotate-180" : "rotate-0"
                        }`}
                    />
                </Button>
            </div>

            {/* Show location or error */}
            <div>
                {isLoading ? (
                    <p>Fetching location...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : coordinates ? (
                    <p>Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}</p>
                ) : null}
            </div>

            {/* Current and Hourly Weather */}
        </div>
    );
};

export default WeatherDashboard;
