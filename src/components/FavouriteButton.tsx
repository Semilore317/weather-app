import { WeatherData } from '@/api/types';
import { useFavourite } from '@/hooks/use-favourite';
import { Button } from './ui/button';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface FavouriteButtonProps {
    data: WeatherData;
}

const FavouriteButton = ({ data }: FavouriteButtonProps) => {
    const { addToFavourites, isFavorite, removeFavourite } = useFavourite();
    const isCurrentlyFavourite = isFavorite(data.coord.lat, data.coord.lon);

    const toggleFavourite = () => {
        if (isCurrentlyFavourite) {
            removeFavourite.mutate(`${data.coord.lat}-${data.coord.lon}`);
            toast.error(`Removed ${data.name} from favourites`);
        } else {
            addToFavourites.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country,
                query: `${data.name},${data.sys.country}`, // <-- Add this
            });
            toast.success(`Added ${data.name} to favourites`);            
        }
    };

    return (
        <Button
            variant={isCurrentlyFavourite ? "default" : "outline"}
            size="icon"
            className={isCurrentlyFavourite ? "bg-blue-500 hover:bg-blue-600" : ""}
            onClick={toggleFavourite}
        >
            <Star
                className="h-4 w-4"
                fill={isCurrentlyFavourite ? "currentColor" : "none"}
            />
        </Button>
    );
};

export default FavouriteButton;
