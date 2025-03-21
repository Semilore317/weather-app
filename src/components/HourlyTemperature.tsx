import type { ForecastData } from '@/api/types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { format } from "date-fns";

interface HourlyTemperatureProps {
  data: ForecastData;
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  // Since the data interval is every 3 hours, we need to take the first 8 items
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"), // format hour - h, a for am/pm, who tf came up with this?
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              animationDuration={1000}  // Smooth animation over 1 second
              animationEasing="ease-in-out"  // Easing function for animation
            >
              {/* XAxis for time */}
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              {/* YAxis for temperature with °C */}
              <YAxis
                tickFormatter={(value) => `${value}°C`}  // Add °C symbol
                stroke="#888888"
                fontSize={10}  // Smaller font size for Y-axis text
                tickLine={false}  // Remove tick lines
                axisLine={false}  // Remove axis line
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#8884d8"
                activeDot={{ r: 8 }}  // Circle appears only on hover
                dot={false}  // Hide dots by default
                animationDuration={1000}  // Smooth animation over 1 second
                animationEasing="ease-in-out"  // Easing function for animation
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}  // Circle appears only on hover
                dot={false}  // Hide dots by default
                animationDuration={1000}  // Smooth animation over 1 second
                animationEasing="ease-in-out"  // Easing function for animation
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemperature;
