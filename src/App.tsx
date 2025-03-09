import React, { useState, useEffect, useCallback } from 'react';
import SearchForm from './components/SearchForm';
import ForecastList from './components/ForecastList';
import { useWeatherAPI, PrefectureCode } from './hooks/useWeatherAPI';

interface ForecastData {
  areaName: string;
  date: string;
  weather: string;
  temperature?: {
    min?: string;
    max?: string;
  };
  isToday?: boolean;
}

function App() {
  const { fetchForecast, loading, error } = useWeatherAPI();
  const [forecasts, setForecasts] = useState<ForecastData[]>([]);
  const [prefectureName, setPrefectureName] = useState('東京都');

  // 気象庁APIからのデータを整形する関数（依存配列から外部状態を削除）
  const processWeatherData = useCallback((data: JMA.WeatherForecast[], prefName: string) => {
    if (!data || data.length === 0) return [];

    const forecastWeather = data[0]; // 短期予報
    const extendedForecast = data.length > 1 ? data[1] : null; // 拡張予報（気温情報）
    const weatherSeries = forecastWeather.timeSeries[0]; // 天気予報の時系列データ

    // 地域名を取得
    const areaName = weatherSeries.areas[0].area.name;

    // 日付と天気を取得
    return weatherSeries.timeDefines.map((timeDefine, index) => {
      const date = new Date(timeDefine);
      const today = new Date();
      const isToday = date.getDate() === today.getDate() && 
                      date.getMonth() === today.getMonth() && 
                      date.getFullYear() === today.getFullYear();

      // 天気情報を取得
      const weather = weatherSeries.areas[0].weathers?.[index] || '';

      // 気温情報を取得（存在する場合）
      let temperature;
      if (extendedForecast) {
        // 拡張予報から気温情報を取得（tempsMax/tempsMinが存在する timeSeries を探す）
        const extTempSeries = extendedForecast.timeSeries.find(ts => ts.areas[0].tempsMax !== undefined);
        if (extTempSeries && extTempSeries.areas[0].tempsMax && extTempSeries.areas[0].tempsMin) {
          // 多くの場合、tempsMax/tempsMin の最初の要素は空文字なので、index+1 を使用
          const tmax = extTempSeries.areas[0].tempsMax[index + 1];
          const tmin = extTempSeries.areas[0].tempsMin[index + 1];
          if (tmax !== undefined && tmin !== undefined) {
            temperature = { max: tmax, min: tmin };
          }
        }
      } else {
        // 拡張予報がない場合は、従来の短期予報から取得
        const tempSeries = forecastWeather.timeSeries[2];
        if (tempSeries && tempSeries.areas[0].temps) {
          const maxTemps = tempSeries.areas[0].temps.filter((_, i) => i % 2 === 0);
          const minTemps = tempSeries.areas[0].temps.filter((_, i) => i % 2 !== 0);
          if (maxTemps.length > index && minTemps.length > index) {
            temperature = { max: maxTemps[index], min: minTemps[index] };
          }
        }
      }

      return {
        areaName,
        date: timeDefine,
        weather,
        temperature,
        isToday
      };
    });
  }, []);

  // 検索処理（useCallbackでメモ化）
  const handleSearch = useCallback(async (prefCode: PrefectureCode, selectedPrefectureName: string) => {
    try {
      const data = await fetchForecast(prefCode);
      if (data && data.length > 0) {
        // ユーザーが選択した都道府県名を設定
        setPrefectureName(selectedPrefectureName);
        
        // データを処理
        const processedData = processWeatherData(data, selectedPrefectureName);
        setForecasts(processedData);
      }
    } catch (err) {
      console.error('天気データ取得エラー:', err);
    }
  }, [fetchForecast, processWeatherData]);

  // 初期データ読み込み
  useEffect(() => {
    handleSearch('130000', '東京都'); // 東京都のデータを初期表示
  }, [handleSearch]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">天気予報アプリ</h1>
          <p className="text-gray-600">気象庁の最新データを使用した天気予報</p>
        </header>

        <main>
          <SearchForm onSearch={handleSearch} isLoading={loading} />

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {forecasts.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{prefectureName}の天気予報</h2>
              <ForecastList forecasts={forecasts} />
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center py-12">
              <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
        </main>

        <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© 2025 天気予報アプリ - 気象庁APIを使用</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
