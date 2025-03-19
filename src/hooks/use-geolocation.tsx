import { useEffect, useState } from "react";
import type { Coordinates } from "@/api/types.ts";

interface GeolocationState {
    coordinates: Coordinates | null;
    locationError: string | null;
    locationLoading: boolean;
}

export function useGeolocation() {
    const [locationData, setLocationData] = useState<GeolocationState>({
        coordinates: null,
        locationError: null,
        locationLoading: true,
    });

    const getLocation = () => {
        setLocationData((prev) => ({ ...prev, locationLoading: true, locationErro: null }));

        if (!navigator.geolocation) {
            setLocationData({
                coordinates: null,
                locationError: "Geolocation is not supported by your browser.",
                locationLoading: false,
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocationData({
                    coordinates: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    },
                    locationError: null,
                    locationLoading: false,
                });
            },
            (locationError) => {
                let errorMessage: string;

                if (locationError.code === locationError.PERMISSION_DENIED) {
                    errorMessage = "Location permission denied. Please enable location access.";
                } else if (locationError.code === locationError.POSITION_UNAVAILABLE) {
                    errorMessage = "Location information is unavailable.";
                } else if (locationError.code === locationError.TIMEOUT) {
                    errorMessage = "Location request timed out.";
                } else {
                    errorMessage = "An unknown error occurred.";
                }

                setLocationData({
                    coordinates: null,
                    locationError: errorMessage,
                    locationLoading: false,
                });
            },{
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );
    };

    useEffect(() => {
        getLocation();
    }, []);

    return {
        ...locationData,
        getLocation,
    };
}
