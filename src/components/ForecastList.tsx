import React from 'react';
import WeatherCard from './WeatherCard';

interface ForecastListProps {
  forecasts: {
    areaName: string;
    date: string;
    weather: string;
    temperature?: {
      min?: string;
      max?: string;
    };
    isToday?: boolean;
  }[];
}

const ForecastList = ({ forecasts }: ForecastListProps) => {
  if (!forecasts || forecasts.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">天気予報データがありません</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {forecasts.map((forecast, index) => (
        <WeatherCard
          key={`${forecast.areaName}-${forecast.date}-${index}`}
          areaName={forecast.areaName}
          date={forecast.date}
          weather={forecast.weather}
          temperature={forecast.temperature}
          isToday={forecast.isToday}
        />
      ))}
    </div>
  );
};

export default ForecastList;
