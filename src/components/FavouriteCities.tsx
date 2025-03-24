import { useFavourite } from "@/hooks/use-favourite"
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { XIcon } from 'lucide-react';
import { useWeatherQuery } from "@/hooks/use-weather";
import { Loader2 } from 'lucide-react';
import { toast } from "sonner";
//import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface FavouriteCityTabletProps {
    id: string;
    name: string;
    lat: number;
    lon: number;
    onRemove: (id: string) => void;
}

const FavouriteCities = () => {

    const { favourites, removeFavourite } = useFavourite();

    if (!favourites.length) {
        return null;
    }
    return (
        <>
            <h1 className="text-xl font-bold tracking-tight">
                Favourites
            </h1>
            <ScrollArea className="-full pb-4 overflow-x-auto whitespace-nowrap scrollbar-thin dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-rounded-md">
                <div className="flex gap-4">
                    {favourites.map((city) => {
                        return (
                            <FavouriteCityTablet
                                key={city.id}
                                {...city}
                                onRemove={() => removeFavourite.mutate(city.id)}
                            />
                        )
                    })}
                </div>
            </ScrollArea>
        </>
    )
};

function FavouriteCityTablet({ id, name, lat, lon, onRemove }: FavouriteCityTabletProps) {
    const navigate = useNavigate();
    const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

    return (
        <div
            onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
            role="button"
            className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"
        >
            <Button
                className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foregrounf group-hover:opacity-100"
                variant="ghost"
                size="icon"
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove(id);
                    toast.error(`Removed ${name} from favourites`);
                }}
            >
                <XIcon className="h-4 w-4" />
            </Button>

            {isLoading ? (
                <div className="flex h-8 items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin" />

                </div>
            ) : weather ? (
                <>
                    <div className="flex justify-between">
                        <div>
                            <img src={`https:openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                                alt={weather.weather[0].description}
                                className="h-8 w-8"
                            />
                        </div>
                        <div>
                            <p className="font-medium">{name}</p>
                            <p className="text-xs text-muted-foreground">{weather.sys.country}</p>
                        </div>
                    </div>
                    <div className="ml-auto text-right">
                        <p className="text-lg font-bold">{Math.round(weather.main.temp)}°</p>
                        <p className="text-muted-foreground">{weather.weather[0].description}</p>
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default FavouriteCities;