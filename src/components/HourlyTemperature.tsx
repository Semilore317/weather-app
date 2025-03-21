import type { ForecastData } from '@/api/types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { format } from "date-fns";

interface HourlyTemperatureProps {
  data: ForecastData;
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"), 
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
            <LineChart data={chartData}>
              {/* XAxis for time */}
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              {/* YAxis for temperature with °C */}
              <YAxis
                tickFormatter={(value) => `${value}°C`}
                stroke="#888888"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              {/* Tooltip */}
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className='rounded-lg border bg-background p-2 shadow-sm'>
                        <div className='grid grid-cols-2 gap-2'>
                          <div className='flex flex-col'>
                            <span className='text-[0.70rem] uppercase text-muted-foreground'>
                              Temperature
                            </span>
                            <span className='font-bold'>
                              &nbsp;{payload[0].value}°
                            </span>
                          </div>
                          <div className='flex flex-col'>
                            <span className='text-[0.70rem] uppercase text-muted-foreground'>
                              Feels Like
                            </span>
                            <span className='font-bold'>
                              &nbsp;{payload[1].value}°
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                }}
              />
              {/* Custom Legend */}
              <Legend
                verticalAlign="top"
                align="center"
                content={({ payload }) => (
                  <div className="flex justify-center space-x-4 p-2">
                    {payload?.map((entry, index) => (
                      <div key={`item-${index}`} className="flex items-center space-x-2">
                        {/* Custom square icon */}
                        <div className="w-3 h-3" style={{ backgroundColor: entry.color }} />
                        <span className="text-sm text-muted-foreground">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
              {/* Temperature Line */}
              <Line
                type="monotone"
                dataKey="temp"
                name="Temperature"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                dot={false}
              />
              {/* Feels Like Line */}
              <Line
                type="monotone"
                dataKey="feels_like"
                name="Feels Like"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemperature;
