import React from 'react';
import { PrefectureCode } from '../hooks/useWeatherAPI';

interface SearchFormProps {
  onSearch: (prefCode: PrefectureCode, selectedPrefectureName: string) => void;
  isLoading: boolean;
}

// 都道府県のリスト
const prefectures: { code: PrefectureCode; name: string }[] = [
  { code: '020000', name: '青森県' },
  { code: '130000', name: '東京都' },
  { code: '270000', name: '大阪府' },
  { code: '230000', name: '愛知県' },
  { code: '340000', name: '広島県' },
  { code: '400000', name: '福岡県' },
];

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [selectedCode, setSelectedCode] = React.useState<PrefectureCode>('130000');

  // プルダウンの選択が変わったときのハンドラー
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCode(e.target.value as PrefectureCode);
  };

  // フォーム送信時のハンドラー
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPrefecture = prefectures.find(pref => pref.code === selectedCode);
    onSearch(selectedCode, selectedPrefecture ? selectedPrefecture.name : '');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex items-center justify-center">
      <select
        value={selectedCode}
        onChange={handleChange}
        className="border p-2 rounded mr-2"
      >
        {prefectures.map(pref => (
          <option key={pref.code} value={pref.code}>
            {pref.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={isLoading}
      >
        {isLoading ? '取得中...' : '検索'}
      </button>
    </form>
  );
};

export default SearchForm;