import { BrowserRouter,Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import {ThemeProvider} from "./context/theme-provider";
import WeatherDashboard from "@/pages/weather-dashboard.tsx";
import {CityPage} from "@/pages/city-page.tsx";

const App = () => {
    return (
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
    )
}
export default App
