import React from 'react';

interface WeatherCardProps {
  areaName: string;
  weather: string;
  temperature?: {
    min?: string;
    max?: string;
  };
  date: string;
  isToday?: boolean;
}

/**
 * 天気情報を表示するカードコンポーネント
 */
const WeatherCard = ({
  areaName,
  weather,
  temperature,
  date,
  isToday = false,
}: WeatherCardProps) => {
  // 天気に応じたアイコンを表示
  const getWeatherIcon = (weather: string) => {
    if (weather.includes('晴')) {
      return '☀️';
    } else if (weather.includes('くもり')) {
      return '☁️';
    } else if (weather.includes('雨')) {
      return '🌧️';
    } else if (weather.includes('雪')) {
      return '❄️';
    }
    return '🌈';
  };

  // 日付をフォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const weekday = weekdays[date.getDay()];
    
    return `${month}/${day}(${weekday})`;
  };

  return (
    <div className={`rounded-lg shadow-md p-4 ${isToday ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{areaName}</h3>
        <span className="text-sm text-gray-500">{formatDate(date)}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-4xl mr-3">{getWeatherIcon(weather)}</span>
          <span className="text-gray-700">{weather}</span>
        </div>
        
        {temperature && (
          <div className="text-right">
            {temperature.max && (
              <div className="text-red-500">
                <span className="text-sm">最高</span> {temperature.max}°C
              </div>
            )}
            {temperature.min && (
              <div className="text-blue-500">
                <span className="text-sm">最低</span> {temperature.min}°C
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
