import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { RefreshCw } from "lucide-react";

const WeatherDashboard = () => {
    const [isRotating, setIsRotating] = useState(false);

    const handleRefresh = () => {
        setIsRotating(true);
        setTimeout(() => setIsRotating(false), 500); // Reset animation after 0.5s
    };

    //custom hook for fetching location


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

            {/* Current and Hourly Weather */}
        </div>
    );
};

export default WeatherDashboard;
