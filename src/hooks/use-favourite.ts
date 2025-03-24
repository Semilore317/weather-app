import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface FavouriteCity {
    id: string;
    query: string;
    lat: number;
    lon: number;
    name: string;
    country: string;
    state?: string;
    addedAt: number;
}

export function useFavourite() {
    const [favourites, setFavourites] = useLocalStorage<FavouriteCity[]>(
        "favourites",
        []
    );

    const queryClient = useQueryClient();

    const favouriteQuery = useQuery({
        queryKey: ["favourites"],
        queryFn: () => favourites,
        initialData: favourites,
        staleTime: Infinity,
    });

    const addToFavourites = useMutation({
        mutationFn: async (
            city: Omit<FavouriteCity, "id" | "addedAt">
        ) => {
            const newFavourite: FavouriteCity = {
                ...city,
                id: `${city.lat}-${city.lon}-${Date.now()}`,
                addedAt: Date.now(),
            };

            const exists = favourites.some((fav) => fav.id === newFavourite.id);

            if (exists) {
                return (
                    favourites
                )
            }

            const newFavourites = [newFavourite, ...favourites].slice(0, 10);

            setFavourites(newFavourites);
            return newFavourites;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favourites"]
            });
        },
    });

    const removeFavourite = useMutation({
        mutationFn: async (cityId: string) => {
            const newFavourites = favourites.filter((city) => city.id !== cityId);
            setFavourites(newFavourites);
            return newFavourites;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favourites"]
            });
        },
    });

    return {
        favourites: favouriteQuery.data ?? [],
        addToFavourites,
        removeFavourite,
    };
}
