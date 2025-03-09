# 天気予報アプリ

気象庁APIを使用した、モダンなデザインの天気予報アプリです。

## 機能

- 日本の主要都道府県の天気予報表示
- 現在の天気と今後の予報を表示
- レスポンシブデザイン対応
- 天気に応じたアイコン表示（晴れ☀️、曇り☁️、雨🌧️、雪❄️）

## 技術スタック

- React + TypeScript
- Tailwind CSS（スタイリング）
- 気象庁API（データソース）
- Axios（APIリクエスト）

## プロジェクト構成

```
weather-app/
  ├── src/
  │    ├── components/
  │    │    ├── WeatherCard.tsx（天気表示カード）
  │    │    ├── SearchForm.tsx（検索フォーム）
  │    │    └── ForecastList.tsx（予報リスト）
  │    ├── hooks/
  │    │    └── useWeatherAPI.ts（API連携カスタムフック）
  │    ├── types/
  │    │    └── jma.d.ts（気象庁API型定義）
  │    ├── App.tsx（メインコンポーネント）
  │    └── index.tsx（エントリーポイント）
  └── docs/
       ├── requirements.md（要件定義書）
       └── design.md（設計書）
```

## 実装の特徴

- カスタムフックを使用したAPI通信の分離
- useCallbackとuseMemoによるパフォーマンス最適化
- 依存配列の適切な管理によるレンダリング問題の解決
- TypeScriptによる型安全性の確保
- Tailwind CSSによるモダンなUIデザイン

## 使い方

### インストール

```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
npm install
```

### 開発サーバーの起動

```bash
npm start
```

ブラウザで http://localhost:3000 にアクセスすると、アプリが表示されます。

### ビルド

```bash
npm run build
```

## API

このアプリは気象庁の公開APIを使用しています。
https://www.jma.go.jp/bosai/forecast/data/forecast/{都道府県コード}.json

## ライセンス

MIT
