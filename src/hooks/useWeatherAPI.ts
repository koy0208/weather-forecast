import { useState, useCallback } from 'react';
import axios from 'axios';

// 都道府県コード
export type PrefectureCode = 
  | '010000' // 北海道
  | '020000' // 青森県
  | '130000' // 東京都
  | '230000' // 愛知県
  | '270000' // 大阪府
  | '340000' // 広島県
  | '400000'; // 福岡県

interface UseWeatherAPIReturn {
  fetchForecast: (prefCode: PrefectureCode) => Promise<JMA.WeatherForecast[] | null>;
  loading: boolean;
  error: string | null;
}

/**
 * 気象庁APIから天気予報データを取得するカスタムフック
 */
export const useWeatherAPI = (): UseWeatherAPIReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 指定した都道府県コードの天気予報を取得
   * @param prefCode 都道府県コード
   */
  const fetchForecast = useCallback(async (prefCode: PrefectureCode): Promise<JMA.WeatherForecast[] | null> => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://www.jma.go.jp/bosai/forecast/data/forecast/${prefCode}.json`
      );

      return response.data;
    } catch (err) {
      console.error('天気データ取得エラー:', err);
      setError('天気情報の取得に失敗しました。ネットワーク接続を確認してください。');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchForecast, loading, error };
};