import { BrowserRouter,Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import {ThemeProvider} from "./context/theme-provider";
import WeatherDashboard from "@/pages/weather-dashboard.tsx";
import {CityPage} from "@/pages/city-page.tsx";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

//tanstack stuff
//set a limit for "fresh" data to avoid excess api calls
const queryClient = new QueryClient({
    defaultOptions:{
        queries: {
            staleTime: 5 * 60 * 1000, //5 minutes
            gcTime: 10 *60 * 1000, //10 minutes - garbage collection - cache time
            retry: false,
            refetchOnWindowFocus: false,
        }
    }
});

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider defaultTheme="dark">
                    <Layout>
                        <Routes>
                            <Route path="/" element={<WeatherDashboard />} />
                            <Route path="/city/:cityName" element={<CityPage />} />
                        </Routes>
                    </Layout>
                </ThemeProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
export default App